import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import FAIcons5 from 'react-native-vector-icons/FontAwesome5';

import styles from "./styles";

const SquareButton = ({
    iconName,
    iconColor,
    backgroundColor,
    text,
    textColor,
    onPress
}) => {

    const containerStyle = { ...styles.container, backgroundColor };
    const textStyle = { ...styles.text, color: textColor };

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={containerStyle}>
                <FAIcons5 name={iconName} size={28} color={iconColor} />
                <Text style={textStyle}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default SquareButton;