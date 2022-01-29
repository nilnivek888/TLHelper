/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */

import * as React from "react";
import { View, ViewStyle } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { StoryScreen, Story, UseCase } from "../../../storybook/views";
import { CheckBox } from "./checkbox";
import { Toggle } from "react-powerplug";
import { color } from "../../theme";
import { Checkbox } from "react-native-paper";

declare let module;

const arrayStyle: ViewStyle[] = [
	{ paddingVertical: 40 },
	{ alignSelf: "flex-end" },
];
const arrayOutlineStyle: ViewStyle[] = [
	{ borderColor: "#b443c9" },
	{ borderWidth: 25 },
];
const arrayFillStyle: ViewStyle[] = [{ backgroundColor: "#55e0ff" }];

storiesOf("CheckBox", module)
	.addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
	.add("Behavior", () => (
		<Story>
			<UseCase
				text="The CheckBox"
				usage="Use the checkbox to represent on/off states."
			>
				<Toggle initial={false}>
					{({ on, toggle }) => (
						<CheckBox
							value={on}
							onToggle={toggle}
							text="Toggle me"
						/>
					)}
				</Toggle>
			</UseCase>
			<UseCase text="value = true" usage="This is permanently on.">
				<CheckBox value={true} text="Always on" />
			</UseCase>
			<UseCase text="value = false" usage="This is permanantly off.">
				<CheckBox value={false} text="Always off" />
			</UseCase>
		</Story>
	))
	.add("Styling", () => (
		<Story>
			<UseCase
				text="multiline = true"
				usage="For really really long text"
			>
				<Toggle initial={false}>
					{({ on, toggle }) => (
						<View>
							<CheckBox
								text="We’re an App Design & Development Team. Experts in mobile & web technologies. We create beautiful, functional mobile apps and websites."
								value={on}
								multiline
								onToggle={toggle}
							/>
						</View>
					)}
				</Toggle>
			</UseCase>
			<UseCase text=".style" usage="Override the container style">
				<Toggle initial={false}>
					{({ on, toggle }) => (
						<View>
							<CheckBox
								text="Hello there!"
								value={on}
								style={{
									backgroundColor: "purple",
									marginLeft: 40,
									paddingVertical: 30,
									paddingLeft: 60,
								}}
								onToggle={toggle}
							/>
						</View>
					)}
				</Toggle>
			</UseCase>
			<UseCase text=".outlineStyle" usage="Override the outline style">
				<Toggle initial={false}>
					{({ on, toggle }) => (
						<View>
							<CheckBox
								text="Outline is the box frame"
								value={on}
								color={color.primary}
								onToggle={toggle}
							/>
						</View>
					)}
				</Toggle>
			</UseCase>
			<UseCase text=".fillStyle" usage="Override the fill style">
				<Toggle initial={false}>
					{({ on, toggle }) => (
						<View>
							<CheckBox
								text="Fill er up"
								value={on}
								fillStyle={{
									backgroundColor: "red",
									borderRadius: 8,
								}}
								onToggle={toggle}
							/>
						</View>
					)}
				</Toggle>
			</UseCase>

			<UseCase text="Array style" usage="Use array styles">
				<Toggle initial={false}>
					{({ on, toggle }) => (
						<View>
							<CheckBox
								text="Check it twice"
								value={on}
								onToggle={toggle}
								style={arrayStyle}
								color={color.primary}
								fillStyle={arrayFillStyle}
							/>
						</View>
					)}
				</Toggle>
			</UseCase>
			<UseCase
				text="Paper style"
				usage="Imported from react-native-paper"
			>
				<View
					style={{
						height: 100,
						width: "100%",
					}}
				>
					<Checkbox
						color={color.palette.blackBean}
						status={"checked"}
					/>
				</View>
			</UseCase>
		</Story>
	));
