import React, { useState } from "react";
import { View, Text } from "react-native";
import ClockButton from "../components/ClockButton";
import Center from "../components/Center";
import { TouchableWithoutFeedback } from "react-native";

interface ClockProps {
  timer1: number;
  timer2: number;
  onButtonClick: (buttonNumber: number) => void;
  pause: () => void;
  back: () => void;
  onReset: () => void;
}

const Clock: React.FC<ClockProps> = ({
  timer1,
  timer2,
  onButtonClick,
  pause,
  back,
  onReset,
}) => {
  const [color1, setColor1] = useState<string>("#f59090");
  const [color2, setColor2] = useState<string>("#f59090");
  const handleButtonClick = (buttonNumber: number): void => {
    if (buttonNumber === 1) {
      setColor2("#ff1100");
      setColor1("#f59090");
    }
    if (buttonNumber === 2) {
      setColor1("#ff1100");
      setColor2("#f59090");
    }
    onButtonClick(buttonNumber);
  };
  const reset = () => {
    setColor1("#f59090");
    setColor2("#f59090");
    onReset()
  }
  return (
    <Center>
      <Center>
        <ClockButton
          onClick={handleButtonClick}
          time={timer1}
          color={color1}
          buttonNumber={1}
        />
      </Center>
      <View style={{ flexDirection: "row" }}>
        <TouchableWithoutFeedback onPress={() => back()}>
          <Text style={{ margin: 5 }}>Back</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => pause()}>
          <Text style={{ margin: 5 }}>Pause</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => reset()}>
          <Text style={{ margin: 5 }}>Reset</Text>
        </TouchableWithoutFeedback>
        
      </View>
      <Center>
        <ClockButton
          onClick={handleButtonClick}
          time={timer2}
          color={color2}
          buttonNumber={2}
        />
      </Center>
    </Center>
  );
};

export default Clock;
