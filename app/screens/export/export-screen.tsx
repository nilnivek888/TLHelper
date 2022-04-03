import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useRef, useState } from "react";
import {
	View,
	TextStyle,
	ViewStyle,
	FlatList,
	Alert,
	Modal,
	Text,
	Platform,
} from "react-native";
import { ActivityIndicator, Dimensions } from "react-native";
import { colors } from "react-native-elements";
import { Screen, Header } from "../../components";
import { ItemOrder } from "../../components/itemOrder/itemOrder";
import { useStores } from "../../models";
import { NavigatorParamList } from "../../navigators";
import { color, spacing, shadow } from "../../theme";
import { exportToExcel, shareFile } from "../../utils/printer/printer";

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
	const [loading, setLoading] = useState(false);
	function removeItem(id: number) {
		return orderStore.removeOrder(id);
	}
	const flatList = useRef<FlatList<any>>();
	return (
		<View testID="ExportScreen" style={FULL}>
			{loading && (
				<Modal
					visible={loading}
					transparent={true}
					animationType={"none"}
					style={{ justifyContent: "center" }}
				>
					<View
						style={{
							flex: 1,
							alignItems: "center",
							flexDirection: "column",
							justifyContent: "space-around",
							backgroundColor: color.dim,
						}}
					>
						<View
							style={{
								backgroundColor: "#FFFFFF",
								height: 100,
								width: 100,
								borderRadius: 10,
								display: "flex",
								alignItems: "center",
								alignSelf: "center",
								justifyContent: "space-around",
							}}
						>
							<ActivityIndicator
								size={"large"}
								animating={true}
							/>
						</View>
					</View>
				</Modal>
			)}
			<Screen style={CONTAINER} preset="fixed" unsafe>
				<Header
					headerText="待印表單"
					style={HEADER}
					titleStyle={HEADER_TITLE}
					rightIcon="export"
					onRightPress={() => {
						Alert.alert("填入表單", "填入表單並匯出excel檔", [
							{
								text: "確定",
								onPress: async () => {
									if (Platform.OS === "android") {
										setLoading(true);
									}
									// console.log("1. shild up");
									const newUri = await exportToExcel(
										orderStore
									);

									// console.log("3. shild down");

									await shareFile(newUri);
									setLoading(false);
								},
								style: "cancel",
							},
							{ text: "取消" },
						]);
					}}
				/>
				{orders.length === 0 ? (
					<>
						<View
							style={{
								width: "100%",
								height: "100%",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: color.lightText,
							}}
						>
							<Text
								maxFontSizeMultiplier={1}
								style={{
									color: color.primary,
									fontSize: 48,
									textAlign: "center",
								}}
							>
								{"尚未加入訂單"}
							</Text>
						</View>
					</>
				) : (
					<FlatList
						ref={flatList}
						removeClippedSubviews={false}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={FLAT_LIST}
						data={[...orders]}
						keyExtractor={item => String(item.id)}
						horizontal={false}
						onContentSizeChange={() =>
							flatList?.current.scrollToEnd()
						}
						renderItem={({ item }) => (
							<View style={LIST_CONTAINER}>
								<ItemOrder
									order={item}
									onDelete={() => removeItem(item.id)}
								/>
							</View>
						)}
					/>
				)}
			</Screen>
		</View>
	);
});
