import { NavigationContainer, RouteProp } from "@react-navigation/native";
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
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

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
    const fulltime = hours * 60 * 60 + minutes * 60 + seconds;
    const secondarySec = secondarySeconds ? secondarySeconds : 0;
    const secondaryMin = secondaryMinutes ? secondaryMinutes : 0;
    const secondaryTime = secondarySec + secondaryMin * 60;
    console.log(fulltime);
    if (timeFormat === "Fischer")
      navigation.navigate("FischerClock", {
        time: fulltime,
        increment: secondaryTime,
      });
    if (timeFormat === "Bronstein")
      navigation.navigate("BronsteinClock", {
        time: fulltime,
        increment: secondaryTime,
      });
    if (timeFormat === "Hourglass")
      navigation.navigate("HourglassClock", { time: fulltime });
    if (timeFormat === "Delay")
      navigation.navigate("DelayClock", {
        time: fulltime,
        delay: secondaryTime,
      });
    if (timeFormat === "SingleMove")
      navigation.navigate("SingleMoveClock", { time: fulltime });
  };
  const handleBack = (): void => {
    navigation.goBack();
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1}}>
      <Picker
        selectedValue={timeFormat}
        style={{ height: 50, width: 150, fontSize: 20}}
        onValueChange={(itemValue, itemIndex) => setTimeFormat(itemValue)}
      >
        <Picker.Item label="Fischer" value="Fischer" />
        <Picker.Item label="Bronstein" value="Bronstein" />
        <Picker.Item label="Delay" value="Delay" />
        <Picker.Item label="Hourglass" value="Hourglass" />
        <Picker.Item label="Single-Move" value="SingleMove" />
      </Picker>
      <Fischer type={timeFormat} onSubmit={handleSubmit} onBack={handleBack} />
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
  onBack: () => void;
}
const Fischer: React.FC<TimerProps> = ({ type, onSubmit, onBack }) => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [secondaryMinutes, setSecondaryMinutes] = useState<number>(0);
  const [secondarySeconds, setSecondarySeconds] = useState<number>(0);

  const handleSubmit = (
    hours: number,
    minutes: number,
    seconds: number,
    secondaryMinutes: number,
    secondarySeconds: number
  ): void => {
    if (hours === 0 && seconds === 0 && minutes === 0)
      return Alert.alert("Minimum time is 1 second");
    onSubmit(hours, minutes, seconds, secondaryMinutes, secondarySeconds);
  };
  const handleBack = (): void => {
    onBack();
  };
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", margin: 50 }}
    >
      <Text style={{ fontSize: 20 }}>Time</Text>
      <View style={{ flexDirection: "row", margin: 40 }}>
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
      {type === "Fischer" && <Text style={{fontSize: 20}}>Increment</Text>}
      {type === "Bronstein" && <Text style={{fontSize: 20}}>Increment</Text>}
      {type === "Delay" && <Text style={{fontSize: 20}}>Delay</Text>}
      {type !== "Hourglass" && type !== "SingleMove" && (
        //Secondary Section ///////////////////////////////
        <View style={{ flexDirection: "row", margin: 40 }}>
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            handleBack();
          }}
          style={{ flex: 1 }}
        >
          <View style={styles.SettingsButton}>
            <Text style={styles.SettingsText}>
              <Ionicons name="arrow-back-outline" size={24} color="white" />
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            handleSubmit(
              hours,
              minutes,
              seconds,
              secondaryMinutes,
              secondarySeconds
            );
          }}
          style={{ flex: 1 }}
        >
          <View style={styles.SettingsButton}>
            <Text style={styles.SettingsText}>
              <FontAwesome name="play" size={24} color="white" />
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
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
  SettingsButton: {
    alignItems: "center",
    backgroundColor: "darkcyan",
    margin: 20,
    padding: 15,
    borderRadius: 10,
    width: 100,
  },
  SettingsText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
});
