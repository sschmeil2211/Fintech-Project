import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import styles from "./styles";
import { VictoryLine } from "victory-native";

const UserInvestmentCard = ({ data }) => {

    const investmentTypeIcon = (type) => {
        switch (type) {
            case "CRYPTO":
                return require("../../../../../assets/icons/cryptocurrency.png");
            case "ESTATE":
                return require("../../../../../assets/icons/loan.png");
            case "FOREIGN_EXCHANGE":
                return require("../../../../../assets/icons/money.png");
            default:
                return require("../../../../../assets/icons/profit.png");
        }
    };

    const AnalysisCard = () => {
        return (
            <View style={styles.investmentAnalysis}>
                <View style={styles.investmentCard}>
                    <Text style={styles.cardTitle}>Invested</Text>
                    <Text style={styles.cardValue}>${data.invested}</Text>
                </View>
                <View style={styles.investmentCard}>
                    <Text style={styles.cardTitle}>Profit</Text>
                    <Text style={styles.cardValue}>${data.profit}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Card */}
            <View style={styles.card}>
                <Image
                    source={investmentTypeIcon(data.type)}
                    style={styles.image}
                    tintColor={"white"}
                />
                <Text style={styles.percentage}>+{data.percent}%</Text>
                <Text style={styles.title}>{data.name}</Text>
                {/* Chart */}
                <VictoryLine
                    data={data.dataset}
                    height={200}
                    style={{ data: { stroke: "orange", strokeWidth: 4 } }}
                    interpolation="monotoneX"
                />

                {/* Analytics */}
                <AnalysisCard />

                {/* Buttons */}
                <View style={styles.buttonsRow}>
                    <TouchableOpacity onPress={() => console.log("Saco tood")}>
                        <Text style={styles.button}>Withdraw</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log("Saco tood")}>
                        <Text style={styles.button}>Withdraw All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log("Saco tood")}>
                        <Text style={styles.button}>Reinvest</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default UserInvestmentCard;