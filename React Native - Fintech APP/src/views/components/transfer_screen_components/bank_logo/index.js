import React from "react";
import { View, Image } from "react-native";

import styles from "./styles";

const BankLogo = ({
    imagePath,
    size,
    left
}) => {

    const containerStyle = {
        ...styles.container,
        height: imagePath ? size : 20,
        width: imagePath ? size : 20,
        left, 
    };

    return (
        <View style={containerStyle}>
            {imagePath ? (
                <Image source={imagePath} style={styles.image} />
            ) : null}
        </View>
    );
};

export default BankLogo;