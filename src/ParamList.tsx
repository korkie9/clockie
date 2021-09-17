export type ParamList = {
    Home: undefined,
    HourglassClock: {time: number},
    FischerClock: {time: number, increment: number},
    BronsteinClock: {time: number, increment: number},
    DelayClock: {time: number, delay: number},
    SingleMoveClock: {time: number},
    Settings: undefined
}