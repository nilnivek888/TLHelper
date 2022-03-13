import { GeneralApiProblem } from "./api-problem";
import { Product } from "../../models/product/product";
import { Gift } from "../../models/gift/gift";

export interface User {
	id: number;
	name: string;
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem;
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem;

export type GetProductsResult =
	| {
			kind: "ok";
			products: Product[];
			membershipFee: number;
			feeColumnToFile: number;
	  }
	| GeneralApiProblem;

export type GetGiftsResult =
	| { kind: "ok"; gifts: Gift[]; other: string }
	| GeneralApiProblem;
