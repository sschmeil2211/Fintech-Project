import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./styles";

const NumericKeyboard = ({ 
    numbers, 
    onPressNumber,
    maxWidth,
    numberWidth,
    numberHeight,
    borderRadius,
    justifyContent,
}) => {

    const numberContainerStyle = {...styles.numberContainer, maxWidth, justifyContent};
    const numberStyle = {...styles.number, width: numberWidth, height: numberHeight, borderRadius}; 

    return (
        <View style={styles.keyboardContainer}>
            <View style={numberContainerStyle}>
                {numbers.map((num) => (
                    <TouchableOpacity style={numberStyle} key={num} onPress={() => onPressNumber(num)}>
                        <Text style={styles.numberText}>{num}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default NumericKeyboard;