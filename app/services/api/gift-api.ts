import { Api } from "./api";
import { GetGiftsResult } from "./api.types";
import { Gift, GiftModel } from "../../models/gift/gift";
import firestore from "@react-native-firebase/firestore";

export class GiftApi {
	private api: Api;
	constructor(api: Api) {
		this.api = api;
	}

	async getGifts(): Promise<GetGiftsResult> {
		try {
			const gifts = [];
			const giftsCollection = firestore().collection("Gifts");
			const snapshot = await giftsCollection.get();
			if (snapshot.empty) {
				console.log("No documents.");
			}
			snapshot.forEach((doc) => {
				gifts.push(
					GiftModel.create({
						id: doc.id,
						name: doc.data().name,
						value: doc.data().value,
						count: 0,
						PVCost: doc.data().PVCost,
					}) as Gift
				);
			});

			return {
				kind: "ok",
				gifts: gifts,
			};
		} catch (e) {
			__DEV__ && console.log(e.message);
			return { kind: "bad-data" };
		}
	}
}
