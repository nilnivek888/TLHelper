import { Alert } from "react-native";
import { BooleanStore } from "../models";
import { GiftStore } from "../models/gift-store/gift-store";
import { ProductStore } from "../models/product-store/product-store";

function getSummary(
	productSummary: string,
	giftSummary: string,
	totalPrice: number
): string {
	if (!productSummary && !giftSummary) {
		return "購物車為空";
	}
	return (
		(productSummary.length ? "《商品》\n" : "") +
		productSummary +
		(giftSummary.length ? "\n《贈品》\n" : "") +
		giftSummary +
		"\n《總價》\n" +
		totalPrice
	);
}

export function sendSummaryAlert(
	productStore: ProductStore,
	giftStore: GiftStore,
	feeIncludedStore: BooleanStore
) {
	Alert.alert(
		"總覽",
		getSummary(
			productStore.productSummary,
			giftStore.giftSummary,
			productStore.getTotalPrice(feeIncludedStore.feeIncluded)
		),
		[{ text: "OK" }]
	);
}
