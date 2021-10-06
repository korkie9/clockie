import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import Center from "../components/Center";
import Clock from "../components/Clock";
import { ParamList } from "../ParamList";
import { Text } from "react-native";

interface FischerClockProps {
  navigation: StackNavigationProp<ParamList, "FischerClock">;
  route: any;
}

const FischerClock: React.FC<FischerClockProps> = ({ navigation, route }) => {
  const [player1Time, setPlayer1Time] = useState<number>(route.params.time);
  const [player2Time, setPlayer2Time] = useState<number>(route.params.time);
  const [playerTurn, setPlayerTurn] = useState<number>();
  const [intervalId, setIntervalId] = useState<any>();
  const [refresh, setRefresh] = useState<boolean>(true);
  const [stopped, setStopped] = useState<boolean>(false);
  ////////////////////////
  useEffect(() => {
    if (player1Time <= 0 || player2Time <= 0)
      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    const interval: NodeJS.Timer = setInterval(deductTime, 1000);
    setIntervalId(interval)
    return () => clearInterval(interval)
  }, [playerTurn, refresh, stopped]);
  /////////////////////
  const handleButtonClick = (buttonNumber: number): void => {
    if (player1Time <= 0 || player2Time <= 0) return;
    setStopped(stopped => false)
    const playerWhosTimeMustRun = buttonNumber === 1 ? 2 : 1;
    if (playerWhosTimeMustRun === 1)
      setPlayer1Time((time) => time + route.params.increment);
    if (playerWhosTimeMustRun === 2)
      setPlayer2Time((time) => time + route.params.increment);
    setPlayerTurn((turn) => playerWhosTimeMustRun);
    return;
  };
  const handlePause = (): void => {
    clearInterval(intervalId)
  };
  const handleReset = (): void => {
    clearInterval(intervalId);
    setPlayerTurn(0);
    setPlayer1Time((time) => route.params.time);
    setPlayer2Time((time) => route.params.time);
  };
  const deductTime = (): void => {
    setRefresh((refresh) => !refresh);
    if (!playerTurn) return;
    if (playerTurn === 1) setPlayer1Time((player1Time) => player1Time - 1);
    if (playerTurn === 2) setPlayer2Time((player2Time) => player2Time - 1);
  };
  return (
    <Center>
      <Clock
        timer1={player1Time}
        timer2={player2Time}
        onButtonClick={handleButtonClick}
        pause={handlePause}
        back={() => navigation.goBack()}
        onReset={handleReset}
      />
    </Center>
  );
};

export default FischerClock;
