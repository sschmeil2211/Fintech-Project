import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";

import { Background, Header } from "../../components/common_components";
import AzureApi from "../../../services/AzureApi";
import { useUserProvider } from "../../../view_models/providers/UserProvider"; 
import styles from "./styles";
import { UserInvestmentCard } from "../../components/investment_components";

const api = new AzureApi('http://192.168.0.60:3000');

const AnalysisScreen = () => {

    //const navigation = useNavigation();
    const user = useUserProvider().getUser();

    const [investments, setInvestments] = useState([]); // Un estado para almacenar los datos obtenidos   

    const onPressReturn = () => navigation.navigate("HomeScreen");

    /* useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.getUserInvestments(`api/investment/user/${user.id}`);
                setInvestments(response.data);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        fetchData();
    }, []); */

    const onPress = async () => {
        const data = {
            userId: user.id,
            withdrawalAmount: 2500,
            withdrawalDate: new Date()
        }
        try {
            const id = "0";
            const response = await api.post(`api/investment/${id}/withdraw`, data);
            console.log(response.data.message);
        }
        catch (error) {
            console.error("Error al acceder a la API:", error);
        }
    };

    const userInvestmentRender = (investment) => {
        const userInv = Object.entries(user.userInvestment);
        let investedValue;
        for (let i = 0; i < userInv.length; i++) {
            const [id, value] = userInv[i];
            if (id === investment.id);
            investedValue = value;
        }
        return investedValue;
    };

    const proof = [
        {
            name: "Inversión 1", type: "CRYPTO", invested: 1200, profit: 230, value: 5000, percent: 2, dataset: [
                { x: 0, y: 0.43 },
                { x: 1, y: 4 },
                { x: 2, y: -1 },
                { x: 3, y: 0.27 },
                { x: 4, y: -1.25 },
                { x: 5, y: -0.12 },
                { x: 6, y: 0.37 },
                { x: 7, y: 0.29 },
                { x: 8, y: 0.53 },
                { x: 9, y: 4.40 },
                { x: 10, y: 3.64 },
                { x: 11, y: 1 }
            ]
        },
        {
            name: "Inversión 2", type: "CRYPTO", invested: 1200, profit: 230, value: 5000, percent: 2, dataset: [
                { x: 0, y: 0.43 },
                { x: 1, y: 4 },
                { x: 2, y: -1 },
                { x: 3, y: 0.27 },
                { x: 4, y: -1.25 },
                { x: 5, y: -0.12 },
                { x: 6, y: 0.37 },
                { x: 7, y: 0.29 },
                { x: 8, y: 0.53 },
                { x: 9, y: 4.40 },
                { x: 10, y: 3.64 },
                { x: 11, y: 1 }
            ]
        },
        {
            name: "Inversión 3", type: "CRYPTO", invested: 1200, profit: 230, value: 5000, percent: 2, dataset: [
                { x: 0, y: 0.43 },
                { x: 1, y: 4 },
                { x: 2, y: -1 },
                { x: 3, y: 0.27 },
                { x: 4, y: -1.25 },
                { x: 5, y: -0.12 },
                { x: 6, y: 0.37 },
                { x: 7, y: 0.29 },
                { x: 8, y: 0.53 },
                { x: 9, y: 4.40 },
                { x: 10, y: 3.64 },
                { x: 11, y: 1 }
            ]
        },
        {
            name: "Inversión 4", type: "CRYPTO", invested: 1200, profit: 230, value: 5000, percent: 2, dataset: [
                { x: 0, y: 0.43 },
                { x: 1, y: 4 },
                { x: 2, y: -1 },
                { x: 3, y: 0.27 },
                { x: 4, y: -1.25 },
                { x: 5, y: -0.12 },
                { x: 6, y: 0.37 },
                { x: 7, y: 0.29 },
                { x: 8, y: 0.53 },
                { x: 9, y: 4.40 },
                { x: 10, y: 3.64 },
                { x: 11, y: 1 }
            ]
        }
    ]

    const AnalyticRow = ({ leftTitle, leftValue, rightTitle, rightValue }) => {
        return (
            <View style={styles.analyticRow}>
                <View style={styles.analyticContainer}>
                    <Text style={styles.analyticTitle}>{leftTitle}</Text>
                    <Text style={styles.analyticBody}>{leftValue}</Text>
                </View>
                <View style={styles.analyticContainer}>
                    <Text style={styles.analyticTitle}>{rightTitle}</Text>
                    <Text style={styles.analyticBody}>{rightValue}</Text>
                </View>
            </View>
        );
    }

    const renderItem = ({ item }) => {
        return <UserInvestmentCard data={item} />
    }

    const keyExtractor = (item) => item.name; // Ajusta esto según tu estructura de datos

    const ItemSeparator = () => <View style={{ width: 10 }} />; // Espaciado entre elementos

    return (
        <Background>
            <Header iconName={"search"} iconColor={"#604AD9"} />

            {/* Total Analytic */}
            <AnalyticRow
                leftTitle={"Total Balance"}
                leftValue={"$15000"}
                rightTitle={"Monthly Earnings"}
                rightValue={"$7000"}
            />
            <AnalyticRow
                leftTitle={"Total Invested"}
                leftValue={"$1200"}
                rightTitle={"Profit Percentage"}
                rightValue={"17%"}
            />

            <FlatList
                data={proof}
                renderItem={renderItem}
                keyExtractor={keyExtractor} 
                pagingEnabled 
                snapToAlignment="start"
                decelerationRate={"normal"}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={ItemSeparator}
            /> 
        </Background>
    );
};

export default AnalysisScreen; 