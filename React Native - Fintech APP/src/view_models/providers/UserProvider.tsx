import React, { createContext, useContext, ReactNode, Component } from "react";
import User from "../../models/User";

interface UserProviderContext {
    isEnabled: boolean;
    toggleSwitch: () => void;
    translateNumber: (number: number) => {
        integerNumber: string | number;
        decimalNumber: string;
    };
    getUser: () => User | null;
    getTransferHistory: () => any[];
    getAccounts: () => any[];
    getContacts: () => any[];
}

const UserContext = createContext<UserProviderContext | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const useUserProvider = () => {
    const context = useContext(UserContext);
    if (context === undefined)
        throw new Error("useSwitchContext debe ser usado dentro de UserProvider");
    return context;
};

class UserProvider extends Component<UserProviderProps, {
    isEnabled: boolean,
    user: User | null,
    transferHistory: any[],
    accounts: any[],
    contacts: any[],
    isLoadingUser: boolean,
}> {

    constructor(props: UserProviderProps) {
        super(props);
        this.state = {
            isEnabled: false,
            user: null,
            transferHistory: [],
            accounts: [],
            contacts: [],
            isLoadingUser: true,
        };
    }

    componentDidMount() {
        this.loadUserData();
    };

    async loadUser() {
        try {
            const currentUser = await User.getUser();
            if (!currentUser) {
                console.error('User not found');
                this.setState({ isLoadingUser: false }); // La carga del usuario ha finalizado
                return null;
            }
            return currentUser;
        } catch (error) {
            console.error('Error fetching data:', error);
            this.setState({ isLoadingUser: false }); // La carga del usuario ha finalizado con error
            return null;
        }
    }

    async loadTransferHistory(user: User) {
        try {
            const transferHistory = await user.getTransferHistory();
            if (!transferHistory) {
                console.error('Transfer History not available');
                return null;
            }
            this.setState({ transferHistory });
            return transferHistory;
        } catch (error) {
            console.error('Error fetching transfer history:', error);
            return null;
        }
    }

    async loadAccounts(user: User) {
        try {
            const accounts = await User.getAccountsByID(user.getId());
            if (!accounts) {
                console.error('User Accounts not available');
                return null;
            }
            this.setState({ accounts });
            return accounts;
        }
        catch (error) {
            console.error('Error fetching user accounts:', error);
            return null;
        }
    }

    async loadContacts(user: User) {
        try {
            const contacts = [];
            for (const contactID of user.getContacts()) {
                const contact = await User.getContactByID(contactID); 
                if(!contact) return null;
                const accounts = await User.getAccountsByID(contactID); 
                if(!accounts) return null
                contacts.push({ contact, accounts });
            } 
            this.setState({ contacts });
            return contacts;
        }
        catch (error) {
            console.error('Error fetching user accounts:', error);
            return null;
        } 
    }

    async loadUserData() {
        // Obtiene y valida el usuario
        const currentUser = await this.loadUser();
        if (!currentUser) return null;
        const userTransferHistory = await this.loadTransferHistory(currentUser);
        const userAccounts = await this.loadAccounts(currentUser);
        const userContacts = await this.loadContacts(currentUser);
        this.setState({
            user: currentUser,
            transferHistory: userTransferHistory ?? [],
            accounts: userAccounts ?? [],
            contacts: userContacts ?? [],
            isLoadingUser: false, // La carga del usuario ha finalizado
        });
    }

    getUser = () => this.state.user;
    getTransferHistory = () => this.state.transferHistory;
    getAccounts = () => this.state.accounts;
    getContacts = () => this.state.contacts;

    toggleSwitch = () => this.setState((prevState) => ({ isEnabled: !prevState.isEnabled }));

    translateNumber = (number: number) => {
        if (this.state.isEnabled)
            return { integerNumber: "**.****", decimalNumber: "**" };
        else {
            const integerAmount = Math.floor(number);
            const decimalAmount = (number - integerAmount).toFixed(2).split(".")[1];
            return { integerNumber: integerAmount, decimalNumber: decimalAmount };
        }
    };

    render() {
        return (
            <UserContext.Provider
                value={{
                    isEnabled: this.state.isEnabled,
                    toggleSwitch: this.toggleSwitch,
                    translateNumber: this.translateNumber,
                    getUser: this.getUser,
                    getTransferHistory: this.getTransferHistory,
                    getAccounts: this.getAccounts,
                    getContacts: this.getContacts,
                }}
            >
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserProvider;