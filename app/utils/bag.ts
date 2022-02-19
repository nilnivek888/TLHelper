export function getSummary(
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
