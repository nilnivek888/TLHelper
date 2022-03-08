import storage from "@react-native-firebase/storage";
import { utils } from "@react-native-firebase/app";
import { Workbook } from "exceljs";
import Excel from "exceljs";
var RNFS = require("react-native-fs");
import * as FileSystem from "expo-file-system";
import { Buffer as NodeBuffer } from "buffer";
import * as Sharing from "expo-sharing";
export async function writeTo() {
	try {
		const fileName = "abc.xlsx";
		const downloadTo = `${utils.FilePath.DOCUMENT_DIRECTORY}/${fileName}`;
		if (!(await RNFS.exists(downloadTo))) {
			const reference = storage().ref(fileName);
			const taskSnapshot = await reference.writeToFile(downloadTo);
			if (taskSnapshot.state === storage.TaskState.SUCCESS) {
				console.log(
					"Total bytes downloaded: ",
					taskSnapshot.totalBytes
				);
			}
		}
		const newUri = await modifyAndExport(
			downloadTo,
			FileSystem.cacheDirectory + "abcd.xlsx"
		);
		shareFile(newUri);
		// workbook.xlsx.load(data.buffer);
	} catch (error) {
		console.log(error);
	}
}

async function modifyAndExport(
	oldFile: string,
	newFile: string
): Promise<string> {
	const data = await RNFS.readFile(oldFile, "ascii");
	var workbook = new Excel.Workbook();
	await workbook.xlsx.load(data);
	var worksheet = workbook.getWorksheet(1);
	var row = worksheet.getRow(6);
	row.getCell(1).value = "zhong文"; // A5's value set to 5
	row.commit();
	const buffer = await workbook.xlsx.writeBuffer();
	const nodeBuffer = NodeBuffer.from(buffer);
	const bufferStr = nodeBuffer.toString("base64");
	await FileSystem.writeAsStringAsync(newFile, bufferStr, {
		encoding: FileSystem.EncodingType.Base64,
	});
	return newFile;
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
