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
		const fileName = "new.xlsx";
		const templateUri = `${utils.FilePath.DOCUMENT_DIRECTORY}/${fileName}`;
		if (!(await RNFS.exists(templateUri))) {
			const reference = storage().ref(fileName);
			const taskSnapshot = await reference.writeToFile(templateUri);
			if (taskSnapshot.state === storage.TaskState.SUCCESS) {
				console.log(
					"Total bytes downloaded: ",
					taskSnapshot.totalBytes
				);
			}
		}
		const newUri = await modifyAndExport(templateUri, orderStore);
		console.log("Old@" + templateUri);
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

	console.log("config= " + JSON.stringify(config.data()));

	// read in excel template
	const data = await RNFS.readFile(oldFile, "ascii");
	const newFile = FileSystem.cacheDirectory + "/test.xlsx"; //FileSystem.cacheDirectory + new Date().toLocaleString();
	var workbook = new Excel.Workbook();
	await workbook.xlsx.load(data);
	var worksheet = workbook.getWorksheet(1);
	const startRow = config.data().startRow;

	// construct map to prd columns
	const obj = JSON.parse(orderStore.mapToPrdColumns);
	console.log("obj:" + orderStore.mapToPrdColumns);

	// modify prd count
	for (let i = 0; i < orderStore.orders.length; i++) {
		var row = worksheet.getRow(i + startRow);
		console.log("Start export to row " + (i + startRow));
		modifyRow(orderStore.orders[i], row, obj);
		console.log("Exported to row " + (i + startRow));
	}

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
		console.log("processsing cell " + map[prdId]);
		row.getCell(map[prdId]).value = prds[prdId];
	}
	row.getCell(4).value = order.name;
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
