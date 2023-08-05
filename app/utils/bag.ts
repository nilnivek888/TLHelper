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
	feeIncluded: boolean,
	hasPromotion: boolean
): string {
	if (!productStore.productSummary && !giftSummary && !feeIncluded) {
		return "購物車為空";
	}
	const productStr =
		(productStore.productSummary.length ? "《商品》\n" : "") +
		productStore.productSummary;
	const productCountStr = "\n《商品總件數》\n" + productStore.totalItemCount;
	const giftStr =
		hasPromotion && giftSummary.length ? `\n《贈品》\n${giftSummary}` : "";
	const totalPriceStr =
		"\n《總價》\n" + totalPrice + (feeIncluded ? "(含入會費)" : "");
	return productStr + productCountStr + giftStr + totalPriceStr;
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
			feeIncludedStore.feeIncluded,
			giftStore.hasPromotion
		),
		totalPrice && giftStore.hasPromotion
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
