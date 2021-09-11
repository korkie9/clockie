import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Center from "./Center";
import { TouchableWithoutFeedback } from "react-native";

interface ClockButtonProps {
  color: string;
  time: number;
  buttonNumber: number;
  onClick: (btnNumber: number) => void;
}

const ClockButton: React.FC<ClockButtonProps> = ({ color, time, buttonNumber, onClick }) => {
  const [hours, setHours] = useState<number>()
  const [minutes, setMinutes] = useState<number>()
  const [seconds, setSeconds] = useState<number>()
  useEffect(() => {
    const hrs = Math.floor((time/60)/60)
    const min = Math.floor((time-hrs*60*60)/60)
    const sec = (time-(hrs*60*60))-min*60
    setHours(hrs)
    setMinutes(min)
    setSeconds(sec)
  }, [time])
  return (
      <TouchableWithoutFeedback onPress={()=> onClick(buttonNumber)}>
    <View
      style={{ backgroundColor: color, width: 300, height: "80%", padding: 20 }}
    >
      <Center>
        <Text>{hours}:{minutes}:{seconds}</Text>
      </Center>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default ClockButton;
