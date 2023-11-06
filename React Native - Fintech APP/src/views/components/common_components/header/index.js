import React from 'react';
import { View, TouchableOpacity } from "react-native";

import FAIcons5 from 'react-native-vector-icons/FontAwesome5';

import styles from "./styles";

const Header = ({
    backgroundColor,
    iconName,
    iconColor,
    onPress,
    children
}) => {

    const iconContainerStyle = { ...styles.iconContainer, backgroundColor }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <View style={iconContainerStyle}>
                    <FAIcons5 name={iconName} size={18} color={iconColor} />
                </View>
            </TouchableOpacity>

            <View style={styles.headerContainer}>
                {children}
            </View>
        </View>
    );
};

export default Header;