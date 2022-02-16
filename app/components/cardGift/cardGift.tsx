import React from "react";
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Icon, Text } from "..";
import { useStores } from "../../models";
import { Gift } from "../../models/gift/gift";
import { color, shadow } from "../../theme";

type CardGiftProps = { gift: Gift; disabled?: boolean };

const cardFillStyle: ViewStyle = {
	backgroundColor: color.palette.blackBean,
	flexDirection: "row",
	height: 146,
	borderRadius: 9,
	...shadow,
	zIndex: 5,
	margin: 2,
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
	tintColor: color.palette.rose,
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
export function CardGift(props: CardGiftProps) {
	const product = props.gift;
	const { productStore, giftStore } = useStores();

	return (
		<View style={[cardFillStyle, props.disabled && disabledStyles]}>
			<TouchableOpacity
				style={{
					height: "100%",
					width: "95%",
					flex: 0,
					justifyContent: "space-between",
					flexDirection: "column",
				}}
				activeOpacity={1}
			>
				<Text
					style={{ ...cardTextStyle, alignSelf: "flex-start" }}
					adjustsFontSizeToFit
					numberOfLines={1}
				>
					{product.name}
				</Text>
				<Text
					style={{
						...cardTextStyle,
						fontSize: 32,
						alignSelf: "flex-start",
					}}
					adjustsFontSizeToFit
					numberOfLines={2}
				>
					{`價值:$${product.value}\nPV:${product.PVCost}`}
				</Text>
			</TouchableOpacity>

			<View style={counterFillStyle}>
				<Button
					preset="card_Vertical"
					onPress={product.increment}
					disabled={
						props.disabled ||
						productStore.totalPV - giftStore.totalPVCost <
							product.PVCost
					}
				>
					<Icon
						icon="plus"
						style={iconStyle}
						containerStyle={iconContainerStyle}
					/>
				</Button>

				<View style={flexWrapStyle}>
					<Text style={counterTextStyle}> {product.count}</Text>
				</View>
				<Button
					preset="card_Vertical"
					onPress={product.decrement}
					disabled={props.disabled || product.count === 0}
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
