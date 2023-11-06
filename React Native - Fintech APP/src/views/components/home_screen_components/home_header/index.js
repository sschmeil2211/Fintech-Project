import React from 'react';
import { View } from "react-native";  

import { Header, CircleDisplay } from "../../common_components"; 
import styles from "./styles"; 

const HomeHeader = ({
    profileText,
    profileTextColor,
    children
}) => {
    return (
        <Header
            backgroundColor={"#101010"}
            iconName={"search"}
            iconColor={"white"}
            onPress={() => console.log("Searcher")}
        >
            {children}
            <View style={styles.circle}>
                <View style={styles.innerCircle}>
                    <CircleDisplay
                        circleType={"profile"}
                        profileText={profileText}
                        profileTextColor={profileTextColor}
                        fontSize={14}
                        size={30}
                    />
                </View>
            </View>
        </Header>
    );
};

export default HomeHeader;