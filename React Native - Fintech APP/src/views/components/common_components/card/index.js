import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./styles";

const Card = ({
    disabled,
    circleType,
    circleSize,
    source,
    onPress,
    cardTitle,
    cardDescription,
    profileText,
    profileTextColor,
    children
}) => {
    const CircleDisplay = require("../circle_display").default;
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} >
            <View style={styles.rowContainer}>
                <View style={styles.infoContainer}>

                    <CircleDisplay
                        circleType={circleType}
                        size={circleSize}
                        profileText={profileText}
                        profileTextColor={profileTextColor}
                        source={source}
                    />

                    <View style={styles.userInfo}>
                        <Text style={styles.name}>{cardTitle}</Text>
                        <Text style={styles.description}>{cardDescription}</Text>
                    </View>

                </View>

                <View>{children}</View>
            </View>
        </TouchableOpacity>
    );
};

export default Card;