export const getInitialsName = (...names) => {
    if (names.length === 1) {
        const words = names[0].split(" ");
        const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
        return initials;
    } 
    else if (names.length === 2) {
        const [firstName, lastName] = names;
        const initials = `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
        return initials;
    } 
    else  
        throw new Error("Invalid number of arguments. Expected 1 or 2 arguments."); 
};