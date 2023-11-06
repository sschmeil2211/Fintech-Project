import { View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { Background, Header, Card } from "../../components/common_components";
import { SquareButton, SectionCard } from "../../components/transfer_screen_components";
import { getInitialsName } from "../../../utils/utils";
import Helper from "./helper";
import { useUserProvider } from "../../../view_models/providers/UserProvider"; 
import styles from "./styles";
import BankAccount from "../../../models/BankAccount";

const TransferScreen = () => {

    const navigation = useNavigation();

    const user = useUserProvider().getUser();
    const userAccounts = useUserProvider().getAccounts();
    const contacts = useUserProvider().getContacts();

    const onPresNewTransfer = async (cvu) => {
        if (!cvu)
            navigation.navigate("SendTransferScreen", { contactToTransfer: null, contactBankToTransfer: null, contactCVU: null })
        else {
            const user = await BankAccount.getUserByCVU(cvu);
            const bank = await (await BankAccount.getBankAccountByCVU(cvu)).getBankDetails();
            navigation.navigate("SendTransferScreen", { contactToTransfer: user, contactBankToTransfer: bank, contactCVU: cvu })
        }
    };

    const UserCard = ({ user, accounts }) => (
        <SectionCard
            profileText={getInitialsName(`${user.firstName} ${user.lastName}`)}
            profileTextColor={user.userColor}
            cardTitle={`${user.firstName} ${user.lastName}`}
            cardDescription={`${accounts.length} Bancos`}
            cardType={"profile"}
        >
            {accounts.map((account, index) =>
                <View key={index} style={styles.banksContainer}>
                    <Card
                        circleSize={25}
                        cardTitle={account.name}
                        cardDescription={account.cvu}
                        source={Helper.getBankImages[account.name]}
                        circleType={"image"}
                        onPress={() => onPresNewTransfer(account.cvu)}
                    />
                </View>
            )}
        </SectionCard>
    );

    return (
        <Background>
            <Header iconColor={"#604AD9"} iconName={"search"} >
                <Icon name={"ellipsis-v"} size={18} color={"#604AD9"} />
            </Header>
            <View style={styles.buttonsRow}>
                {Helper.getbuttonsConfig.map((button, index) => <SquareButton key={index} {...button} onPress={() => onPresNewTransfer(null)} />)}
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Mis Cuentas</Text>
                {user && (<UserCard user={user} accounts={userAccounts} />)}
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Contactos</Text>
                {contacts.map((e, index) => <UserCard key={index} user={e.contact} accounts={e.accounts} />)}
            </View>
        </Background>
    );
};

export default TransferScreen;