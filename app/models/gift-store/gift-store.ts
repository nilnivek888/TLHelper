import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { Gift, GiftModel } from "../gift/gift";
import { GiftApi } from "../../services/api/gift-api";
import { withEnvironment } from "../extensions/with-environment";

export const GiftStoreModel = types
	.model("GiftStore")
	.props({
		gifts: types.array(GiftModel),
		otherMsg: types.optional(types.string, ""),
		hasPromotion: types.optional(types.boolean, false),
	})
	.extend(withEnvironment)
	.actions(self => ({
		saveGifts: (gifts: Gift[]) => {
			self.gifts.replace(gifts);
		},
		saveOtherPromo(str: string, hasPromotion: boolean) {
			self.otherMsg = str;
			self.hasPromotion = hasPromotion;
		},
	}))
	.actions(self => ({
		getGifts: async () => {
			const giftApi = new GiftApi(self.environment.api);
			const result = await giftApi.getGifts();

			if (result.kind === "ok") {
				self.saveGifts(result.gifts);
				self.saveOtherPromo(result.otherMsg, result.hasPromotion);
			} else {
				__DEV__ && console.tron.log(result.kind);
			}
		},
	}))
	.views(self => ({
		getGiftSummary(totalPV: number) {
			// if (!self.hasPromotion) {
			// 	return "";
			// }
			self.gifts.forEach(g => console.log(g.PVCost));
			for (const g of [...self.gifts].reverse()) {
				if (g.PVCost <= totalPV) {
					return g.name;
				}
			}
			return "";
		},
	}));

type GiftStoreType = Instance<typeof GiftStoreModel>;
export interface GiftStore extends GiftStoreType {}
type GiftStoreSnapshotType = SnapshotOut<typeof GiftStoreModel>;
export interface GiftStoreSnapshot extends GiftStoreSnapshotType {}
export const createGiftStoreDefaultModel = () =>
	types.optional(GiftStoreModel, {});
