import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Alert, Animated, ImageStyle, ViewStyle } from "react-native";
import { ListItem } from "react-native-elements";
import { Button, Icon } from "..";
import { useStores } from "../../models";
import { Order } from "../../models/order/order";
import { NavigatorParamList } from "../../navigators";
import { color } from "../../theme";

type ItemOrderProps = { order: Order; onDelete: () => void };

const iconStyle: ImageStyle = {
	height: "70%",
	width: "70%",
	tintColor: color.white,
};

const iconContainerStyle: ViewStyle = {
	alignItems: "center",
	justifyContent: "center",
	padding: 8,
};

const FadeInView = props => {
	const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}, [fadeAnim]);

	return (
		<Animated.View // Special animatable View
			style={{
				...props.style,
				opacity: fadeAnim, // Bind opacity to animated value
			}}
		>
			{props.children}
		</Animated.View>
	);
};

export const ItemOrder: React.FC<ItemOrderProps> = observer(
	(props: ItemOrderProps) => {
		const { productStore, feeIncludedStore } = useStores();
		const navigation = useNavigation<
			StackNavigationProp<NavigatorParamList>
		>();

		return (
			<FadeInView>
				<ListItem>
					<ListItem.Content>
						<ListItem.Input
							value={props.order.name}
							onChangeText={txt => {
								props.order.setName(txt);
							}}
							placeholder="輸入姓名"
							textAlign={"left"}
						/>
						<ListItem.Subtitle style={{ paddingLeft: 15 }}>
							{"$ " + props.order.totalPrice}
						</ListItem.Subtitle>
					</ListItem.Content>
					<ListItem.Content
						right
						style={{
							flexDirection: "row",
							width: "50%",
						}}
					>
						<Button
							preset="listItem"
							onPress={() =>
								Alert.alert(
									"載入訂單",
									"將該訂單從表單刪除並匯入購物車?",
									[
										{
											text: "確定",
											onPress: () => {
												productStore.update(
													props.order.prodsManifest
												);
												if (
													feeIncludedStore.feeIncluded !==
													props.order.feeIncluded
												) {
													feeIncludedStore.toggle();
												}
												props.onDelete();
												navigation.navigate(
													"calculator"
												);
											},
											style: "cancel",
										},
										{ text: "取消" },
									]
								)
							}
							style={{
								backgroundColor: color.primaryDarker,
								height: "50%",
								width: "50%",
								justifyContent: "center",
							}}
						>
							<Icon
								icon="load"
								style={iconStyle}
								containerStyle={iconContainerStyle}
							/>
						</Button>
						<Button
							preset="listItem"
							onPress={() =>
								Alert.alert("刪除訂單", "確定要刪除?", [
									{
										text: "確定",
										onPress: props.onDelete,
										style: "cancel",
									},
									{ text: "取消" },
								])
							}
							style={{
								backgroundColor: color.error,
								height: "50%",
								width: "50%",
								justifyContent: "center",
								marginHorizontal: 5,
							}}
						>
							<Icon
								icon="delete"
								style={iconStyle}
								containerStyle={iconContainerStyle}
							/>
						</Button>
					</ListItem.Content>
				</ListItem>
			</FadeInView>
		);
	}
);
