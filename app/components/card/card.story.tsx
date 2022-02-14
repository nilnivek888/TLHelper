/* eslint-disable */
import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { StoryScreen, Story, UseCase } from "../../../storybook/views";
import { Card } from "./card";

declare let module;

storiesOf("Card", module)
	.addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
	.add("Style Presets", () => <Story></Story>);
