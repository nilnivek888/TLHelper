import { Instance, SnapshotOut, types } from "mobx-state-tree";

/**
 * Gift model.
 */
export const GiftModel = types.model("Gift", {
	id: types.string,
	name: types.string,
	PVCost: types.number,
	value: types.number,
	columnToFile: types.maybe(types.array(types.number)),
});

export interface Gift extends Instance<typeof GiftModel> {}
export interface GiftSnapshot extends SnapshotOut<typeof GiftModel> {}
export const createGiftDefaultModel = () => types.optional(GiftModel, {});
