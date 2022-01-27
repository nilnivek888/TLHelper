import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { CharacterStoreModel } from "../character-store/character-store";
import { ProductStoreModel } from "../product-store/product-store";

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  productStore: types.optional(ProductStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
