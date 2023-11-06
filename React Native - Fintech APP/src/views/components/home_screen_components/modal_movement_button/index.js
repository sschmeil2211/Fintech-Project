import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";

import FAIcons5 from "react-native-vector-icons/FontAwesome5";

import styles from "./styles";

const MovementModalButton = ({
    icon,
    label
}) => {
    return (
        <View style={styles.buttonContainer}>
            <View style={styles.buttonTypeContainer}>
                <FAIcons5 name={icon} size={20} color="white" />
                <Text style={styles.buttonText}>{label}</Text>
            </View>
            <FAIcons5 name="angle-right" size={18} color="white" />
        </View>
    );
};

export default MovementModalButton;  