import React from "react";
import { View, Text } from "react-native";

import { CircleDisplay } from "../../common_components";
import styles from "./styles";

const Contact = ({
    name,
    profileText,
    profileTextColor,
    description,
    children
}) => {

    return (
        <View style={styles.rowContainer}>
            <View style={styles.infoContainer}>
                <CircleDisplay
                    circleType="profile"
                    size={35}
                    profileText={profileText}
                    profileTextColor={profileTextColor}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.bank}>{description}</Text>
                </View>
            </View>
            {children}
        </View>
    );
};

export default Contact;