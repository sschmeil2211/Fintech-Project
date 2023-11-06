import React from "react";
import { useState, useRef } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, Modal, ScrollView } from "react-native";

import FAIcons5 from 'react-native-vector-icons/FontAwesome5';

import { CircleDisplay, NumericKeyboard } from "../../common_components";
import styles from "./styles";

const TransferContent = ({ 
    data,
    onPressSend,
    onPressRequest,
    enteredValue,
    setEnteredValue,
    reason,
    setReason,
    message,
    setMessage
}) => {
    const TransferDetails = require("../transfer_details").default;

    const hintText = "0";

    const handlePressNumber = (num) => {
        if (num === "⌫")
            setEnteredValue((prevValue) => prevValue.slice(0, -1) || "");
        else if (num === "." && !enteredValue.includes("."))
            setEnteredValue((prevValue) => prevValue + ".");
        else if (num !== ".") {
            if (enteredValue.includes(".")) {
                const [, afterComma] = enteredValue.split(".");
                if (afterComma.length >= 2)
                    return;
            }
            setEnteredValue((prevValue) => prevValue + num);
        }
    };

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "⌫"];

    const [isChecked, setIsChecked] = useState();

    const checkedComponent = () => {
        if (isChecked)
            return <TransferDetails
                onPressSend={onPressSend}
                onPressRequest={onPressRequest}
                reason={reason}
                setReason={setReason}
                message={message}
                setMessage={setMessage}
            />;
        return <NumericKeyboard
            numbers={numbers}
            onPressNumber={handlePressNumber}
            maxWidth={375}
            numberWidth={100}
            numberHeight={60}
            borderRadius={10}
            justifyContent={"center"}
        />
    };

    return (
        <>
            <View style={styles.profileContainer}>
                <CircleDisplay
                    circleType={"profile"}
                    fontSize={25}
                    size={65}
                    profileText={data.profileText}
                    profileTextColor={data.profileTextColor}
                />
                <View style={styles.bankContainer}>
                    <CircleDisplay circleType={"image"} size={25} source={data.source} />
                </View>
            </View>
            <View style={styles.profileInfo}>
                <Text style={styles.name}>{data.userName}</Text>
                <Text style={styles.balance}>CVU/CBU: {data.cvu}</Text>
                <Text style={styles.balance}>CUIL/CUIT: {data.cuilCuit}</Text>
                <Text style={styles.balance}>Tu saldo: ARS {data.balance}</Text>
            </View>
            <View style={styles.valueContainer}>
                <Text style={styles.symbol}>$</Text>
                <Text style={styles.value}>{enteredValue || hintText}</Text>
            </View>
            <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <FAIcons5 name={isChecked ? "undo" : "check"} size={25} color={"white"} />
                    </View>
                </View>
            </TouchableOpacity>
            {checkedComponent()}
        </>
    );
};

export default TransferContent;