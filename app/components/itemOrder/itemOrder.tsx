import { observer } from "mobx-react-lite";
import {
	applySnapshot,
	castToReferenceSnapshot,
	destroy,
} from "mobx-state-tree";
import React, { useRef, useState } from "react";
import {
	Alert,
	ImageStyle,
	PixelRatio,
	TextStyle,
	View,
	ViewStyle,
} from "react-native";
import { ListItem } from "react-native-elements";
import { Button, Icon, Text } from "..";
import { useStores } from "../../models";
import { Order, OrderModel } from "../../models/order/order";
import { color, shadow, spacing } from "../../theme";

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

export const ItemOrder: React.FC<ItemOrderProps> = observer(
	(props: ItemOrderProps) => {
		const { productStore } = useStores();
		return (
			<ListItem>
				<ListItem.Content>
					<ListItem.Input
						value={props.order.name}
						onChangeText={(txt) => {
							props.order.setName(txt);
						}}
						placeholder="輸入姓名"
						textAlign={"left"}
					/>
					<ListItem.Subtitle style={{ paddingLeft: 15 }}>
						{props.order.totalPrice} {props.order.prodsManifest}
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
											console.log(
												JSON.stringify(props.order)
											);
											productStore.update(
												props.order.prodsManifest
											);
										},
										style: "destructive",
									},
									{ text: "取消", style: "cancel" },
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
									style: "destructive",
								},
								{ text: "取消", style: "cancel" },
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
		);
	}
);
