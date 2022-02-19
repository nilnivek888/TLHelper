import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { Product, ProductModel } from "../product/product";
import { ProductApi } from "../../services/api/product-api";
import { withEnvironment } from "../extensions/with-environment";

export const ProductStoreModel = types
	.model("ProductStore")
	.props({
		products: types.array(ProductModel),
		membershipFee: types.maybe(types.integer),
	})
	.extend(withEnvironment)
	.actions(self => ({
		saveProducts: (products: Product[], membershipFee: number) => {
			self.products.replace(products);
			self.membershipFee = membershipFee;
		},
	}))
	.actions(self => ({
		getProducts: async () => {
			const productApi = new ProductApi(self.environment.api);
			const result = await productApi.getProducts();

			if (result.kind === "ok") {
				self.saveProducts(result.products, result.membershipFee);
			} else {
				__DEV__ && console.tron.log(result.kind);
			}
		},
		clear: () => {
			self.products.forEach(p => p.clearCount());
		},
	}))
	.views(self => ({
		get totalPV() {
			return self.products.reduce((sum, a) => sum + a.count * a.PV, 0);
		},
		get totalPrice() {
			return self.products.reduce((sum, a) => sum + a.count * a.price, 0);
		},
		get productSummary() {
			return self.products
				.filter(p => p.count !== 0)
				.map(p => {
					return p.name + "*" + p.count;
				})
				.join("\n");
		},
	}));

type ProductStoreType = Instance<typeof ProductStoreModel>;
export interface ProductStore extends ProductStoreType {}
type ProductStoreSnapshotType = SnapshotOut<typeof ProductStoreModel>;
export interface ProductStoreSnapshot extends ProductStoreSnapshotType {}
export const createProductStoreDefaultModel = () =>
	types.optional(ProductStoreModel, {});
