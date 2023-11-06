import User, { UserData } from "../../../../../models/User";
import AsyncStorageService from "../../../../../services/AsynStorageService";

interface DropdownExpansions {
    [key: string]: boolean;
}

class LastInfoHelper {

    static inputTextFields = [
        {
            inputMode: "text",
            title: "Calle",
            fieldName: "address"
        },
        {
            inputMode: "numeric",
            title: "Número",
            fieldName: "addressNumber"
        },
        {
            inputMode: "numeric",
            title: "Número de piso (opcional)",
            fieldName: "floorNumber"
        },
        {
            inputMode: "numeric",
            title: "Número de departamento (opcional)",
            fieldName: "apartmentNumber"
        },
        {
            inputMode: "text",
            title: "Código postal",
            fieldName: "postalCode"
        },
    ];

    static dropdownFields = [
        {
            label: "Nacionalidad",
            options: ["Argentina", "Bolivia", "Brasil", "Chile"],
            fieldName: "nationality"
        },
        {
            label: "Ocupación",
            options: ["Empleado", "Estudiante", "Desocupado", "Ama de casa"],
            fieldName: "occupation"
        },
        {
            label: "Estado civil",
            options: ["Soltero", "Casado", "Separado", "Viudo"],
            fieldName: "civilStatus"
        }
    ];

    static generateRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        let isLightColor = true;
        while (isLightColor) {
            color = "#"; // Reset color
            for (let i = 0; i < 6; i++)
                color += letters[Math.floor(Math.random() * 16)];
            const r = parseInt(color.substring(1, 3), 16);
            const g = parseInt(color.substring(3, 5), 16);
            const b = parseInt(color.substring(5, 7), 16);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            isLightColor = brightness > 160;
        }
        return color;
    };

    static isAnyDropdownExpanded = (dropdownExpansions: DropdownExpansions) => Object.values(dropdownExpansions).some((isExpanded) => isExpanded); 
    
    static onPressContinue = async (formData: UserData, navigateTo: Function) => {
        const emptyFields = formData.address !== "" &&
            formData.addressNumber !== null &&
            formData.postalCode !== "" &&
            formData.nationality !== "Seleccioná una opción" &&
            formData.occupation !== "Seleccioná una opción" &&
            formData.civilStatus !== "Seleccioná una opción"
        if (!emptyFields) return; 
        const data = await AsyncStorageService.getUserLocally();
        console.log(data);
        const userData = {
            ...data,
            ...formData,
            userColor: LastInfoHelper.generateRandomColor(),
        };
        console.log(formData);
        try {
            const newUser = new User(userData);
            await newUser.saveUser(userData);
            await AsyncStorageService.clearData();
            navigateTo();
        } catch (error) {
            await AsyncStorageService.saveUserLocally(userData);
            console.error("Error al guardar el usuario: ", error);
        }
    };
}

export default LastInfoHelper;