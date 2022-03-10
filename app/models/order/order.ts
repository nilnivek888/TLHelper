import { Instance, SnapshotOut, types } from "mobx-state-tree";

/**
 * Order model. Stores 2 snapshots.
 */
export const OrderModel = types
	.model("Order", {
		id: types.identifierNumber,
		name: types.maybe(types.string),
		prodsManifest: types.string,
		feeIncluded: types.boolean,
		totalPrice: types.number,
	})
	.actions((self) => ({
		setName(name: string) {
			console.log("event triggered: " + name);
			self.name = name;
		},
	}));

export interface Order extends Instance<typeof OrderModel> {}
export interface OrderSnapshot extends SnapshotOut<typeof OrderModel> {}
export const createOrderDefaultModel = () => types.optional(OrderModel, {});
