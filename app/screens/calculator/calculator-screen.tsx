import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { View, TextStyle, ViewStyle, FlatList } from "react-native";
import { Screen, Header, Text, Button, CheckBox } from "../../components";
import { Card } from "../../components/card/card";
import { useStores } from "../../models";
import { NavigatorParamList } from "../../navigators";
import { color, spacing, shadow, shadowup } from "../../theme";
import { sendSummaryAlert } from "../../utils/bag";

const FULL: ViewStyle = {
	flex: 1,
};

const CONTAINER: ViewStyle = {
	backgroundColor: color.lightText,
};

const HEADER: ViewStyle = {
	paddingBottom: spacing[3] - 1,
	paddingHorizontal: spacing[3],
	paddingTop: spacing[3],
	backgroundColor: color.primary,
	...shadow,
	zIndex: 10,
	elevation: 10,
};

const SUBHEADER: ViewStyle = {
	height: "8%",
	zIndex: 5,
};
const SUBHEADER_CONTENT: ViewStyle = {
	...shadow,
	elevation: 5,
	marginBottom: -spacing[2],
	marginLeft: spacing[1],
	marginRight: spacing[1],
	flex: 1,
	borderBottomLeftRadius: spacing[2],
	borderBottomRightRadius: spacing[2],
	flexWrap: "wrap",
	flexDirection: "row",
	backgroundColor: color.lightDarker,
};
const SUBHEADER_CONTAINERS: ViewStyle = {
	flex: 1,
	justifyContent: "center",
	width: "50%",
	height: "100%",
	flexWrap: "nowrap",
	flexDirection: "row",
};

const HEADER_TITLE: TextStyle = {
	fontSize: 24,
	fontWeight: "bold",
	textAlign: "center",
};
const LIST_CONTAINER: ViewStyle = {
	flex: 0.5,
};
const FLAT_LIST: ViewStyle = {
	paddingTop: spacing[2],
	paddingBottom: spacing[3],
	marginHorizontal: spacing[1],
	marginVertical: "auto",
	zIndex: 1,
};
const FOOTER: ViewStyle = {
	height: "12%",
	backgroundColor: color.lightText,
};
const FOOTER_CONTENT: ViewStyle = {
	marginTop: -spacing[2],
	marginLeft: spacing[1],
	marginRight: spacing[1],
	backgroundColor: color.lightDarker,
	...shadowup,
	elevation: 5,
	flex: 1,
	borderTopLeftRadius: spacing[2],
	borderTopRightRadius: spacing[2],
	flexWrap: "wrap",
	flexDirection: "row",
};
const TITLE_TEXT: TextStyle = {
	fontSize: 36,
	textAlignVertical: "center",
	alignSelf: "center",
	color: color.textDark,
};
const FOOTER_CONTAINERS: ViewStyle = {
	width: "50%",
	height: "50%",
	justifyContent: "center",
};

type TotalProps = {
	style: TextStyle;
	fee: number;
};

const Total = observer((props: TotalProps) => {
	const { feeIncludedStore, productStore } = useStores();
	return (
		<Text adjustsFontSizeToFit style={props.style}>
			{productStore.getTotalPrice(feeIncludedStore.feeIncluded)}
		</Text>
	);
});

export const CalculatorScreen: FC<
	StackScreenProps<NavigatorParamList, "calculator">
> = observer(({ navigation }) => {
	const {
		productStore,
		giftStore,
		feeIncludedStore,
		orderStore,
	} = useStores();
	const { products } = productStore;
	useEffect(() => {
		async function fetchData() {
			await productStore.getProducts();
		}
		fetchData();
	}, []);

	return (
		<View testID="CalculatorScreen" style={FULL}>
			<Screen style={CONTAINER} preset="fixed" unsafe>
				<Header
					headerTx="calculatorScreen.calculator"
					style={HEADER}
					titleStyle={HEADER_TITLE}
					rightIcon="bag"
					onRightPress={() => {
						sendSummaryAlert(
							productStore,
							giftStore,
							feeIncludedStore,
							orderStore
						);
					}}
				/>
				<View style={SUBHEADER}>
					<View style={SUBHEADER_CONTENT}>
						<View style={SUBHEADER_CONTAINERS}>
							<CheckBox
								style={{
									height: "100%",
									alignItems: "center",
								}}
								color={color.primaryDarker}
								labelStyle={TITLE_TEXT}
								text={"入會費"}
							/>
						</View>
						<View style={SUBHEADER_CONTAINERS}>
							<Button
								style={{
									height: "75%",
									width: "50%",
									alignSelf: "center",
									backgroundColor: color.accent,
								}}
								textStyle={{
									...TITLE_TEXT,
									position: "absolute",
									color: color.accentDarker,
									paddingHorizontal: 0,
								}}
								onPress={() => {
									productStore.clear();
									giftStore.clear();
								}}
								text="清除"
							/>
						</View>
					</View>
				</View>
				<FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={FLAT_LIST}
					data={[...products]}
					keyExtractor={(item) => String(item.id)}
					numColumns={2}
					horizontal={false}
					renderItem={({ item }) => (
						<View style={LIST_CONTAINER}>
							<Card product={item} />
						</View>
					)}
				/>

				<View style={FOOTER}>
					<View style={FOOTER_CONTENT}>
						<View style={FOOTER_CONTAINERS}>
							<Text
								maxFontSizeMultiplier={1}
								style={{ ...TITLE_TEXT, fontWeight: "bold" }}
							>
								{"合計"}
							</Text>
						</View>
						<View style={FOOTER_CONTAINERS}>
							<Text
								maxFontSizeMultiplier={1}
								style={{ ...TITLE_TEXT, fontWeight: "bold" }}
							>
								{"PV"}
							</Text>
						</View>
						<View style={FOOTER_CONTAINERS}>
							<Total
								style={TITLE_TEXT}
								fee={productStore.membershipFee}
							/>
						</View>
						<View style={FOOTER_CONTAINERS}>
							<Text adjustsFontSizeToFit style={TITLE_TEXT}>
								{productStore.totalPV}
							</Text>
						</View>
					</View>
				</View>
			</Screen>
		</View>
	);
});
