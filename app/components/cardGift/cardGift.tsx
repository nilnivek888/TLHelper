import { observer } from "mobx-react-lite";
import React from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { Text } from "..";
import { useStores } from "../../models";
import { Gift } from "../../models/gift/gift";
import { color, shadow } from "../../theme";

type CardGiftProps = { gift: Gift };

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
		const { productStore } = useStores();
		return (
			<View
				style={[
					cardFillStyle,
					productStore.totalPV < props.gift.PVCost && disabledStyles,
				]}
			>
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
			</View>
		);
	}
);
