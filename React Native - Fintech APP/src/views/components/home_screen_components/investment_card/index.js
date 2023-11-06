import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import * as Progress from 'react-native-progress';

import { NumericKeyboard } from "../../common_components";
import styles from "./styles";

const InvestmentCard = ({
    investmentType,
    investmentName,
    investmentInitialBalance,
    investmentEfficiency,
    investmentRisk,
    investmentDescription,
    userBalance,
    onConfirm
}) => {

    const [expanded, setExpanded] = useState(false);
    const [toInvest, setToInvest] = useState(false);
    const [enteredValue, setEnteredValue] = useState("");

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "⌫"];
    const hintText = String(investmentInitialBalance);
    let canInvest = false;

    const symbolStyles = { ...styles.value, fontSize: 16 };
    const valueStyles = { ...styles.value, fontSize: 50 };
    const nameStyles = { ...styles.label, fontSize: 26 };
    const percentageStyles = { ...styles.label, fontSize: 12 };

    const onPressCancel = () => {
        setExpanded(false);
        setToInvest(false);
        setEnteredValue("");
    };

    const onPressConfirm = () => {
        onConfirm(enteredValue || hintText);
        onPressCancel();
    };

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

    const renderErrorText = () => {
        let label = "";
        switch (true) {
            case parseFloat(enteredValue) < investmentInitialBalance:
                canInvest = false;
                label = `Inversión mínima de ${investmentInitialBalance}`;
                break;
            case parseFloat(enteredValue) > userBalance:
                canInvest = false;
                label = 'El valor excede tu balance total';
                break;
            default:
                canInvest = true;
                break;
        }
        return <Text style={styles.errorLabel}>{label}</Text>;
    }

    const renderInvestmentComponent = () => {
        if (toInvest)
            return (
                <>
                    <View style={styles.valueContainer}>
                        <Text style={symbolStyles}>$</Text>
                        <Text style={valueStyles}>{enteredValue || hintText}</Text>
                    </View>
                    {renderErrorText()}
                    <NumericKeyboard
                        numbers={numbers}
                        onPressNumber={handlePressNumber}
                        maxWidth={375}
                        numberWidth={75}
                        numberHeight={35}
                        borderRadius={10}
                        justifyContent={"center"}
                    />
                </>
            );
        else
            return (
                <Text style={styles.description}>{investmentDescription} Comenzá a invertir con ${investmentInitialBalance}</Text>
            );
    }

    const renderExpandedComponent = () => {
        const label = toInvest ? "Confirmar" : "Invertir";
        if (!expanded) return null
        return (
            <>
                {renderInvestmentComponent()}
                <View style={styles.buttonsRow}>
                    {toInvest ? <TouchableOpacity onPress={onPressCancel}>
                        <Text style={styles.button}>Cancelar</Text>
                    </TouchableOpacity> : null}
                    <TouchableOpacity onPress={toInvest ? () => onPressConfirm() : () => setToInvest(true)} disabled={toInvest && !canInvest}>
                        <Text style={styles.button}>{label}</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }

    const PercentageBar = ({ label, percentage }) => (
        <>
            <Text style={percentageStyles}>{label}</Text>
            <Progress.Bar
                progress={percentage}
                width={150}
                height={15}
                color="#604AD9"
                borderColor="#604AD9"
                style={{ marginVertical: 5 }}
            />
        </>
    )

    return (
        <TouchableOpacity onPress={() => setExpanded(!expanded)} disabled={toInvest}>
            <View style={styles.container}>
                <Text style={nameStyles}>{investmentName}</Text>
                <View style={styles.informationContainer}>
                    <Image
                        source={investmentType}
                        style={{ height: 100, width: 100 }}
                        tintColor={"#604AD9"}
                        resizeMode="contain"
                    />
                    <View>
                        <PercentageBar label={"Eficiencia"} percentage={investmentEfficiency} />
                        <PercentageBar label={"Riesgo"} percentage={investmentRisk} />
                    </View>
                </View>
                {renderExpandedComponent()}
            </View>
        </TouchableOpacity>
    );
};

export default InvestmentCard;   