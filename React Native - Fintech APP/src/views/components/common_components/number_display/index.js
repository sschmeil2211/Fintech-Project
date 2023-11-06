import React from "react";
import { Text, View } from "react-native";
 
import styles from "./styles";
import { useUserProvider } from "../../../../view_models/providers/UserProvider";

const NumberDisplay = ({
    amount,
    backgroundColor,
    color,
    fontSize
}) => {

    const { translateNumber } = useUserProvider();
    const { integerNumber, decimalNumber } = translateNumber(amount);

    const decimalFontSize = fontSize * 0.70;
    const decimalColor = `${color}60`;

    const containerStyle = { ...styles.container, backgroundColor };
    const integerTextStyle = { ...styles.amount, color, fontSize };
    const decimalTextStyle = { ...styles.amount, color: decimalColor, fontSize: decimalFontSize, paddingTop: 2 };

    return (
        <View style={containerStyle}>
            <Text style={integerTextStyle}>$ {integerNumber}</Text>
            <Text style={decimalTextStyle}>,{decimalNumber}</Text>
        </View>
    );
};

export default NumberDisplay;