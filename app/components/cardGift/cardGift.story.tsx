/* eslint-disable */
import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { StoryScreen, Story, UseCase } from "../../../storybook/views";
import { CardGift } from "./cardGift";
import { GiftModel, Gift } from "../../models/gift/gift";

declare let module;

const gift = GiftModel.create({
	id: "g1",
	name: "2號+9號+12號",
	PVCost: 50000,
	count: 10,
	value: 8820,
}) as Gift;

storiesOf("CardGift", module)
	.addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
	.add("Style Presets", () => (
		<Story>
			<UseCase text="gift item" usage="Display 1 gift option">
				<CardGift gift={gift} />
			</UseCase>
		</Story>
	));
