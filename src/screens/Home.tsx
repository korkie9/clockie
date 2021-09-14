import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button } from "react-native";
import { View } from "react-native";
import Center from "../components/Center";
import { ParamList } from "../ParamList";

export interface HomeProps {
  navigation: StackNavigationProp<ParamList, "Home">;
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  return (
    <Center>
      <Button
        title="HourGlass"
        onPress={() => {
          
        }}
      />
      <View></View>
    </Center>
  );
};
