import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import ClockButton from "../components/ClockButton";
import Center from "../components/Center";
import { TouchableWithoutFeedback } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";

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
  const [color1, setColor1] = useState<string>("cyan");
  const [color2, setColor2] = useState<string>("cyan");
  const [paused, setPaused] = useState<boolean>(false);
  const [sound, setSound] = useState<any>();
  //const [stopped, setStopped] = useState<boolean>(false);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);
  const handleButtonClick = (buttonNumber: number): void => {
    if(timer1 < 1 || timer2 < 1) return
    if (buttonNumber === 1) {
      setColor2("darkcyan");
      setColor1("cyan");
    }
    if (buttonNumber === 2) {
      setColor1("darkcyan");
      setColor2("cyan");
    }
    playClick()
    onButtonClick(buttonNumber);
  };
  const reset = () => {
    setColor1("cyan");
    setColor2("cyan");
    onReset();
  };
  const handlePause = (): void => {
    setColor1("cyan");
    setColor2("cyan");
    pause();
  };
  const playClick = async (): Promise<void> => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/click-1.m4a")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  };
  return (
    <Center>
      <View
        style={{
          flex: 1,
          transform: [
            {
              rotate: "-180deg",
            },
          ],
        }}
      >
        <Center>
          <ClockButton
            onClick={handleButtonClick}
            time={timer1}
            color={timer1 > 0 && timer2 > 0 ? color1 : "red"}
            buttonNumber={1}
          />
        </Center>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableWithoutFeedback onPress={() => back()}>
          <Text
            style={{ flex: 1, justifyContent: "center", textAlign: "center" }}
          >
            <Ionicons name="arrow-back" size={29} color="black" />
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => handlePause()}>
          <Text
            style={{ flex: 1, justifyContent: "center", textAlign: "center" }}
          >
            <FontAwesome name="pause" size={29} color="black" />
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => reset()}>
          <Text
            style={{ flex: 1, justifyContent: "center", textAlign: "center" }}
          >
            <MaterialIcons name="restore" size={29} color="black" />
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flex: 1 }}>
        <Center>
          <ClockButton
            onClick={handleButtonClick}
            time={timer2}
            color={timer1 > 0 && timer2 > 0 ? color2 : "red"}
            buttonNumber={2}
          />
        </Center>
      </View>
    </Center>
  );
};

export default Clock;
