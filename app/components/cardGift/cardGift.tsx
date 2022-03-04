import I18n from "i18n-js";
import { observer } from "mobx-react-lite";
import React from "react";
import { Alert, ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { Button, Icon, Text } from "..";
import { useStores } from "../../models";
import { Gift } from "../../models/gift/gift";
import { color, shadow } from "../../theme";

type CardGiftProps = { gift: Gift; disabled?: boolean };

const cardFillStyle: ViewStyle = {
	backgroundColor: color.primaryDarker,
	flexDirection: "row",
	height: 146,
	borderRadius: 9,
	...shadow,
	zIndex: 5,
	marginVertical: 1,
	width: "100%",
};
const cardTextStyle: TextStyle = {
	fontSize: 44,
	textAlignVertical: "center",
	textAlign: "center",
	alignSelf: "center",
	paddingHorizontal: "2%",
	paddingVertical: "1%",
};
const counterFillStyle: ViewStyle = {
	backgroundColor: color.primary,
	height: "90%",
	width: "10%",
	borderRadius: 9,
	marginLeft: "auto",
	marginRight: "2%",
	marginTop: "auto",
	marginBottom: "auto",
	justifyContent: "space-between",
};

const counterTextStyle: TextStyle = {
	fontSize: 24,
	width: "100%",
	textAlignVertical: "center",
	textAlign: "center",
	alignSelf: "center",
	position: "absolute",
	margin: "auto",
};

const flexWrapStyle: ViewStyle = {
	borderRadius: 4,
	width: "100%",
	justifyContent: "center",
	alignItems: "center",
	padding: 0,
};

const iconStyle: ImageStyle = {
	height: "90%",
	width: "90%",
	tintColor: color.lightText,
};

const iconContainerStyle: ViewStyle = {
	height: "100%",
	width: "100%",
	alignItems: "center",
	justifyContent: "center",
	paddingHorizontal: 8,
};

const disabledStyles: ViewStyle = {
	opacity: 0.5,
	elevation: 0,
	shadowOffset: {
		width: 0,
		height: 0,
	},
};

/**
 *  A component consisting of 3 buttons and 2 short texts (less than 10 characters)
 *  This component will hold Item ID, Item count, plus button, minus button, item button
 */
export const CardGift: React.FC<CardGiftProps> = observer(
	(props: CardGiftProps) => {
		const gift = props.gift;
		const { productStore, giftStore } = useStores();

		return (
			<View style={[cardFillStyle, props.disabled && disabledStyles]}>
				<View
					style={{
						height: "100%",
						width: "90%",
						justifyContent: "space-between",
						flexDirection: "column",
						flex: 0,
					}}
				>
					<View style={{ flex: 1, justifyContent: "center" }}>
						<Text
							style={{
								...cardTextStyle,
								fontSize: 40,
								alignSelf: "flex-start",
							}}
							adjustsFontSizeToFit
							numberOfLines={1}
							maxFontSizeMultiplier={1}
						>
							{gift.name}
						</Text>
					</View>

					<Text
						style={{
							...cardTextStyle,
							fontSize: 20,
							textAlign: "left",
							alignSelf: "flex-start",
						}}
						adjustsFontSizeToFit
						maxFontSizeMultiplier={1.5}
						numberOfLines={2}
					>
						{`價值:$${gift.value}
PV:${gift.PVCost}`}
					</Text>
				</View>

				<View style={counterFillStyle}>
					<Button
						preset="card_Vertical"
						onPress={() => {
							if (
								productStore.totalPV - giftStore.totalPVCost <
								gift.PVCost
							) {
								Alert.alert(
									I18n.t("errors.insufficientPV", {
										PV:
											gift.PVCost -
											productStore.totalPV +
											giftStore.totalPVCost,
									}),
									"",
									[{ text: "OK" }]
								);
							} else {
								gift.increment();
							}
						}}
						disabled={props.disabled}
					>
						<Icon
							icon="plus"
							style={iconStyle}
							containerStyle={{
								...iconContainerStyle,
							}}
						/>
					</Button>

					<View style={flexWrapStyle}>
						<Text maxFontSizeMultiplier={1} style={counterTextStyle}>
							{" "}
							{gift.count}
						</Text>
					</View>
					<Button
						preset="card_Vertical"
						onPress={gift.decrement}
						disabled={props.disabled || gift.count === 0}
					>
						<Icon
							icon="minus"
							style={iconStyle}
							containerStyle={iconContainerStyle}
						/>
					</Button>
				</View>
			</View>
		);
	}
);
