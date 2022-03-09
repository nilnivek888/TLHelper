import { Api } from "./api";
import { GetProductsResult } from "./api.types";
import { Product, ProductModel } from "../../models/product/product";
import firestore from "@react-native-firebase/firestore";

export class ProductApi {
	private api: Api;
	constructor(api: Api) {
		this.api = api;
	}

	async getProducts(): Promise<GetProductsResult> {
		try {
			const prds = [];
			const prdsCollection = firestore()
				.collection("Products")
				.orderBy("order", "asc");
			const snapshot = await prdsCollection.get();
			let fee = 0;
			if (snapshot.empty) {
				console.log("No documents.");
			}
			snapshot.forEach((doc) => {
				if (doc.id === "fee") {
					fee = doc.data().price;
					return;
				}
				console.log("Fire" + doc.data().columnToFile);
				prds.push(
					ProductModel.create({
						id: doc.id,
						name: doc.data().name,
						displayName: doc.data().displayName,
						price: doc.data().price,
						count: 0,
						PV: doc.data().PV,
						columnToFile: doc.data().columnToFile,
					}) as Product
				);
			});

			return {
				kind: "ok",
				products: prds,
				membershipFee: fee,
			};
		} catch (e) {
			__DEV__ && console.log(e.message);
			return { kind: "bad-data" };
		}
	}
}
