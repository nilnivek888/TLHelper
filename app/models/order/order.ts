import {
	getSnapshot,
	Instance,
	SnapshotOut,
	types,
	cast,
	applySnapshot,
	SnapshotOrInstance,
} from "mobx-state-tree";
import { string } from "mobx-state-tree/dist/internal";
import {
	ProductStore,
	ProductStoreModel,
} from "../product-store/product-store";
import { BooleanStore } from "../root-store/root-store";

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
