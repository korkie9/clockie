import React from "react";
import { View, Text } from "react-native";
import Center from "./Center";
import { TouchableWithoutFeedback } from "react-native";

interface ClockButtonProps {
  color: string;
  time: string;
  buttonNumber: number
  onClick: (btnNumber: number) => void;
}

const ClockButton: React.FC<ClockButtonProps> = ({ color, time, buttonNumber, onClick }) => {
  return (
      <TouchableWithoutFeedback onPress={()=> onClick(buttonNumber)}>
    <View
      style={{ backgroundColor: color, width: 300, height: "80%", padding: 20 }}
    >
      <Center>
        <Text>{time}</Text>
      </Center>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default ClockButton;
