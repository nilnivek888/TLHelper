/* eslint-disable */
import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { Card } from "./card"

declare let module


storiesOf("AutoImage", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="2 column row" usage="Display 2 products">
          <Card></Card>
      </UseCase>
    </Story>
  ))
