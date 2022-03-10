import {
	Instance,
	SnapshotOut,
	types,
	castToSnapshot,
	SnapshotOrInstance,
} from "mobx-state-tree";
import { OrderModel } from "../order/order";
import { withEnvironment } from "../extensions/with-environment";

export const OrderStoreModel = types
	.model("OrderStore")
	.props({
		orders: types.array(OrderModel),
		mapToPrdColumns: types.maybe(types.string),
	})
	.extend(withEnvironment)
	.actions((self) => ({
		addOrder: (order: SnapshotOrInstance<typeof OrderModel>) => {
			self.orders.push(order);
		},
		removeOrder: (id: number) => {
			self.orders = castToSnapshot(
				self.orders.filter((order) => order.id !== id)
			);
		},
		setMapToPrdColumns(mapStr: string) {
			self.mapToPrdColumns = mapStr;
		},
	}));

type OrderStoreType = Instance<typeof OrderStoreModel>;
export interface OrderStore extends OrderStoreType {}
type OrderStoreSnapshotType = SnapshotOut<typeof OrderStoreModel>;
export interface OrderStoreSnapshot extends OrderStoreSnapshotType {}
export const createOrderStoreDefaultModel = () =>
	types.optional(OrderStoreModel, {});
