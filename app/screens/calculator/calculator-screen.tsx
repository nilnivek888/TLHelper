import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, SafeAreaView, TextStyle, ViewStyle, FlatList } from "react-native"
import { Screen, Header } from "../../components"
import { Card } from "../../components/card/card"
import { Product } from "../../models/product/product"
import { NavigatorParamList } from "../../navigators"
import { color, spacing } from "../../theme"

const FULL: ViewStyle = {
  flex: 1,
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}

const HEADER: ViewStyle = {
  paddingBottom: spacing[3] - 1,
  paddingHorizontal: spacing[3],
  paddingTop: spacing[3],
  backgroundColor: color.palette.muave,
}
const HEADER_TITLE: TextStyle = {
  fontSize: 24,
  fontWeight: "bold",
  textAlign: "center",
}
const LIST_CONTAINER: ViewStyle = {
  flex: 0.5,
  margin: 2,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[0],
}
const FOOTER: ViewStyle = { height: "20%", backgroundColor: color.transparent }
const FOOTER_CONTENT: ViewStyle = {
  margin: 5,
  height: "50%",
  backgroundColor: color.palette.roseDarker,
}
const TAB_BAR: ViewStyle = {
  height: "50%",
}

const products: Product[] = [
  { id: 1, name: "1", price: 20, image: null },
  { id: 2, name: "2", price: 20, image: null },
  { id: 3, name: "3", price: 30, image: null },
  { id: 4, name: "4", price: 40, image: null },
  { id: 5, name: "5", price: 50, image: null },
  { id: 6, name: "6", price: 60, image: null },
  { id: 7, name: "7", price: 70, image: null },
]

export const CalculatorScreen: FC<StackScreenProps<NavigatorParamList, "calculator">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.navigate("welcome")

    return (
      <View testID="CalculatorScreen" style={FULL}>
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.palette.rose}>
          <Header
            headerTx="calculatorScreen.calculator"
            style={HEADER}
            titleStyle={HEADER_TITLE}
            leftIcon="back"
            onLeftPress={goBack}
          />
          <FlatList
            contentContainerStyle={FLAT_LIST}
            data={[...products]}
            keyExtractor={(item) => String(item.id)}
            numColumns={2}
            horizontal={false}
            renderItem={({ item }) => (
              <View style={LIST_CONTAINER}>
                <Card text={String(item.name)}></Card>
              </View>
            )}
          ></FlatList>
        </Screen>
        <SafeAreaView style={FOOTER}>
          <View style={FOOTER_CONTENT}></View>
          <View style={TAB_BAR}></View>
        </SafeAreaView>
      </View>
    )
  },
)
