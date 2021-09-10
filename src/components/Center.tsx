import React from "react";
import { View } from "react-native";

interface CenterProps {}

const Center: React.FC<CenterProps> = ({children}) => {
    return (
        <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
            {children}
        </View>
    )
}


export default Center