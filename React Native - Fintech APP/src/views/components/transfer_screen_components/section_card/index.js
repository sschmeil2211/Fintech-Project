import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./styles";
import { CircleDisplay } from "../../common_components";

const TransferCard = ({
    disabled,
    source,
    cardTitle,
    cardDescription,
    profileText,
    profileTextColor,
    children
}) => {
    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(!expanded);

    return (
        <>
            <TouchableOpacity onPress={handlePress} disabled={disabled}>
                <View style={styles.rowContainer}>
                    <View style={styles.infoContainer}>
                        <CircleDisplay
                            circleType={"profile"}
                            size={35}
                            profileText={profileText}
                            profileTextColor={profileTextColor}
                            source={source}
                        />
                        <View style={styles.userInfo}>
                            <Text style={styles.name}>{cardTitle}</Text>
                            <Text style={styles.description}>{cardDescription}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            {expanded && (<View>{children}</View>)}
        </>
    );
};

export default TransferCard;