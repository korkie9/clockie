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

const ClockButton: React.FC<ClockButtonProps> = ({
  color,
  time,
  buttonNumber,
  onClick,
}) => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  useEffect(() => {
    const hrs = time >= 0 ? Math.floor(time / 60 / 60) : 0;
    const min = time >= 0 ? Math.floor((time - hrs * 60 * 60) / 60) : 0;
    const sec = time >= 0 ? time - hrs * 60 * 60 - min * 60 : 0;
    setHours(hrs);
    setMinutes(min);
    setSeconds(sec);
  }, [time]);
  return (
    <TouchableWithoutFeedback onPress={() => onClick(buttonNumber)}>
      <View
        style={{
          backgroundColor: color,
          width: 300,
          height: "80%",
          padding: 20,
        }}
      >
        <Center>
          <Text>
            {hours > 0  && `${hours < 10 ? `0${hours}` : hours} : `}
            {`${minutes < 10 ? `0${minutes}` : minutes} : `}
            {seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        </Center>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ClockButton;
