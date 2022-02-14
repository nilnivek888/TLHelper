import { GeneralApiProblem } from "./api-problem";
import { Character } from "../../models/character/character";
import { Product } from "../../models/product/product";
import { Gift } from "../../models/gift/gift";

export interface User {
	id: number;
	name: string;
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem;
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem;

export type GetCharactersResult =
	| { kind: "ok"; characters: Character[] }
	| GeneralApiProblem;
export type GetCharacterResult =
	| { kind: "ok"; character: Character }
	| GeneralApiProblem;

export type GetProductsResult =
	| { kind: "ok"; products: Product[]; membershipFee: number }
	| GeneralApiProblem;

export type GetGiftsResult = { kind: "ok"; gifts: Gift[] } | GeneralApiProblem;
