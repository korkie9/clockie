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

const BronsteinClock: React.FC<BronsteinClockProps> = ({ navigation, route }) => {
  const [player1Time, setPlayer1Time] = useState<number>(route.params.time);
  const [player2Time, setPlayer2Time] = useState<number>(route.params.time);
  const [delayTime, setDelayTime] = useState<number>(route.params.delay);
  const [playerTurn, setPlayerTurn] = useState<number>();
 // const [intervalId, setIntervalId] = useState<any>();
 const [refresh, setRefresh] = useState<boolean>(true);
  const [delayPhase, setDelayPhase] = useState<boolean>(true);
  ////////////////////////
  useEffect(() => {
    const interval: NodeJS.Timer = setTimeout(deductTime, 1000);
    //setIntervalId(interval)
    return () => clearTimeout(interval)
  }, [, playerTurn, player1Time, player2Time, delayTime, delayPhase]);
  /////////////////////
  const handleButtonClick = (buttonNumber: number): void => {
    if (player1Time <= 0 || player2Time <= 0) return;
    const playerWhosTimeMustRun = buttonNumber === 1 ? 2 : 1;
    setDelayPhase(true)
    setPlayerTurn((turn) => playerWhosTimeMustRun);
    return;
  };
  const handlePause = (): void => {
    setPlayerTurn(0)
    console.log("paused");
  };
  const handleReset = (): void => {
    setPlayerTurn(0);
    setPlayer1Time((time) => route.params.time);
    setPlayer2Time((time) => route.params.time);
    console.log("reset");
  };
  const deductTime = (): void => {
    if(delayPhase){
      setDelayTime(time => time -1)
      if(delayTime < 1) {
        if (playerTurn === 1) setPlayer1Time((player1Time) => player1Time + (route.params.delayTime - delayTime));
        if (playerTurn === 2)setPlayer2Time((player2Time) => player2Time + 1);
        setDelayPhase(phase => false)
      } 
      return
    }
    if (!playerTurn || playerTurn === 0) return;
    if (player1Time <= 0 || player2Time <= 0) return console.log("no more time")
    if (playerTurn === 1) return setPlayer1Time((player1Time) => player1Time - 1);
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