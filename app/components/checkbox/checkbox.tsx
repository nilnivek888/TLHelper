import * as React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { Text } from "../text/text";
import { spacing } from "../../theme";
import { CheckBoxProps } from "./checkbox.props";
import { Checkbox } from "react-native-paper";

const ROOT: ViewStyle = {
	flexDirection: "row",
	paddingVertical: spacing[1],
	alignSelf: "flex-start",
};

export function CheckBox(props: CheckBoxProps) {
	const numberOfLines = props.multiline ? 0 : 1;
	const labelStyle = props.labelStyle;
	const rootStyle = [ROOT, props.style];

	const onPress = props.onToggle
		? () => props.onToggle && props.onToggle(!props.value)
		: null;

	return (
		<TouchableOpacity
			activeOpacity={1}
			disabled={!props.onToggle}
			onPress={onPress}
			style={rootStyle}
		>
			<Checkbox.Android
				status={props.value ? "checked" : "unchecked"}
				color={props.color}
				onPress={onPress}
			/>
			<Text
				text={props.text}
				numberOfLines={numberOfLines}
				style={labelStyle}
			/>
		</TouchableOpacity>
	);
}
