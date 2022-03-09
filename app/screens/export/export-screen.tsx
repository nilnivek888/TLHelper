import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { View, TextStyle, ViewStyle, FlatList, Alert } from "react-native";
import { Screen, Header, Text, Button, CheckBox } from "../../components";
import { Card } from "../../components/card/card";
import { ItemOrder } from "../../components/itemOrder/itemOrder";
import { useStores } from "../../models";
import { Order } from "../../models/order/order";
import { NavigatorParamList } from "../../navigators";
import { color, spacing, shadow, shadowup } from "../../theme";
import { sendSummaryAlert } from "../../utils/bag";
import { exportToExcel } from "../../utils/printer/printer";

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

const HEADER_TITLE: TextStyle = {
	fontSize: 24,
	fontWeight: "bold",
	textAlign: "center",
};
const LIST_CONTAINER: ViewStyle = {
	flex: 0.5,
};
const FLAT_LIST: ViewStyle = {
	marginHorizontal: spacing[1],
	marginVertical: "auto",
	zIndex: 1,
};

export const ExportScreen: FC<
	StackScreenProps<NavigatorParamList, "calculator">
> = observer(({ navigation }) => {
	const {
		productStore,
		giftStore,
		feeIncludedStore,
		orderStore,
	} = useStores();
	const { orders } = orderStore;

	function removeItem(id: number) {
		return orderStore.removeOrder(id);
	}
	return (
		<View testID="ExportScreen" style={FULL}>
			<Screen style={CONTAINER} preset="fixed" unsafe>
				<Header
					headerTx="calculatorScreen.calculator"
					style={HEADER}
					titleStyle={HEADER_TITLE}
					rightIcon="export"
					onRightPress={() => {
						Alert.alert("填入表單", "清除所有訂單並填入標單", [
							{
								text: "確定",
								onPress: () => {
									exportToExcel(orderStore);
								},
								style: "destructive",
							},
							{ text: "取消", style: "cancel" },
						]);
					}}
				/>
				<FlatList
					removeClippedSubviews={false}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={FLAT_LIST}
					data={[...orders]}
					keyExtractor={(item) => String(item.id)}
					horizontal={false}
					renderItem={({ item }) => (
						<View style={LIST_CONTAINER}>
							<ItemOrder
								order={item}
								onDelete={() => removeItem(item.id)}
							/>
						</View>
					)}
				/>
			</Screen>
		</View>
	);
});
