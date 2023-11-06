import React from "react";
import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Background, FullWidthButton, Header, TitleInputText } from "../../../../components/common_components";
import AsyncStorageService from "../../../../../services/AsynStorageService";
import styles from "./styles";
import Enum from "../../../../../models/Enum";

const PersonalInfoScreen = () => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dni: "",
        cuilCuit: "",
    });
    const [selectedOption, setSelectedOption] = useState(null);
    const [date, setDate] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [genres, setGenres] = useState([]);
    const enumsData = async () => {
        const enums = await Enum.getEnums();
        setGenres(enums.genres); // Set the genres obtained from enums
    };

    useEffect(() => {
        enumsData(); // Fetch enums when component mounts
    }, []);

    const handleOptionPress = (option) => setSelectedOption(option);

    const handleConfirm = (date) => {
        setDate(date);
        setDatePickerVisibility(false);
    };

    const getDateOfBirth = () => date ? date.toLocaleDateString() : "";

    const onPressContinue = async () => {
        const emptyFields = Object.values(formData).some((value) => !value);
        if (emptyFields) return;

        const data = await AsyncStorageService.getUserLocally();
        const userData = { ...data, ...formData };
        await AsyncStorageService.saveUserLocally(userData);

        navigation.navigate("LastInfoScreen");
    };

    const handleFieldChange = (fieldName, value) => setFormData((prevData) => ({ ...prevData, [fieldName]: value }));

    const inputTextFields = [
        {
            inputMode: "text",
            title: "Ingresá tu nombre",
            fieldName: "firstName",
            onChangeText: handleFieldChange,
        },
        {
            inputMode: "text",
            title: "Ingresá tu apellido",
            fieldName: "lastName",
            onChangeText: handleFieldChange,
        },
        {
            inputMode: "none",
            title: "Número de documento",
            fieldName: "dni",
            onChangeText: handleFieldChange,
        },
        {
            inputMode: "none",
            title: "CUIL/CUIT",
            fieldName: "cuilCuit",
            onChangeText: handleFieldChange,
        },
    ];

    return (
        <Background>
            <View style={styles.container}>
                {inputTextFields.map((field) => (
                    <TitleInputText
                        key={field.fieldName}
                        inputMode={field.inputMode}
                        title={field.title}
                        onChangeText={(value) => field.onChangeText(field.fieldName, value)}
                        text={formData[field.fieldName]}
                    />
                ))}
                <Text style={styles.title}>SEXO</Text>
                <View style={styles.optionsContainer}>
                    {genres.map((genre) => (
                        <TouchableOpacity
                            key={genre}
                            style={[
                                styles.option,
                                selectedOption === genre ? { backgroundColor: "#604AD9" } : null,
                            ]}
                            onPress={() => handleOptionPress(genre)}
                        >
                            <Text style={styles.optionText}>{genre}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                    <View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.date}>{getDateOfBirth()}</Text>
                        </View>
                        <Text style={styles.titleContainer}>Fecha de nacimiento</Text>
                    </View>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={() => setDatePickerVisibility(false)}
                />
            </View>
            <FullWidthButton label={"SIGUIENTE"} onPress={onPressContinue} backgroundColor={"#604AD9"} />
        </Background>
    );
};

export default PersonalInfoScreen;