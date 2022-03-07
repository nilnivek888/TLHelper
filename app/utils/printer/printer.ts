import storage from "@react-native-firebase/storage";
import { utils } from "@react-native-firebase/app";
import { Workbook } from "exceljs";
import Excel from "exceljs";
var RNFS = require("react-native-fs");
import { writeFile } from "react-native-fs";

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
		const wb = await exportDataToExcel(downloadTo);
		shareFile(wb);
		// workbook.xlsx.load(data.buffer);
	} catch (error) {
		console.log(error);
	}
}

async function exportDataToExcel(file: string) {
	const blob = new Blob([file], {
		type:
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
	});
	var workbook = new Excel.Workbook();
	await workbook.xlsx.load(await blob.arrayBuffer());
	var worksheet = workbook.getWorksheet(1);
	var row = worksheet.getRow(5);
	row.getCell(1).value = 5; // A5's value set to 5
	row.commit();
	worksheet.addRow({ id: 1, name: "John Doe", dob: new Date(1970, 1, 1) });
	return workbook;
}

async function shareFile(wb: Workbook) {
	const data = await wb.xlsx.writeBuffer();
	const blob = new Blob([data], {
		type:
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
	});
	//writeFile("abcd.xlsx", blob, "ascii");
}
