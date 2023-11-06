import React from "react";
import { Text, TouchableOpacity } from "react-native";

import styles from "./styles";

const FullWidthButton = ({
    label,
    onPress, 
    disabled,
    backgroundColor
}) => {

    const buttonStyle = {...styles.button, backgroundColor: disabled ? "#494755" : backgroundColor}

    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={buttonStyle}
        >
            <Text style={styles.buttonLabel}>{label}</Text>
        </TouchableOpacity>
    );
};

export default FullWidthButton;