import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import {
	View,
	SafeAreaView,
	TextStyle,
	ViewStyle,
	FlatList,
} from "react-native";
import { Screen, Header, Text } from "../../components";
import { Card } from "../../components/card/card";
import { useStores } from "../../models";
import { Product } from "../../models/product/product";
import { NavigatorParamList } from "../../navigators";
import { color, spacing, shadow5, shadow10 } from "../../theme";

const FULL: ViewStyle = {
	flex: 1,
};

const CONTAINER: ViewStyle = {
	backgroundColor: color.palette.rose,
	marginBottom: 15,
};

const HEADER: ViewStyle = {
	paddingBottom: spacing[3] - 1,
	paddingHorizontal: spacing[3],
	paddingTop: spacing[3],
	backgroundColor: color.palette.muave,
	...shadow10,
};

const SUBHEADER: ViewStyle = {
	height: "10%",
	backgroundColor: color.palette.rose,
	...shadow5,
};
const SUBHEADER_CONTENT: ViewStyle = {
	marginBottom: -spacing[2],
	marginLeft: spacing[1],
	marginRight: spacing[1],
	flex: 1,
	borderBottomLeftRadius: spacing[2],
	borderBottomRightRadius: spacing[2],
	flexWrap: "wrap",
	flexDirection: "row",
	backgroundColor: color.palette.roseDarker,
};
const SUBHEADER_CONTAINERS: ViewStyle = {
	flex: 1,
	justifyContent: "center",
	width: "50%",
	height: "100%",
};

const HEADER_TITLE: TextStyle = {
	fontSize: 24,
	fontWeight: "bold",
	textAlign: "center",
};
const LIST_CONTAINER: ViewStyle = {
	flex: 0.5,
	margin: 2,
};
const FLAT_LIST: ViewStyle = {
	//paddingVertical: spacing[2],
};
const FOOTER: ViewStyle = {
	height: "15%",
	backgroundColor: color.palette.rose,
};
const FOOTER_CONTENT: ViewStyle = {
	marginTop: -spacing[2],
	marginLeft: spacing[1],
	marginRight: spacing[1],
	backgroundColor: color.palette.roseDarker,
	...shadow5,
	flex: 1,
	borderTopLeftRadius: spacing[2],
	borderTopRightRadius: spacing[2],
	flexWrap: "wrap",
	flexDirection: "row",
};
const TITLE_TEXT: TextStyle = {
	fontSize: 40,
	textAlignVertical: "center",
	alignSelf: "center",
	color: color.textDark,
};
const FOOTER_CONTAINERS: ViewStyle = {
	width: "50%",
	height: "50%",
};

function getTotal(products: Product[]): number {
	return products.reduce((sum, a) => sum + a.count * a.price, 0);
}

export const CalculatorScreen: FC<
	StackScreenProps<NavigatorParamList, "calculator">
> = observer(({ navigation }) => {
	const goBack = () => navigation.navigate("welcome");
	const { productStore } = useStores();
	const { products } = productStore;

	useEffect(() => {
		async function fetchData() {
			await productStore.getProducts();
		}
		fetchData();
	}, []);

	return (
		<View testID="CalculatorScreen" style={FULL}>
			<Screen
				style={CONTAINER}
				preset="fixed"
				backgroundColor={color.palette.rose}
			>
				<Header
					headerTx="calculatorScreen.calculator"
					style={HEADER}
					titleStyle={HEADER_TITLE}
					leftIcon="back"
					onLeftPress={goBack}
				/>
				<SafeAreaView style={SUBHEADER}>
					<View style={SUBHEADER_CONTENT}>
						<View style={SUBHEADER_CONTAINERS}>
							<Text style={{ ...TITLE_TEXT, fontWeight: "bold" }}>
								{"合計"}
							</Text>
						</View>
						<View style={SUBHEADER_CONTAINERS}>
							<Text style={TITLE_TEXT}>{getTotal(products)}</Text>
						</View>
					</View>
				</SafeAreaView>
				<FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={FLAT_LIST}
					data={[...products]}
					keyExtractor={(item) => String(item.id)}
					numColumns={2}
					horizontal={false}
					renderItem={({ item }) => (
						<View style={LIST_CONTAINER}>
							<Card product={item}></Card>
						</View>
					)}
				></FlatList>
			</Screen>
			<SafeAreaView style={FOOTER}>
				<View style={FOOTER_CONTENT}>
					<View style={FOOTER_CONTAINERS}>
						<Text style={{ ...TITLE_TEXT, fontWeight: "bold" }}>
							{"合計"}
						</Text>
					</View>
					<View style={FOOTER_CONTAINERS}>
						<Text style={{ ...TITLE_TEXT, fontWeight: "bold" }}>
							{"PV"}
						</Text>
					</View>
					<View style={FOOTER_CONTAINERS}>
						<Text style={TITLE_TEXT}>{getTotal(products)}</Text>
					</View>
				</View>
			</SafeAreaView>
		</View>
	);
});
