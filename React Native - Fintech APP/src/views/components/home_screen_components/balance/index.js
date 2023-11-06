import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";

import { CommonModal, NumberDisplay } from "../../common_components";
import { useUserProvider } from "../../../../view_models/providers/UserProvider";
import styles from "./styles";

const Balance = ({ amount }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const { isEnabled, toggleSwitch } = useUserProvider();

    return (
        <View style={styles.container}>
            <Text style={styles.balanceText}>Balance</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <NumberDisplay
                    amount={amount}
                    color={"#FFFFFF"}
                    fontSize={28}
                />
            </TouchableOpacity>

            <CommonModal
                visible={modalVisible} 
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.portfolio}>
                    <Text style={styles.currencyType}>ARS</Text>
                    <NumberDisplay
                        amount={amount}
                        color={"#604AD9"}
                        fontSize={16}
                    />
                </View>
                <View style={styles.hideCurrencyContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Hide mode</Text>
                        <Text style={styles.description}>Hide all information that could be sensitive.</Text>
                    </View>
                    <View>
                        <Switch
                            trackColor={{ false: "#494755", true: "#604AD9" }}
                            thumbColor={isEnabled ? "white" : "#191919"}
                            ios_backgroundColor="#3E3E3E"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
            </CommonModal>
        </View>
    );
};

export default Balance;  