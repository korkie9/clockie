import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Image
} from "react-native";
import { View } from "react-native";
import Center from "../components/Center";
import { ParamList } from "../ParamList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export interface HomeProps {
  navigation: StackNavigationProp<ParamList, "Home">;
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  
  return (
    <Center>
      <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
      <Text style={{ fontSize: 40, margin: 30, textAlign: "center"}}>Clockie</Text>
      <Image source={require("../assets/clockieLogo.png")} style={{width: 50, height: 50, borderRadius: 150}} />
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("FischerClock", { time: 60, increment: 0 });
        }}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            Bullet{" "}
            <MaterialCommunityIcons name="bullet" size={24} color="black" />1 +
            0
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("FischerClock", { time: 120, increment: 1 });
        }}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            Bullet{" "}
            <MaterialCommunityIcons name="bullet" size={24} color="black" /> 2 +
            1
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("FischerClock", { time: 180, increment: 0 });
        }}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            Blitz{" "}
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={24}
              color="black"
            />
            3 + 0
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("FischerClock", { time: 180, increment: 2 });
        }}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            Blitz{" "}
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={24}
              color="black"
            />
            3 + 2
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("FischerClock", { time: 300, increment: 0 });
        }}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            Blitz{" "}
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={24}
              color="black"
            />
            5 + 0
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("FischerClock", { time: 600, increment: 0 });
        }}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            Rapid <Ionicons name="timer-outline" size={24} color="black" /> 10 +
            0
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("Settings");
        }}
      >
        <View style={styles.customButton}>
          <Text style={styles.buttonText}>Custom</Text>
        </View>
      </TouchableWithoutFeedback>
    </Center>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 30,
    width: 150,
    alignItems: "center",
    backgroundColor: "darkcyan",
    margin: 5,
    borderRadius: 5,
  },
  customButton: {
    marginBottom: 30,
    width: 150,
    alignItems: "center",
    backgroundColor: "black",
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    padding: 10,
    color: "white",
    fontSize: 17,
  },
});
