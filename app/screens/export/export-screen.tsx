import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useRef } from "react";
import { View, TextStyle, ViewStyle, FlatList, Alert } from "react-native";
import { Screen, Header } from "../../components";
import { ItemOrder } from "../../components/itemOrder/itemOrder";
import { useStores } from "../../models";
import { NavigatorParamList } from "../../navigators";
import { color, spacing, shadow } from "../../theme";
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
	const { orderStore } = useStores();
	const { orders } = orderStore;

	function removeItem(id: number) {
		return orderStore.removeOrder(id);
	}
	const flatList = useRef<FlatList<any>>();
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
								style: "cancel",
							},
							{ text: "取消" },
						]);
					}}
				/>
				<FlatList
					ref={flatList}
					removeClippedSubviews={false}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={FLAT_LIST}
					data={[...orders]}
					keyExtractor={(item) => String(item.id)}
					horizontal={false}
					onContentSizeChange={() => flatList?.current.scrollToEnd()}
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
