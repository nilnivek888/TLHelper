import storage from "@react-native-firebase/storage";
import { utils } from "@react-native-firebase/app";
import Excel from "exceljs";
var RNFS = require("react-native-fs");
import * as FileSystem from "expo-file-system";
import { Buffer as NodeBuffer } from "buffer";
import * as Sharing from "expo-sharing";
import { OrderStore } from "../../models/order-store/order-store";
import { Order } from "../../models/order/order";
import firestore from "@react-native-firebase/firestore";

export async function exportToExcel(orderStore: OrderStore) {
	try {
		const fileName = "template.xlsx";
		const templateUri = `${utils.FilePath.DOCUMENT_DIRECTORY}/${fileName}`;
		if (!(await RNFS.exists(templateUri))) {
			const reference = storage().ref(fileName);
			const taskSnapshot = await reference.writeToFile(templateUri);
			if (taskSnapshot.state === storage.TaskState.SUCCESS) {
				console.log(
					"Total bytes downloaded: ",
					taskSnapshot.totalBytes
				);
			} else {
				console.error("Firebasre error", storage.TaskState);
			}
		}
		const newUri = await modifyAndExport(templateUri, orderStore);
		shareFile(newUri);
	} catch (error) {
		console.log(error);
	}
}

async function modifyAndExport(
	oldFile: string,
	orderStore: OrderStore
): Promise<string> {
	const config = await firestore()
		.collection("config")
		.doc("exportConfig")
		.get();

	// read in excel template
	const data = await RNFS.readFile(oldFile, "ascii");
	const newFile = FileSystem.cacheDirectory + "/test.xlsx"; //FileSystem.cacheDirectory + new Date().toLocaleString();
	var workbook = new Excel.Workbook();
	await workbook.xlsx.load(data);
	var worksheet = workbook.getWorksheet(1);
	const startRow = config.data().startRow;

	// construct map to prd columns
	const obj = JSON.parse(orderStore.mapToPrdColumns);

	// modify prd count
	for (let i = 0; i < orderStore.orders.length; i++) {
		var row = worksheet.getRow(i + startRow);
		modifyRow(orderStore.orders[i], row, obj);
	}

	// Enter formatted date
	printDate(worksheet.getRow(2));

	const buffer = await workbook.xlsx.writeBuffer();
	const nodeBuffer = NodeBuffer.from(buffer);
	const bufferStr = nodeBuffer.toString("base64");
	await FileSystem.writeAsStringAsync(newFile, bufferStr, {
		encoding: FileSystem.EncodingType.Base64,
	});
	return newFile;
}

function modifyRow(order: Order, row: Excel.Row, map: {}) {
	const prds = JSON.parse(order.prodsManifest);
	for (const prdId in prds) {
		row.getCell(map[prdId]).value = prds[prdId];
	}
	//name
	row.getCell(4).value = order.name;
	row.commit();
}

function printDate(row: Excel.Row) {
	const now = new Date();
	const year = (now.getFullYear() - 1911).toString();
	row.getCell(11).value = year[0];
	row.getCell(12).value = year[1];
	row.getCell(13).value = year[2];
	row.getCell(14).value = "年";
	const month = (now.getMonth() + 1).toString(); // Jan is 0!!!!
	row.getCell(16).value = month.length === 1 ? 0 : 1;
	row.getCell(17).value = month[0];
	row.getCell(18).value = "月";
	const day = now.getDate().toString();
	row.getCell(20).value = day.length === 1 ? 0 : day[0];
	row.getCell(21).value = day.length === 1 ? day[0] : day[1];
	row.getCell(22).value = "日";
	row.commit();
}

async function shareFile(newFile: string) {
	Sharing.shareAsync(newFile, {
		mimeType:
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Android
		dialogTitle: "Your dialog title here", // Android and Web
		UTI: "com.microsoft.excel.xlsx", // iOS
	})
		.catch((error) => {
			console.error("Error", error);
		})
		.then(() => {
			console.log("Return from sharing dialog");
		});
	//writeFile("abcd.xlsx", blob, "ascii");
}
