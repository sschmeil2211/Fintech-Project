import React from "react";
import { View } from "react-native";
import { LinearGradient } from 'react-native-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";

const Background = ({ children }) => {
    return (
        <LinearGradient colors={["#1A0E24", "#000000"]} style={styles.gradientContainer}>
            <SafeAreaView>
                <View style={styles.home}>
                    {children}
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Background;