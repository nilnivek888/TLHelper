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
			let otherMsg = "";
			let hasPromotion = true;
			const giftsCollection = firestore().collection("Gifts");
			const snapshot = await giftsCollection.get();
			if (snapshot.empty) {
				console.log("No documents.");
			}

			snapshot.forEach(doc => {
				if (doc.id === "other") {
					otherMsg = doc.data().message;
					hasPromotion =
						doc.data().hasPromotion === undefined
							? false
							: doc.data().hasPromotion;
					return;
				}

				gifts.push(
					GiftModel.create({
						id: doc.id,
						name: doc.data().name,
						value: doc.data().value,
						PVCost: doc.data().PVCost,
					}) as Gift
				);
			});

			return {
				kind: "ok",
				gifts: gifts,
				otherMsg: otherMsg,
				hasPromotion: hasPromotion,
			};
		} catch (e) {
			__DEV__ && console.log(e.message);
			return { kind: "bad-data" };
		}
	}
}
