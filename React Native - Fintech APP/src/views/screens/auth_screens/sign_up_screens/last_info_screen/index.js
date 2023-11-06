import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Background, DropdownSelect, FullWidthButton, Header, TitleInputText } from "../../../../components/common_components";
import LastInfoHelper from "./helper";
import styles from "./styles";
import Enum from "../../../../../models/Enum";

const LastInfoScreen = () => {
    const navigation = useNavigation();
    const [dropdownExpansions, setDropdownExpansions] = useState({});
    const [nationalities, setNationalities] = useState([]);
    const [occupations, setOccupations] = useState([]);
    const [civilStatuses, setCivilStatuses] = useState([]);
    const [formData, setFormData] = useState({
        nationality: "Seleccioná una opción",
        occupation: "Seleccioná una opción",
        civilStatus: "Seleccioná una opción",
        address: "",
        addressNumber: "",
        floorNumber: "",
        apartmentNumber: "",
        postalCode: "",
    });
    const dropdownFields = LastInfoHelper.dropdownFields;
    const inputTextFields = LastInfoHelper.inputTextFields;
    const onPressReturn = () => navigation.navigate("PersonalInfoScreen");
    const onPressContinue = async () => await LastInfoHelper.onPressContinue(
        formData, () =>
        navigation.navigate("TabNavigator")
    );
    const handleFieldChange = (fieldName, value) => setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
    const isAnyDropdownExpanded = () => LastInfoHelper.isAnyDropdownExpanded(dropdownExpansions);

    useEffect(() => {
        const fetchEnums = async () => {
            const enums = await Enum.getEnums();
            setNationalities(enums.nationalities);
            setOccupations(enums.occupations);
            setCivilStatuses(enums.civilStatuses);
        };

        fetchEnums();
    }, []);

    return (
        <Background>
            <Header iconName="arrow-left" iconColor="#604AD9" onPress={onPressReturn} />
            <ScrollView style={styles.container} scrollEnabled={!isAnyDropdownExpanded()}>
                {dropdownFields.map((field) => (
                    <React.Fragment key={field.fieldName}>
                        <Text style={styles.text}>{field.label}</Text>
                        <DropdownSelect
                            label={field.label}
                            options={field.fieldName === "nationality"
                                ? nationalities
                                : field.fieldName === "occupation"
                                    ? occupations
                                    : field.fieldName === "civilStatus"
                                        ? civilStatuses
                                        : []
                            }
                            backgroundColor="#604AD9"
                            borderRadius={10}
                            paddingVertical={20}
                            selectedOption={formData[field.fieldName]}
                            setSelectedOption={(value) => handleFieldChange(field.fieldName, value) }
                            expanded={dropdownExpansions[field.fieldName]} // Usar el estado específico para este dropdown
                            setExpanded={(value) => setDropdownExpansions((prevExpansions) => ({ ...prevExpansions, [field.fieldName]: value}))}
                        />
                    </React.Fragment>
                ))}
                <View style={styles.inputsContainer}>
                    {inputTextFields.map((field) => (
                        <TitleInputText
                            key={field.fieldName}
                            inputMode={field.inputMode}
                            title={field.title}
                            onChangeText={(value) => handleFieldChange(field.fieldName, value)}
                            text={formData[field.fieldName]}
                        />
                    ))}
                </View>
            </ScrollView>
            <FullWidthButton
                label="SIGUIENTE"
                onPress={onPressContinue}
                backgroundColor="#604AD9"
            />
        </Background>
    );
};

export default LastInfoScreen;