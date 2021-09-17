import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "./screens/Home";
import { ParamList } from "./ParamList";
import { Settings } from "./screens/Settings";
import FischerClock from "./Clocks/FischerClock";
import DelayClock from "./Clocks/DelayClock";
import BronsteinClock from "./Clocks/BronsteinClock";
import HourglassClock from "./Clocks/HourglassClock";
import SingleMoveClock from "./Clocks/SingleMoveClock"

interface RouteProps {}
const Stack = createNativeStackNavigator<ParamList>();

const Routes: React.FC<RouteProps> = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Settings"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="HourglassClock" component={HourglassClock} />
        <Stack.Screen name="FischerClock" component={FischerClock} />
        <Stack.Screen name="DelayClock" component={DelayClock} />
        <Stack.Screen name="BronsteinClock" component={BronsteinClock} />
        <Stack.Screen name="SingleMoveClock" component={SingleMoveClock} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
