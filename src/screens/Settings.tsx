import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useState } from "react";
import { Picker } from "@react-native-community/picker";
import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { View } from "react-native";

import { ParamList } from "../ParamList";
import NumericInput from "react-native-numeric-input";

export interface SettingsProps {
  navigation: StackNavigationProp<ParamList, "Settings">;
}

export const Settings: React.FC<SettingsProps> = ({ navigation }) => {
  const [timeFormat, setTimeFormat] = useState<any>("Fischer");

  const handleSubmit = (
    hours: number,
    minutes: number,
    seconds: number,
    secondaryMinutes: number | null | undefined,
    secondarySeconds: number | null | undefined
  ): void => {
    if (hours > 24) {
      Alert.alert("Hours must be 24 or less");
      return;
    }
    if (minutes > 59) {
      Alert.alert("Minutes must be less than 60");
      return;
    }
    if (seconds > 59) {
      Alert.alert("Seconds must be less than 60");
      return;
    }
    const fulltime = (hours*60*60) + (minutes*60) + seconds
    const secondarySec = secondarySeconds ? secondarySeconds : 0
    const secondaryMin = secondarySeconds ? secondarySeconds : 0
    const secondaryTime = secondarySec + (secondaryMin*60)
    console.log(fulltime)
    if(timeFormat === "Fischer") navigation.navigate("FischerClock", {time: fulltime, increment: secondaryTime})
    if(timeFormat === "Bronstein") navigation.navigate("BronsteinClock")
    if(timeFormat === "Hourglass") navigation.navigate("HourglassClock")
    if(timeFormat === "Delay") navigation.navigate("DelayClock")
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Picker
        selectedValue={timeFormat}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setTimeFormat(itemValue)}
      >
        <Picker.Item label="Fischer" value="Fischer" />
        <Picker.Item label="Bronstein" value="Bronstein" />
        <Picker.Item label="Delay" value="Delay" />
        <Picker.Item label="Hourglass" value="Hourglass" />
      </Picker>
      <Fischer type={timeFormat} onSubmit={handleSubmit} />
    </View>
  );
};

export interface TimerProps {
  type: string;
  onSubmit: (
    hours: number,
    minutes: number,
    seconds: number,
    secondaryMinutes: number | null | undefined,
    secondarySeconds: number | null | undefined
  ) => void;
}
const Fischer: React.FC<TimerProps> = ({ type, onSubmit }) => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [secondaryMinutes, setSecondaryMinutes] = useState<number>(0);
  const [secondarySeconds, setSecondarySeconds] = useState<number>(0);
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", margin: 50 }}
    >
      <Text style={{ fontSize: 40 }}>Time</Text>
      <View style={{ flexDirection: "row", margin: 50 }}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>hrs</Text>
          <NumericInput
            onChange={(value) => setHours(value)}
            minValue={0}
            maxValue={24}
            type="up-down"
            totalWidth={90}
          />
        </View>
        <Text
          style={{
            fontSize: 43,
          }}
        >
          {" "}
          :{" "}
        </Text>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>min</Text>
          <NumericInput
            onChange={(value) => setMinutes(value)}
            minValue={0}
            maxValue={59}
            type="up-down"
            totalWidth={90}
          />
        </View>
        <Text
          style={{
            fontSize: 43,
          }}
        >
          {" "}
          :{" "}
        </Text>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>sec</Text>
          <NumericInput
            onChange={(value) => setSeconds(value)}
            minValue={0}
            maxValue={59}
            type="up-down"
            totalWidth={90}
          />
        </View>
      </View>
      {type === "Fischer" && <Text>Increment</Text>}
      {type === "Bronstein" && <Text>Delay</Text>}
      {type === "Delay" && <Text>Delay</Text>}
      {type !== "Hourglass" && (

        //Secondary Section ///////////////////////////////
        <View style={{ flexDirection: "row", margin: 50 }}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>min</Text>
            <NumericInput
              onChange={(value) => setSecondaryMinutes(value)}
              minValue={0}
              maxValue={59}
              type="up-down"
              totalWidth={90}
            />
          </View>
          <Text
            style={{
              fontSize: 43,
            }}
          >
            {" "}
            :{" "}
          </Text>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>sec</Text>
            <NumericInput
              onChange={(value) => setSecondarySeconds(value)}
              minValue={0}
              maxValue={59}
              type="up-down"
              totalWidth={90}
            />
          </View>
        </View>

        //End of Secondary Section ///////////////////////////////
      )}
      <TouchableWithoutFeedback
        onPress={() => {
          onSubmit(hours, minutes, seconds, secondaryMinutes, secondarySeconds);
        }}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Start</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 30,
    width: 150,
    alignItems: "center",
    backgroundColor: "darkcyan",
    margin: 50,
  },
  buttonText: {
    textAlign: "center",
    padding: 20,
    color: "white",
    fontSize: 20,
  },
});
