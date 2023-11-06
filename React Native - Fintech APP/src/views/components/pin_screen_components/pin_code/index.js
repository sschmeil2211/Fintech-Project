import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./styles";
import { NumericKeyboard } from "../../common_components";

const PinCode = ({ onSubmitPin }) => {

    const [passcode, setPasscode] = useState(["", "", "", "", "", ""]);
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "⌫"];

    const onPressNumber = (num) => {
        const tempCode = [...passcode];
        const emptyIndex = tempCode.findIndex((p) => p === "");

        if (num === "⌫") {
            const lastFilledIndex = tempCode.reduceRight((acc, p, index) => {
                if (acc === -1 && p !== "")
                    return index;
                return acc;
            }, -1);
            if (lastFilledIndex !== -1) {
                tempCode[lastFilledIndex] = "";
                setPasscode(tempCode);
            }
        }
        else if (emptyIndex !== -1) {
            tempCode[emptyIndex] = num.toString();
            setPasscode(tempCode);
            if (emptyIndex === tempCode.length - 1) {// Si se ingresó el último dígito, verificar automáticamente el PIN
                const enteredPin = tempCode.join("");
                onSubmitPin(enteredPin);
                setPasscode(["", "", "", "", "", ""]); // Reiniciar el passcode después de enviar
            }
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.textContainer}>
                <Text style={styles.text}>Ingresá tu clave</Text>
            </View>

            <View style={styles.codeContainer}>
                {passcode.map((p, index) => (
                    <View
                        style={[styles.code, p !== "" && { height: 15, width: 15, backgroundColor: "white" }]}
                        key={index}
                    ></View>
                ))}
            </View>

            <NumericKeyboard
                numbers={numbers}
                onPressNumber={onPressNumber} 
                maxWidth={275}
                numberWidth={75}
                numberHeight={75}
                borderRadius={50}
                justifyContent={"flex-end"}
            />
        </View>
    );
}

export default PinCode;