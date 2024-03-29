import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react";
import { View, TextStyle, ViewStyle, FlatList } from "react-native";
import { Screen, Header, Text } from "../../components";
import { CardGift } from "../../components/cardGift/cardGift";
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

const HEADER_TITLE: TextStyle = {
	fontSize: 24,
	fontWeight: "bold",
	textAlign: "center",
};
const LIST_CONTAINER: ViewStyle = {
	margin: 1,
};
const FLAT_LIST: ViewStyle = {
	paddingTop: spacing[1],
	paddingBottom: spacing[7],
	marginHorizontal: spacing[1],
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
	width: "100%",
	height: "50%",
	justifyContent: "center",
};

export const GiftScreen: FC<
	StackScreenProps<NavigatorParamList, "gift">
> = observer(({ navigation }) => {
	const {
		giftStore,
		productStore,
		feeIncludedStore,
		orderStore,
	} = useStores();
	const { gifts, otherMsg } = giftStore;
	useEffect(() => {
		async function fetchData() {
			await giftStore.getGifts();
			console.log("gifts loaded");
		}
		fetchData();
	}, []);

	return (
		<View testID="GiftScreen" style={FULL}>
			<Screen
				style={CONTAINER}
				preset="fixed"
				backgroundColor={color.primary}
				unsafe
			>
				<Header
					headerText="贈品"
					style={HEADER}
					titleStyle={HEADER_TITLE}
					rightIcon="bag"
					onRightPress={() => {
						sendSummaryAlert(
							productStore,
							giftStore,
							feeIncludedStore,
							orderStore,
							() => navigation.navigate("export")
						);
					}}
				/>
				<FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={FLAT_LIST}
					data={[...gifts]}
					keyExtractor={item => String(item.id)}
					numColumns={1}
					horizontal={false}
					renderItem={({ item }) => (
						<View style={LIST_CONTAINER}>
							<CardGift gift={item} />
						</View>
					)}
				></FlatList>
			</Screen>
			<View style={FOOTER}>
				<View style={FOOTER_CONTENT}>
					<View style={FOOTER_CONTAINERS}>
						<Text
							adjustsFontSizeToFit
							style={{
								...TITLE_TEXT,
								fontWeight: "bold",
								textAlign: "left",
								alignSelf: "flex-start",
								paddingHorizontal: spacing[3],
							}}
						>
							{"其他活動:"}
						</Text>
					</View>
					<View style={FOOTER_CONTAINERS}>
						<Text
							adjustsFontSizeToFit
							style={{ ...TITLE_TEXT, fontWeight: "bold" }}
						>
							{otherMsg}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
});
