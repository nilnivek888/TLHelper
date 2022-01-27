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
	.actions((self) => ({
		saveProducts: (products: Product[], membershipFee: number) => {
			self.products.replace(products);
			self.membershipFee = membershipFee;
		},
	}))
	.actions((self) => ({
		getProducts: async () => {
			const productApi = new ProductApi(self.environment.api);
			const result = await productApi.getProducts();

			if (result.kind === "ok") {
				self.saveProducts(result.products, result.membershipFee);
			} else {
				__DEV__ && console.tron.log(result.kind);
			}
		},
	}));

type ProductStoreType = Instance<typeof ProductStoreModel>;
export interface ProductStore extends ProductStoreType {}
type ProductStoreSnapshotType = SnapshotOut<typeof ProductStoreModel>;
export interface ProductStoreSnapshot extends ProductStoreSnapshotType {}
export const createProductStoreDefaultModel = () =>
	types.optional(ProductStoreModel, {});
