/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react";
import { useColorScheme } from "react-native";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import { WelcomeScreen, CalculatorScreen } from "../screens";
import { navigationRef, useBackButtonHandler } from "./navigation-utilities";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { color, shadowup } from "../theme";
import { Icon } from "../components/icon/icon";

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
};

const Tab = createBottomTabNavigator<NavigatorParamList>();

interface NavigationProps
	extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
	const colorScheme = useColorScheme();
	useBackButtonHandler(canExit);
	return (
		<NavigationContainer
			ref={navigationRef}
			theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
			{...props}
		>
			<Tab.Navigator
				screenOptions={{
					tabBarStyle: {
						backgroundColor: color.palette.rose,
						...shadowup,
					},
					tabBarShowLabel: false,
					headerShown: false,
				}}
			>
				<Tab.Screen
					name="welcome"
					component={WelcomeScreen}
					options={{
						tabBarIcon: ({ focused }) => (
							<Icon
								icon="home"
								style={{
									tintColor: color.palette.blackBean,
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
					name="calculator"
					component={CalculatorScreen}
					options={{
						tabBarIcon: ({ focused }) => (
							<Icon
								icon="calculator"
								style={{
									tintColor: color.palette.blackBean,
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
			</Tab.Navigator>
		</NavigationContainer>
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
