import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { InvestmentCard } from '../../components/home_screen_components';
import { Background, Header, NumericKeyboard } from '../../components/common_components';
import styles from "./styles";
import AzureApi from "../../../services/AzureApi";
import { useUserProvider } from "../../../view_models/providers/UserProvider"; 

const api = new AzureApi('http://192.168.0.60:3000');

const InvestmentsScreen = () => {

    const navigation = useNavigation();
    const user = useUserProvider().getUser();

    const [investments, setInvestments] = useState([]); // Un estado para almacenar los datos obtenidos  

    const onPressReturn = () => navigation.navigate("HomeScreen");

    useEffect(() => {
        const fetchData = async () => {
            try {
                /* const api = new AzureApi('https://brubankclone.azurewebsites.net'); */
                const response = await api.get("api/investment"); 
                setInvestments(response.data);

            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        fetchData();
    }, []);

    const investmentTypeIcon = (type) => {
        switch (type) {
            case "CRYPTO":
                return require("../../../../assets/icons/cryptocurrency.png");
            case "ESTATE":
                return require("../../../../assets/icons/loan.png");
            case "FOREIGN_EXCHANGE":
                return require("../../../../assets/icons/money.png");
            default:
                return require("../../../../assets/icons/profit.png");
        }
    };

    const onConfirm = async (investmentId, enteredValue) => {
        const requestData = { userId: user.id, investmentValue: parseFloat(enteredValue) }
        try {
            const response = await api.put(`api/investment/${investmentId}/select`, requestData);
            console.log(response.data.message);
        }
        catch (error) {
            console.error("Error al acceder a la API:", error);
        }
    };

    return (
        <Background>
            <Header iconName="arrow-left" iconColor="#604AD9" onPress={onPressReturn} />
            <ScrollView style={styles.scrollView}>
                {investments.map((investment, index) => (
                    <InvestmentCard
                        key={index}
                        investmentType={investmentTypeIcon(investment.type)}
                        investmentName={investment.name}
                        investmentEfficiency={investment.efficiency}
                        investmentRisk={investment.risk}
                        investmentInitialBalance={investment.initialBalance}
                        investmentDescription={investment.description}
                        userBalance={user.balance}
                        onConfirm={(enteredValue) => onConfirm(investment.id, enteredValue)}
                    />
                ))}
            </ScrollView>
        </Background>
    );
};

export default InvestmentsScreen;   