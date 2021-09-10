import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button } from "react-native";
import { View } from "react-native";
import Center from "../components/Center";
import { ParamList } from "../ParamList";

export interface FischerProps {
  navigation: StackNavigationProp<ParamList, "Home">;
}

export const Fischer: React.FC<FischerProps> = ({ navigation }) => {
  return (
    <Center>
      <Button
        title="HourGlass"
        onPress={() => {
          navigation.navigate("HourglassClock");
        }}
      />
      <View></View>
    </Center>
  );
};
