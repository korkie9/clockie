import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import Center from "../components/Center";
import Clock from "../components/Clock";
import { ParamList } from "../ParamList";
import { Text } from "react-native";

interface BronsteinClockProps {
  navigation: StackNavigationProp<ParamList, "BronsteinClock">;
  route: any;
}

const BronsteinClock: React.FC<BronsteinClockProps> = ({
  navigation,
  route,
}) => {
  const [player1Time, setPlayer1Time] = useState<number>(route.params.time);
  const [player2Time, setPlayer2Time] = useState<number>(route.params.time);
  const [increment, setIncrement] = useState<number>(0);
  const [playerTurn, setPlayerTurn] = useState<number>();
  ////////////////////////
  useEffect(() => {
    const interval: NodeJS.Timer = setTimeout(deductTime, 1000);
    //setIntervalId(interval)
    return () => clearTimeout(interval);
  }, [playerTurn, player1Time, player2Time, increment]);
  /////////////////////
  const handleButtonClick = (buttonNumber: number): void => {
    if (player1Time <= 0 || player2Time <= 0) return;
    const playerWhosTimeMustRun = buttonNumber === 1 ? 2 : 1;
    if (buttonNumber === 1)
      setPlayer1Time((player1Time) => player1Time + increment);
    if (buttonNumber === 2)
      setPlayer2Time((player2Time) => player2Time + increment);
    setIncrement((time) => 0);
    return setPlayerTurn((turn) => playerWhosTimeMustRun);
  };
  const handlePause = (): void => {
    setPlayerTurn(0);
  };
  const handleReset = (): void => {
    setPlayerTurn(0);
    setPlayer1Time((time) => route.params.time);
    setPlayer2Time((time) => route.params.time);
  };
  const deductTime = (): void => {
    if (!playerTurn || playerTurn === 0) return;
    if (player1Time <= 0 || player2Time <= 0) return;
    if (increment < route.params.increment)
      setIncrement((increment) => increment + 1);
    if (playerTurn === 1)
      return setPlayer1Time((player1Time) => player1Time - 1);
    return setPlayer2Time((player2Time) => player2Time - 1);
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

export default BronsteinClock;
