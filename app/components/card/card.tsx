import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import {
	ImageStyle,
	TextInput,
	TextStyle,
	View,
	ViewStyle,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Icon, Text } from "..";
import { useStores } from "../../models";
import { Product } from "../../models/product/product";
import { color, shadow, spacing } from "../../theme";

type CardProps = { product: Product };

const cardFillStyle: ViewStyle = {
	backgroundColor: color.primaryDarker,
	height: 146,
	borderRadius: 9,
	...shadow,
	zIndex: 5,
	elevation: 5,
	margin: 2,
};
const cardTextStyle: TextStyle = {
	fontSize: 44,
	textAlignVertical: "center",
	textAlign: "center",
	alignSelf: "center",
	padding: spacing[1],
};
const counterFillStyle: ViewStyle = {
	backgroundColor: color.primary,
	height: "40%",
	width: "90%",
	borderRadius: 9,
	marginLeft: "auto",
	marginRight: "auto",
	marginTop: "auto",
	marginBottom: "5%",
	...shadow,
	elevation: 5,
	flexDirection: "row",
	justifyContent: "center",
};

const counterTextStyle: TextStyle = {
	fontSize: 54,
	width: "100%",
	color: color.textDark,
	textAlignVertical: "center",
	textAlign: "center",
	alignSelf: "center",
	position: "absolute",
	margin: "auto",
};

const flexWrapStyle: ViewStyle = {
	borderRadius: 4,
	width: "50%",
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

/**
 *  A component consisting of 3 buttons and 2 short texts (less than 10 characters)
 *  This component will hold Item ID, Item count, plus button, minus button, item button
 */
export const Card: React.FC<CardProps> = observer((props: CardProps) => {
	const product = props.product;
	const [cnt, setCnt] = useState(0);
	return (
		<View style={cardFillStyle}>
			<TouchableOpacity
				style={{
					width: "100%",
					height: "70%",
					justifyContent: "center",
				}}
				activeOpacity={1}
			>
				<Text
					style={cardTextStyle}
					adjustsFontSizeToFit
					numberOfLines={1}
				>
					{product.displayName ?? product.name}
				</Text>
			</TouchableOpacity>

			<View style={counterFillStyle}>
				<Button
					preset="card"
					onPress={() => {
						product.decrement();
					}}
					disabled={product.count === 0}
				>
					<Icon
						icon="minus"
						style={iconStyle}
						containerStyle={iconContainerStyle}
					/>
				</Button>

				<View style={flexWrapStyle}>
					<TextInput
						maxFontSizeMultiplier={1}
						style={counterTextStyle}
						keyboardType="number-pad"
						value={props.product.count.toString()}
						onChangeText={text => props.product.setCount(+text)}
						selectTextOnFocus
						maxLength={2}
					></TextInput>
				</View>
				<Button preset="card" onPress={product.increment}>
					<Icon
						icon="plus"
						style={iconStyle}
						containerStyle={iconContainerStyle}
					/>
				</Button>
			</View>
		</View>
	);
});
