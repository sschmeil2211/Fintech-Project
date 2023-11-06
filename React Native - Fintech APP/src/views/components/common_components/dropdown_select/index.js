import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import styles from "./styles";

const DropdownSelect = ({
    options,
    backgroundColor,
    borderRadius,
    paddingVertical,
    selectedOption,
    setSelectedOption,
    expanded,
    setExpanded
}) => {

    const handleToggleExpand = () => setExpanded(!expanded);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setExpanded(false);
    };

    const containerStyles = { ...styles.container, backgroundColor, borderRadius }
    const textStyles = { ...styles.text, paddingVertical }

    return (
        <View>
            <TouchableOpacity onPress={handleToggleExpand}>
                <View style={containerStyles}>
                    {expanded ? (
                        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                            {options.map((item) => (
                                <TouchableOpacity key={item} onPress={() => handleOptionSelect(item)}>
                                    <Text style={textStyles}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    ) : (
                        <Text style={textStyles}>{selectedOption}</Text>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default DropdownSelect;