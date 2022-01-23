import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import { StoryScreen, Story, UseCase } from "../../../storybook/views";
import { Icon } from "./icon";

declare let module;

storiesOf("Icon", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Names", () => (
    <Story>
      <UseCase text="back" usage="The icon for going back">
        <Icon icon="back" />
      </UseCase>
      <UseCase text="bullet" usage="The icon for a bullet point">
        <Icon icon="bullet" />
      </UseCase>
      <UseCase text="home" usage="The icon for home page">
        <Icon icon="home" style={{ height: 32, width: 32 }} />
      </UseCase>
      <UseCase text="calculator" usage="The icon for calculator">
        <Icon icon="calculator" style={{ height: 32, width: 32 }} />
      </UseCase>
      <UseCase text="graph" usage="The icon for graph">
        <Icon icon="graph" style={{ height: 32, width: 32 }} />
      </UseCase>
      <UseCase text="settings" usage="The icon for settings">
        <Icon icon="settings" style={{ height: 32, width: 32 }} />
      </UseCase>
    </Story>
  ));
