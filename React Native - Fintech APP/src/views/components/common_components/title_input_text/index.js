import React from "react";
import { View, Text, TextInput } from "react-native";

import styles from "./styles";

const TitleInputText = ({
    text,
    onChangeText,
    inputMode,
    title,
    secureTextEntry,
    titleBGColor
}) => {

    const titleStyles = {...styles.overlayText, backgroundColor: titleBGColor ?? "#000000",}

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                inputMode={inputMode}
                secureTextEntry={secureTextEntry}
            />
            <Text style={titleStyles}>{title}</Text>
        </View>
    );
};

export default TitleInputText;