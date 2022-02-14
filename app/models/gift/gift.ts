import { Instance, SnapshotOut, types } from "mobx-state-tree";

/**
 * Gift model.
 */
export const GiftModel = types
	.model("Gift", {
		id: types.string,
		name: types.string,
		PVCost: types.number,
		count: 0,
		value: types.number,
	})
	.actions((self) => ({
		increment: () => {
			self.count++;
		},
		decrement: () => {
			if (self.count > 0) {
				self.count--;
			}
		},
		clearCount: () => {
			self.count = 0;
		},
	}));

export interface Gift extends Instance<typeof GiftModel> {}
export interface GiftSnapshot extends SnapshotOut<typeof GiftModel> {}
export const createGiftDefaultModel = () => types.optional(GiftModel, {});
