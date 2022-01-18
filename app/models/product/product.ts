// import { Instance, SnapshotOut, types } from "mobx-state-tree"

// /**
//  * Product model.
//  */
// export const ProductModel = types.model("Product").props({
//   id: types.identifierNumber,
//   name: types.maybe(types.string),
//   price: types.maybe(types.number),
//   image: types.maybe(types.string),
// })

// type CharacterType = Instance<typeof CharacterModel>
// export interface Character extends CharacterType {}
// type CharacterSnapshotType = SnapshotOut<typeof CharacterModel>
// export interface CharacterSnapshot extends CharacterSnapshotType {}
// export const createCharacterDefaultModel = () => types.optional(CharacterModel, {}
