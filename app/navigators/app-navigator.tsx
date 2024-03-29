/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React, { useEffect } from "react";
import { Alert, SafeAreaView, useColorScheme } from "react-native";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import { CalculatorScreen } from "../screens";
import { navigationRef, useBackButtonHandler } from "./navigation-utilities";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { color, shadowup } from "../theme";
import { Icon } from "../components/icon/icon";
import { GiftScreen } from "../screens/gift/gift-screen";
import { ExportScreen } from "../screens/export/export-screen";
import { useStores } from "../models";

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
	welcome: undefined;
	demo: undefined;
	demoList: undefined;
	calculator: undefined;
	gift: undefined;
	export: undefined;
};

const Tab = createBottomTabNavigator<NavigatorParamList>();

interface NavigationProps
	extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
	const colorScheme = useColorScheme();
	const { giftStore } = useStores();
	useEffect(() => {
		async function fetchData() {
			await giftStore.getGifts();
		}
		fetchData();
	}, []);
	useBackButtonHandler(canExit);
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: color.primary }}>
			<NavigationContainer
				ref={navigationRef}
				theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
				{...props}
			>
				<Tab.Navigator
					initialRouteName="calculator"
					screenOptions={{
						tabBarStyle: {
							backgroundColor: color.primary,
							...shadowup,
							elevation: 10,
							zIndex: 10,
							paddingBottom: 0,
							height: "7%",
						},
						tabBarShowLabel: false,
						headerShown: false,
					}}
				>
					<Tab.Screen
						name="calculator"
						component={CalculatorScreen}
						options={{
							tabBarIcon: ({ focused }) => (
								<Icon
									icon="calculator"
									style={{
										tintColor: color.primaryDarker,
										opacity: focused ? 1 : 0.5,
										height: "60%",
										width: "60%",
									}}
									containerStyle={{
										height: "100%",
										width: "100%",
										alignItems: "center",
										justifyContent: "center",
									}}
								/>
							),
						}}
					/>
					<Tab.Screen
						name="gift"
						component={GiftScreen}
						options={{
							tabBarIcon: ({ focused }) => (
								<Icon
									icon="gift"
									style={{
										tintColor: color.primaryDarker,
										opacity: focused ? 1 : 0.5,
										height: "60%",
										width: "60%",
									}}
									containerStyle={{
										height: "100%",
										width: "100%",
										alignItems: "center",
										justifyContent: "center",
									}}
								/>
							),
						}}
						listeners={{
							tabPress: e => {
								if (!giftStore.hasPromotion) {
									// Prevent default action
									e.preventDefault();
									Alert.alert("❗️", "非活動期間，無贈品", [
										{
											text: "返回",
											style: "cancel",
										},
									]);
								}
							},
						}}
					/>
					<Tab.Screen
						name="export"
						component={ExportScreen}
						options={{
							tabBarIcon: ({ focused }) => (
								<Icon
									icon="sheet"
									style={{
										tintColor: color.primaryDarker,
										opacity: focused ? 1 : 0.5,
										height: "60%",
										width: "60%",
									}}
									containerStyle={{
										height: "100%",
										width: "100%",
										alignItems: "center",
										justifyContent: "center",
									}}
								/>
							),
						}}
						listeners={{
							tabPress: e => {
								if (!giftStore.hasPromotion) {
									// Prevent default action
									e.preventDefault();
									Alert.alert("❗️", "非活動期間，無贈品", [
										{
											text: "返回",
											style: "cancel",
										},
									]);
								}
							},
						}}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
};

AppNavigator.displayName = "AppNavigator";

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["calculator"];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
