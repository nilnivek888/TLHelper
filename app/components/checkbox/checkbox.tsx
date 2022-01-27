import * as React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { Text } from "../text/text";
import { color, spacing } from "../../theme";
import { CheckBoxProps } from "./checkbox.props";
import { Checkbox } from "react-native-paper";

const ROOT: ViewStyle = {
	flexDirection: "row",
	paddingVertical: spacing[1],
	alignSelf: "flex-start",
};

const DIMENSIONS = { width: 30, height: 30 };

const OUTLINE: ViewStyle = {
	...DIMENSIONS,
	marginTop: 2, // finicky and will depend on font/line-height/baseline/weather
	justifyContent: "center",
	alignItems: "center",
	alignSelf: "center",
	borderWidth: 3,
	borderColor: color.text,
	borderRadius: 1,
	marginHorizontal: 15,
};

const FILL: ViewStyle = {
	width: DIMENSIONS.width - 4,
	height: DIMENSIONS.height - 4,
	backgroundColor: color.primary,
};

export function CheckBox(props: CheckBoxProps) {
	const numberOfLines = props.multiline ? 0 : 1;
	const labelStyle = props.labelStyle;
	const rootStyle = [ROOT, props.style];
	const color = props.color;
	const fillStyle = [FILL, props.fillStyle];

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
			<Checkbox
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
