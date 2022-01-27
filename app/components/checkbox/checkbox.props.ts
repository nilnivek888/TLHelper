import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { TxKeyPath } from "../../i18n";

export interface CheckBoxProps {
	/**
	 * Additional container style. Useful for margins.
	 */
	style?: StyleProp<ViewStyle>;

	/**
	 * color for checkbox fill.
	 */
	color?: string;

	/**
	 * Additional fill style. Only visible when checked.
	 */
	fillStyle?: StyleProp<ViewStyle>;

	/**
	 * Additional fill style. Only visible when checked.
	 */
	labelStyle?: StyleProp<TextStyle>;

	/**
	 * Is the checkbox checked?
	 */
	value?: boolean;

	/**
	 * The text to display if there isn't a tx.
	 */
	text?: string;

	/**
	 * The i18n lookup key.
	 */
	tx?: TxKeyPath;

	/**
	 * Multiline or clipped single line?
	 */
	multiline?: boolean;

	/**
	 * Fires when the user tabs to change the value.
	 */
	onToggle?: (newValue: boolean) => void;
}
