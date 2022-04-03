import { cast } from "mobx-state-tree";
import { Alert } from "react-native";
import { BooleanStore } from "../models";
import { GiftStore } from "../models/gift-store/gift-store";
import { OrderStore } from "../models/order-store/order-store";
import { OrderModel } from "../models/order/order";
import { ProductStore } from "../models/product-store/product-store";

function getSummary(
	productStore: ProductStore,
	giftSummary: string,
	totalPrice: number,
	feeIncluded: boolean
): string {
	if (!productStore.productSummary && !giftSummary && !feeIncluded) {
		return "購物車為空";
	}
	return (
		(productStore.productSummary.length ? "《商品》\n" : "") +
		productStore.productSummary +
		"\n《商品總件數》\n" +
		productStore.totalItemCount +
		(giftSummary.length ? "\n《贈品》\n" : "") +
		giftSummary +
		"\n《總價》\n" +
		totalPrice +
		(feeIncluded ? "(含入會費)" : "")
	);
}

export function sendSummaryAlert(
	productStore: ProductStore,
	giftStore: GiftStore,
	feeIncludedStore: BooleanStore,
	orderStore: OrderStore,
	goNextScreen: () => void
) {
	const totalPrice = productStore.getTotalPrice(feeIncludedStore.feeIncluded);
	Alert.alert(
		"總覽",
		getSummary(
			productStore,
			giftStore.getGiftSummary(productStore.totalPV),
			totalPrice,
			feeIncludedStore.feeIncluded
		),
		totalPrice
			? [
					{
						text: "匯入表單",
						onPress: () => {
							orderStore.addOrder(
								cast(
									OrderModel.create({
										id: new Date().valueOf(),
										prodsManifest: productStore.manifest,
										feeIncluded:
											feeIncludedStore.feeIncluded,
										totalPrice: totalPrice,
										name: "",
									})
								)
							);
							orderStore.setMapToPrdColumns(
								productStore.mapToPrdColumns
							);
							goNextScreen();
						},
						style: "cancel",
					},
					{ text: "OK" },
			  ]
			: [{ text: "OK" }]
	);
}
