import React, { useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Text } from ".."

type CardProps = { text: string }

const cardFillStyle: ViewStyle = {
  backgroundColor: "#3d1308",
  height: 146,
  width: "50%",
  borderRadius: 9,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
}
const cardTextStyle: TextStyle = {
  fontSize: 54,
  textAlignVertical: "center",
  alignSelf: "center",
  position: "absolute",
  marginLeft: -15,
}
const counterFillStyle: ViewStyle[] = [
  {
    backgroundColor: "#945f78",
    height: "40%",
    width: "90%",
    borderRadius: 9,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
]

const counterTextStyle: TextStyle[] = [
  {
    fontSize: 44,
    textAlignVertical: "center",
    alignSelf: "center",
    position: "absolute",
    flex: 1,
  },
]

const flexWrapStyle: ViewStyle = {
  borderRadius: 4,
  flex: 2,
  flexGrow: 2,
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
}

/**
 *  A component consisting of 3 buttons and 2 short texts (less than 10 characters)
 *  This component will hold Item ID, Item count, plus button, minus button, item button
 */
export function Card(props: CardProps) {
  const [count, setCount] = useState(1)
  return (
    <View style={cardFillStyle}>
      <View style={{ width: "100%", height: "55%" }}>
        <Text style={cardTextStyle}> {props.text}</Text>
      </View>

      <View style={counterFillStyle}>
        <Button tx="calculatorScreen.minus" />
        <View style={flexWrapStyle}>
          <Text style={counterTextStyle}> {count}</Text>
        </View>
        <Button tx="calculatorScreen.plus" />
      </View>
    </View>
  )
}
