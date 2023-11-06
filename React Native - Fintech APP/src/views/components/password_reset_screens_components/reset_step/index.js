import React from "react";
import { View, Text } from "react-native"; 
import { useNavigation } from '@react-navigation/native';

import FAIcons5 from 'react-native-vector-icons/FontAwesome5';

import styles from "./styles"; 

const ResetStep = ({
    icon,
    color,
    title,
    description
}) => {

    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate('HomeScreen');
    }

    return (
        <View style={styles.stepRow}>
            <View style={styles.iconContainer}>
                <FAIcons5 name={icon} size={18} color={color} />
            </View>
            <View style={styles.stepInfo}>
                <Text style={styles.stepTitle}>{title}</Text>
                <Text style={styles.stepDescription}>{description}</Text>
            </View>
        </View>
    );
};

export default ResetStep;