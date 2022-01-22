import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Product model.
 */
export const ProductModel = types.model("Product").props({
  id: types.identifierNumber,
  name: types.string,
  price: types.number,
  image: types.maybe(types.string),
})

type ProductType = Instance<typeof ProductModel>
export interface Product extends ProductType {}
type ProductSnapshotType = SnapshotOut<typeof ProductModel>
export interface ProductSnapshot extends ProductSnapshotType {}
export const createProductDefaultModel = () => types.optional(ProductModel, {});
