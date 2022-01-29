import React from "react";
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { Button, Icon, Text } from "..";
import { Product } from "../../models/product/product";
import { color, shadow } from "../../theme";

type CardProps = { product: Product };

const cardFillStyle: ViewStyle = {
	backgroundColor: "#3d1308",
	height: 146,
	borderRadius: 9,
	...shadow,
	zIndex: 5,
	elevation: 5,
	margin: 2,
};
const cardTextStyle: TextStyle = {
	fontSize: 54,
	textAlignVertical: "center",
	textAlign: "center",
	alignSelf: "center",
	position: "absolute",
	width: "100%",
	left: 0,
};
const counterFillStyle: ViewStyle[] = [
	{
		backgroundColor: "#945f78",
		height: "40%",
		width: "90%",
		borderRadius: 9,
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: "auto",
		marginBottom: "5%",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		flexDirection: "row",
		justifyContent: "center",
	},
];

const counterTextStyle: TextStyle[] = [
	{
		fontSize: 50,
		textAlignVertical: "center",
		textAlign: "center",
		alignSelf: "center",
		position: "absolute",
	},
];

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
	tintColor: color.palette.rose,
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
export function Card(props: CardProps) {
	const product = props.product;

	return (
		<View style={cardFillStyle}>
			<View style={{ width: "100%", height: "55%" }}>
				<Text style={cardTextStyle}> {product.name}</Text>
			</View>

			<View style={counterFillStyle}>
				<Button preset="card" onPress={product.decrement}>
					<Icon
						icon="minus"
						style={iconStyle}
						containerStyle={iconContainerStyle}
					/>
				</Button>

				<View style={flexWrapStyle}>
					<Text style={counterTextStyle}> {product.count}</Text>
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
}
