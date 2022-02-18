import { ViewStyle, TextStyle } from "react-native";
import { color, spacing } from "../../theme";

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
	paddingVertical: spacing[2],
	paddingHorizontal: spacing[2],
	borderRadius: 4,
	justifyContent: "center",
	alignItems: "center",
};

const BASE_TEXT: TextStyle = {
	paddingHorizontal: spacing[3],
};

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets: Record<string, ViewStyle> = {
	/**
	 * A smaller piece of secondard information.
	 */
	primary: { ...BASE_VIEW, backgroundColor: color.transparent } as ViewStyle,

	/**
	 * A button without extras.
	 */
	link: {
		...BASE_VIEW,
		paddingHorizontal: 0,
		paddingVertical: 0,
		alignItems: "flex-start",
	} as ViewStyle,

	card: {
		borderRadius: 4,
		justifyContent: "center",
		width: "25%",
	} as ViewStyle,

	card_Vertical: {
		borderRadius: 4,
		height: "25%",
	} as ViewStyle,
};

export const textPresets: Record<ButtonPresetNames, TextStyle> = {
	primary: {
		...BASE_TEXT,
		fontSize: 64,
		color: color.lightText,
	} as TextStyle,
	link: {
		...BASE_TEXT,
		color: color.lightText,
		paddingHorizontal: 0,
		paddingVertical: 0,
	} as TextStyle,
	card: {
		fontSize: 54,
		textAlignVertical: "center",
		alignSelf: "center",
		position: "absolute",
	} as TextStyle,
};

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets;
