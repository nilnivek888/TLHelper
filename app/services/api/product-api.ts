import { Api } from "./api";
import { GetProductsResult } from "./api.types";
import { Product, ProductModel } from "../../models/product/product";

export class ProductApi {
	private api: Api;

	constructor(api: Api) {
		this.api = api;
	}

	async getProducts(): Promise<GetProductsResult> {
		try {
			const prds = [
				ProductModel.create({
					id: 1,
					name: "1",
					price: 20,
					image: "",
					count: 10,
					PV: 200,
				}) as Product,
				ProductModel.create({
					id: 2,
					name: "2",
					price: 20,
					image: "",
					count: 10,
					PV: 400,
				}) as Product,
				ProductModel.create({
					id: 3,
					name: "3",
					price: 30,
					image: "",
					count: 10,
					PV: 500,
				}) as Product,
				ProductModel.create({
					id: 4,
					name: "4",
					price: 40,
					image: "",
					count: 10,
					PV: 400,
				}) as Product,
				ProductModel.create({
					id: 5,
					name: "5",
					price: 50,
					image: "",
					count: 10,
					PV: 1200,
				}) as Product,
				ProductModel.create({
					id: 6,
					name: "6",
					price: 60,
					image: "",
					count: 10,
					PV: 1000,
				}) as Product,
				ProductModel.create({
					id: 7,
					name: "7",
					price: 70,
					image: "",
					count: 10,
					PV: 2100,
				}) as Product,
			];

			return {
				kind: "ok",
				products: prds,
				membershipFee: 200,
			};
		} catch (e) {
			__DEV__ && console.tron.log(e.message);
			return { kind: "bad-data" };
		}
	}
}
