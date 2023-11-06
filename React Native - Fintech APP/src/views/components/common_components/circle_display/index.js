import React from 'react';
import { View, Text, Image } from "react-native";

import FAIcons5 from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";

const CircleDisplay = ({
    circleType,
    source,
    profileText,
    profileTextColor,
    fontSize,
    size
}) => {

    const backgroundColor = circleType !== "icon" ? "#CEEFE8" : undefined;

    const containerStyle = { ...styles.container, height: size, width: size, backgroundColor };

    const textStyle = { ...styles.text, color: profileTextColor, fontSize };

    const imageStyle = {height: size, width: size};

    const renderContent = () => {
        switch (circleType) {
            case "profile":
                return <Text style={textStyle}>{profileText}</Text>;
            case "icon":
                return <FAIcons5 name={"percentage"} color={"green"} size={size} />;
            case "image":
                return <Image source={source} style={imageStyle} />;
            default:
                return null;
        }
    };

    return (
        <View style={containerStyle}>{renderContent()}</View>
    );
};

export default CircleDisplay;