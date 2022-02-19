import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { Gift, GiftModel } from "../gift/gift";
import { GiftApi } from "../../services/api/gift-api";
import { withEnvironment } from "../extensions/with-environment";

export const GiftStoreModel = types
	.model("GiftStore")
	.props({
		gifts: types.array(GiftModel),
	})
	.extend(withEnvironment)
	.actions(self => ({
		saveGifts: (gifts: Gift[]) => {
			self.gifts.replace(gifts);
		},
	}))
	.actions(self => ({
		getGifts: async () => {
			const giftApi = new GiftApi(self.environment.api);
			const result = await giftApi.getGifts();

			if (result.kind === "ok") {
				self.saveGifts(result.gifts);
			} else {
				__DEV__ && console.tron.log(result.kind);
			}
		},
		clear: () => {
			self.gifts.forEach(g => {
				g.clearCount();
			});
		},
	}))
	.views(self => ({
		get totalPVCost() {
			return self.gifts.reduce((sum, a) => sum + a.count * a.PVCost, 0);
		},
		get totalValue() {
			return self.gifts.reduce((sum, a) => sum + a.count * a.value, 0);
		},
		get giftSummary() {
			return self.gifts
				.filter(g => g.count !== 0)
				.map(p => {
					return p.name + "*" + p.count;
				})
				.join("\n");
		},
	}));

type GiftStoreType = Instance<typeof GiftStoreModel>;
export interface GiftStore extends GiftStoreType {}
type GiftStoreSnapshotType = SnapshotOut<typeof GiftStoreModel>;
export interface GiftStoreSnapshot extends GiftStoreSnapshotType {}
export const createGiftStoreDefaultModel = () =>
	types.optional(GiftStoreModel, {});
