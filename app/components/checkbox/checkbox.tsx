import * as React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { Text } from "../text/text";
import { spacing } from "../../theme";
import { CheckBoxProps } from "./checkbox.props";
import { Checkbox } from "react-native-paper";
import { useStores } from "../../models";
import { observer } from "mobx-react-lite";

const ROOT: ViewStyle = {
	flexDirection: "row",
	paddingVertical: spacing[1],
	alignSelf: "flex-start",
};

export const CheckBox = observer((props: CheckBoxProps) => {
	const numberOfLines = props.multiline ? 0 : 1;
	const labelStyle = props.labelStyle;
	const rootStyle = [ROOT, props.style];
	const { feeIncludedStore } = useStores();
	const onPress = () => {
		feeIncludedStore.toggle();
	};

	return (
		<TouchableOpacity activeOpacity={1} style={rootStyle}>
			<Checkbox.Android
				status={feeIncludedStore.feeIncluded ? "checked" : "unchecked"}
				color={props.color}
				onPress={onPress}
			/>
			<Text
				adjustsFontSizeToFit
				text={props.text}
				numberOfLines={numberOfLines}
				style={labelStyle}
			/>
		</TouchableOpacity>
	);
});
