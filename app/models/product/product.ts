import { Instance, SnapshotOut, types } from "mobx-state-tree";

/**
 * Product model.
 */
export const ProductModel = types
	.model("Product", {
		id: types.string,
		name: types.string,
		displayName: types.maybe(types.string),
		price: types.number,
		count: 0,
		PV: types.number,
		columnToFile: types.maybe(types.number),
	})
	.actions((self) => ({
		increment: () => {
			self.count++;
		},
		decrement: () => {
			self.count--;
		},
		clearCount: () => {
			self.count = 0;
		},
		setCount: (count: number) => {
			self.count = count;
		},
	}));

export interface Product extends Instance<typeof ProductModel> {}
export interface ProductSnapshot extends SnapshotOut<typeof ProductModel> {}
export const createProductDefaultModel = () => types.optional(ProductModel, {});
