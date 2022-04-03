import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { Product, ProductModel } from "../product/product";
import { ProductApi } from "../../services/api/product-api";
import { withEnvironment } from "../extensions/with-environment";

export const ProductStoreModel = types
	.model("ProductStore")
	.props({
		products: types.array(ProductModel),
		membershipFee: types.maybe(types.integer),
		membershipFeeColumnToFile: types.maybe(types.integer),
	})
	.extend(withEnvironment)
	.actions(self => ({
		saveProducts: (products: Product[]) => {
			self.products.replace(products);
		},
		saveMembershipFee(fee: number, columnToFile: number) {
			self.membershipFee = fee;
			self.membershipFeeColumnToFile = columnToFile;
		},
		update: (manifest: string) => {
			const obj = JSON.parse(manifest);
			self.products.forEach(prd => {
				prd.setCount(obj[prd.id] ?? 0);
			});
		},
	}))
	.actions(self => ({
		getProducts: async () => {
			const productApi = new ProductApi(self.environment.api);
			const result = await productApi.getProducts();

			if (result.kind === "ok") {
				self.saveProducts(result.products);
				self.saveMembershipFee(
					result.membershipFee,
					result.feeColumnToFile
				);
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
		getTotalPrice(feeIncluded: boolean) {
			return (
				self.products.reduce((sum, a) => sum + a.count * a.price, 0) +
				(feeIncluded ? self.membershipFee : 0)
			);
		},
		get productSummary() {
			return self.products
				.filter(p => p.count !== 0)
				.map(p => {
					return p.name + "*" + p.count;
				})
				.join("\n");
		},
		get manifest(): string {
			const map: Map<string, number> = new Map();
			self.products.forEach(prd => {
				map.set(prd.id, prd.count);
			});
			return JSON.stringify(Object.fromEntries(map));
		},
		get mapToPrdColumns(): string {
			const map: Map<string, number> = new Map();
			self.products.forEach(prd => {
				console.log(
					"prd.id/" + prd.id + " prd.columnToFile/" + prd.columnToFile
				);
				map.set(prd.id, prd.columnToFile);
			});
			map.set("fee", self.membershipFeeColumnToFile);
			console.log("MAP" + JSON.stringify(Object.fromEntries(map)));
			return JSON.stringify(Object.fromEntries(map));
		},
		get totalItemCount(): number {
			return self.products.reduce<number>((a, b, _i) => a + b.count, 0);
		},
	}));

type ProductStoreType = Instance<typeof ProductStoreModel>;
export interface ProductStore extends ProductStoreType {}
type ProductStoreSnapshotType = SnapshotOut<typeof ProductStoreModel>;
export interface ProductStoreSnapshot extends ProductStoreSnapshotType {}
export const createProductStoreDefaultModel = () =>
	types.optional(ProductStoreModel, {});
