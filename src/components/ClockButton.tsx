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
  const displayMinutes = (): string | null => {
    const min = `${minutes < 10 ? `0${minutes}` : minutes} : `;
    return hours < 1 && minutes < 1 ? null : min;
  };
  const displaySeconds = (): string | null => {
    const sec = seconds < 10 ? `0${seconds}` : seconds;
    return hours < 1 && minutes < 1 ? `${seconds}` : `${sec}`;
  };
  return (
    <TouchableWithoutFeedback onPress={() => onClick(buttonNumber)}>
      <View
        style={{
          backgroundColor: color,
          width: 300,
          height: "80%",
          padding: 20,
          borderRadius: 5
        }}
      >
        <Center>
          <Text style={{fontSize: 40}}>
            {hours > 0 && `${hours < 10 ? `0${hours}` : hours} : `}
            {displayMinutes()}
            {displaySeconds()}
          </Text>
        </Center>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ClockButton;
