import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { CharacterStoreModel } from "../character-store/character-store";
import { GiftStoreModel } from "../gift-store/gift-store";
import { ProductStoreModel } from "../product-store/product-store";

export const BooleanModel = types
	.model("BooleanModel")
	.props({
		feeIncluded: types.boolean,
	})
	.actions((self) => ({
		toggle: () => {
			self.feeIncluded = !self.feeIncluded;
		},
	}));
type BooleanType = Instance<typeof BooleanModel>;
export interface BooleanStore extends BooleanType {}
type BooleanSnapshotType = SnapshotOut<typeof BooleanModel>;
export interface BooleanSnapshot extends BooleanSnapshotType {}
export const createBooleanDefaultModel = () => types.optional(BooleanModel, {});
/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
	characterStore: types.optional(CharacterStoreModel, {} as any),
	productStore: types.optional(ProductStoreModel, {} as any),
	feeIncludedStore: types.optional(BooleanModel, {
		feeIncluded: false,
	} as any),
	giftStore: types.optional(GiftStoreModel, {} as any),
});

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
