import React, { useState } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PanGestureHandler, State } from "react-native-gesture-handler";

import { Background, CommonModal, FullWidthButton, Header, InfoCard } from "../../../../components/common_components";
import styles from "./styles";

const DNIFindScreen = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);

    const onPressReturn = () => {
        navigation.navigate("LastInfoScreen");
    };

    const onPressContinue = () => {
        navigation.navigate("DNIFindScreen");
    };

    const items = [
        "- Pasaporte.",
        "- Licencia de conducir.",
        "- Trámite de DNI."
    ];

    const info = [
        {
            iconName: "info",
            title: "Consejos para sacar una foto válida del DNI",
            description: "Prestá atención a las siguientes indicaciones."
        },
        {
            iconName: "lightbulb",
            title: "Buena iluminación",
            description: "Fijate que tu DNI no tenga sombras ni reflejos que tapen los datos."
        },
        {
            iconName: "search",
            title: "Que se puedan leer claramente los textos",
            description: "Asegurate que se puedan leer correctamente tu nombre y la fecha de nacimiento."
        },
        {
            iconName: "address-card",
            title: "Que el documento se vea completo",
            description: "Cuando saques la foto, todo el DNI tiene que estar visible. Te recomendamos no taparlo con el dedo"
        }
    ];

    const handleSlideChange = event => {
        const gestureState = event.nativeEvent.state;
        if (gestureState === State.END) {
            const offsetX = event.nativeEvent.translationX;
            const newIndex = activeSlide - Math.round(offsetX / Dimensions.get("window").width);
            if (newIndex < 0) setActiveSlide(0);
            else if (newIndex > info.length - 1) setActiveSlide(info.length - 1);
            else setActiveSlide(newIndex);
        }
    };

    const circleStyles = (index) => ({
        ...styles.circle,
        backgroundColor: index === activeSlide ? "#4381E6" : "#604AD9"
    });

    const circleDisplay = () => {
        const circles = [];
        for (let i = 0; i < info.length; i++) {
            circles.push(<View key={i} style={circleStyles(i)} />);
        }
        return circles;
    };

    return (
        <Background>
            <Header iconName="arrow-left" iconColor="#604AD9" onPress={onPressReturn} />
            <View style={styles.container}>
                <InfoCard
                    iconName={"address-card"}
                    iconColor={"#604AD9"}
                    title={"Buscá tu DNI"}
                    description={"Tiene que ser la versión más reciente de tu DNI argentino."}
                >
                    <Text style={styles.text}>No es válido:</Text>
                    {items.map((item) => <Text style={styles.text} key={item}>{item}</Text>)}
                </InfoCard>
            </View>
            <FullWidthButton label="¡YA TENGO MI DNI!" onPress={() => setModalVisible(true)} backgroundColor="#604AD9" />
            <CommonModal
                onRequestClose={() => setModalVisible(false)}
                visible={modalVisible}
            >
                <GestureHandlerRootView>
                    <PanGestureHandler
                        onGestureEvent={handleSlideChange}
                        onHandlerStateChange={handleSlideChange}
                    >
                        <View >
                            {info.map((card, index) => (
                                <View key={index} >
                                    {index === activeSlide && (
                                        <View style={{ alignItems: "center" }}>
                                            <InfoCard
                                                iconName={card.iconName}
                                                iconColor={"#604AD9"}
                                                title={card.title}
                                                description={card.description}
                                                flex={0}
                                            />
                                            <View style={styles.circleRow}>
                                                {index === info.length - 1
                                                    ? <TouchableOpacity>
                                                        <Text style={styles.button}>Sacar Foto</Text>
                                                    </TouchableOpacity>
                                                    : circleDisplay(index)}
                                            </View>
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>
                    </PanGestureHandler>
                </GestureHandlerRootView>
            </CommonModal>
        </Background>
    );
};

export default DNIFindScreen; 