import React, { useState } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Text } from ".."

type CardProps = { text: string }

const cardFillStyle: ViewStyle = {
  backgroundColor: "#3d1308",
  height: 146,
  flex: 0.5,
  borderRadius: 9,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  margin: 2,
}
const cardTextStyle: TextStyle = {
  fontSize: 54,
  textAlignVertical: "center",
  textAlign: "center",
  alignSelf: "center",
  position: "absolute",
  width: "100%",
  left: 0,
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
    fontSize: 50,
    textAlignVertical: "center",
    textAlign: "center",
    alignSelf: "center",
    position: "absolute",
    flex: 1,
  },
]

const flexWrapStyle: ViewStyle = {
  borderRadius: 4,
  width: "50%",
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
}

/**
 *  A component consisting of 3 buttons and 2 short texts (less than 10 characters)
 *  This component will hold Item ID, Item count, plus button, minus button, item button
 */
export function Card(props: CardProps) {
  const [count, setCount] = useState(10)
  return (
    <View style={cardFillStyle}>
      <View style={{ width: "100%", height: "55%", overflow: "hidden" }}>
        <Text style={cardTextStyle}> {props.text}</Text>
      </View>

      <View style={counterFillStyle}>
        <Button
          tx="calculatorScreen.minus"
          preset="card"
          onPress={() => setCount(count > 0 ? count - 1 : 0)}
        />
        <View style={flexWrapStyle}>
          <Text style={counterTextStyle}> {count}</Text>
        </View>
        <Button tx="calculatorScreen.plus" preset="card" onPress={() => setCount(count + 1)} />
      </View>
    </View>
  )
}
