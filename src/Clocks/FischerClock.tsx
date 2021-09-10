import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import Center from "../components/Center";
import Clock from "../components/Clock";
import { ParamList } from "../ParamList";
import { Text } from 'react-native'

interface FischerClockProps {
  navigation: StackNavigationProp<ParamList, "FischerClock">;
}

const FischerClock: React.FC<FischerClockProps> = ({ navigation }) => {
  const handleButtonClick = (buttonNumber: number): void => {
    console.log(buttonNumber);
    return;
  };
  const handlePause = (): void => {
    console.log("paused");
  };
  const handleReset = (): void => {
    console.log("reset");
  };
  return (
    <Center>
        <Text>Fischer</Text>
      <Clock
        timer1="00:00:00"
        timer2="00:00:00"
        onButtonClick={handleButtonClick}
        pause={handlePause}
        back={() => navigation.goBack()}
        reset={handleReset}
      />
    </Center>
  );
};

export default FischerClock;
