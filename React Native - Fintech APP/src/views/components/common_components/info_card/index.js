import React from "react"; 
import { View, Text } from "react-native";  

import FAIcons5 from 'react-native-vector-icons/FontAwesome5';

import styles from "./styles"; 

const InfoCard = ({
    iconName,
    iconColor,
    title,
    description,
    children,
    flex
}) => { 

    const columnStyles = {...styles.column, flex: flex ?? 1}

    return (
        <View style={columnStyles}>
            <View style={styles.iconContainer}>
                <FAIcons5 name={iconName} size={55} color={iconColor} />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text> 
            {children}
        </View>
    );
};

export default InfoCard;