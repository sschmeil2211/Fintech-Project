import firestore from '@react-native-firebase/firestore';
import Auth from '../services/AuthService';
import Transfer, { TransferData } from './Transfer';

export interface UserData {
    id?: string;
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    genre?: string;
    dni?: string;
    cuilCuit?: string;
    birthdate?: string;
    nationality?: string;
    occupation?: string;
    civilStatus?: string;
    address?: string;
    addressNumber?: string;
    floorNumber?: string;
    apartmentNumber?: string;
    postalCode?: string;
    userColor?: string;
    balance?: number;
    pinCode?: string;
    contacts?: string[];
    userInvestment?: {};
}

class User {
    private id: string;
    private email: string;
    private phone: string;
    private firstName: string;
    private lastName: string;
    private genre: string;
    private dni: string;
    private cuilCuit: string;
    private birthdate: string;
    private nationality: string;
    private occupation: string;
    private civilStatus: string;
    private address: string;
    private addressNumber: string;
    private floorNumber: string;
    private apartmentNumber: string;
    private postalCode: string;
    private userColor: string;
    private balance: number;
    private pinCode: string;
    private contacts: string[];
    private userInvestment: {}

    constructor(data: UserData) {
        this.id = data.id ?? "";
        this.email = data.email ?? "";
        this.phone = data.phone ?? "";
        this.firstName = data.firstName ?? "";
        this.lastName = data.lastName ?? "";
        this.genre = data.genre ?? "";
        this.dni = data.dni ?? "";
        this.cuilCuit = data.cuilCuit ?? "";
        this.birthdate = data.birthdate ?? "";
        this.nationality = data.nationality ?? "";
        this.occupation = data.occupation ?? "";
        this.civilStatus = data.civilStatus ?? "";
        this.address = data.address ?? "";
        this.addressNumber = data.addressNumber ?? "";
        this.floorNumber = data.floorNumber ?? "";
        this.apartmentNumber = data.apartmentNumber ?? "";
        this.postalCode = data.postalCode ?? "";
        this.userColor = data.userColor ?? "";
        this.balance = data.balance ?? 0;
        this.pinCode = data.pinCode ?? "";
        this.contacts = data.contacts || [];
        this.userInvestment = data.userInvestment || {};
    }

    // Método para guardar un usuario en Firestore
    async saveUser(userData: UserData) {
        try {
            await firestore().collection('users').doc(this.id).set(userData);
            console.log('User saved successfully');
        } catch (error) {
            console.error('Error saving user:', error);
            throw error;
        }
    }

    // Método para obtener el usuario actual autenticado y sus datos de Firestore
    static async getUser() {
        try {
            const currentUser = Auth.getCurrentUser();
            if (!currentUser) return;
            const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
            if (userDoc.exists) {
                const userData = userDoc.data() as UserData;
                return new User(userData);
            }
        } catch (error) {
            console.error('Error getting current user:', error);
            throw error;
        }
    }

    static async getAccountsByID(userID: string) {
        try {
            const cvuSnapshot = await firestore()
                .collection('bankAccounts')
                .where('userRef', '==', firestore().collection('users').doc(userID))
                .get();
            const cvusAndBanks = [];
            for (const doc of cvuSnapshot.docs) {
                const cvuData = doc.data();
                const bankRef = cvuData.bankRef;
                const bankSnapshot = await bankRef.get();
                const bankData = bankSnapshot.data();
                cvusAndBanks.push({ cvu: cvuData.cvu, name: bankData.name });
            }
            return cvusAndBanks;
        } catch (error) {
            console.error('Error getting CVUs and banks:', error);
            throw error;
        }
    }

    static async getContactByID(userID: string) {
        try {
            const userDoc = await firestore().collection('users').doc(userID).get();
            if (userDoc.exists) {
                const userData = userDoc.data() as UserData;
                return new User(userData);
            }
        } catch (error) {
            console.error('Error getting current user:', error);
            throw error;
        }
    }

    // Método para actualizar un usuario en Firestore
    /*  async updateUser() {
         try {
             await firestore().collection('users').doc(this.id).update({
                 ownerID: this.ownerID,
                 email: this.email,
             });
             console.log('User updated successfully');
         } catch (error) {
             console.error('Error updating user:', error);
             throw error;
         }
     } */

    // Método para eliminar un usuario de Firestore por ID
    async deleteUser() {
        try {
            await firestore().collection('users').doc(this.id).delete();
            console.log('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    async getTransferHistory() {
        try {
            const transfersSnapshot = await firestore()
                .collection('transfers')
                .where('senderId', '==', this.id)
                .get();

            const receiverTransfersSnapshot = await firestore()
                .collection('transfers')
                .where('receiverId', '==', this.id)
                .get();

            const transferHistory = [];

            for (const doc of transfersSnapshot.docs) {
                const transferData = doc.data();
                const receiverUserDoc = await firestore()
                    .collection('users')
                    .doc(transferData.receiverId)
                    .get();

                const receiverUserData = receiverUserDoc.data();

                /* const receiverBankAccount = await BankAccount.getBankAccountsByUser(receiverUserData?.id);
                console.log(receiverBankAccount?.cvu); */


                transferHistory.push({
                    transferType: 'degress',
                    userName: receiverUserData?.firstName + ' ' + receiverUserData?.lastName,
                    date: transferData.timestamp,
                    userColor: receiverUserData?.userColor,
                    message: transferData.message,
                    reason: transferData.reason,
                    amount: transferData.amount,
                    cvu: "2",
                    bank: "APP",
                });
            }

            for (const doc of receiverTransfersSnapshot.docs) {
                const transferData = doc.data();
                const senderUserDoc = await firestore()
                    .collection('users')
                    .doc(transferData.senderId)
                    .get();

                const senderUserData = senderUserDoc.data();

                /* const bankAccount = new BankAccount({
                    cvu: senderUserData?.cvu,
                    bankRef: senderUserData?.bankRef,
                    userRef: senderUserData?.userRef,
                });
    
                const bankData = await bankAccount.getBankData(); */

                transferHistory.push({
                    transferType: 'ingress',
                    userName: senderUserData?.firstName + ' ' + senderUserData?.lastName,
                    date: transferData.timestamp,
                    userColor: senderUserData?.userColor,
                    message: transferData.message,
                    reason: transferData.reason,
                    amount: transferData.amount,
                    cvu: "1",
                    bank: "ICBC",
                });
            }

            return transferHistory;
        } catch (error) {
            console.error('Error getting transfer history:', error);
            throw error;
        }
    }

    async addContact(contact: string) {
        try {
            // Obtener el usuario actual
            const currentUser = await User.getUser();
            if (!currentUser) {
                console.error('User not found');
                return;
            }
            // Obtener la lista actual de CVUs del usuario (puede ser null si es la primera vez)
            const contactsList = currentUser.contacts || [];
            // Verificar si el CVU ya está en la lista
            if (!contactsList.includes(contact)) {
                // Agregar el nuevo CVU a la lista
                contactsList.push(contact);
                // Actualizar la lista de CVUs en Firestore
                await firestore().collection('users').doc(currentUser.id).update({ contacts: contactsList });
                console.log('CVU added successfully');
            }
            else
                console.log('CVU is already in the list');
        } catch (error) {
            console.error('Error adding CVU to user:', error);
            throw error;
        }
    }

    async transferMoneyByCVU(receiverCVU: string, amount: number, reason: string, message: string) {
        try {
            const senderCVU = this.id; // Implementa esta función para obtener el CVU del usuario actual
            const timestamp = firestore.Timestamp.now().toDate().toISOString();
            // Encontrar el destinatario por su CVU
            const receiverAccountSnapshot = await firestore()
                .collection('bankAccounts')
                .where('cvu', '==', receiverCVU)
                .get();
            if (receiverAccountSnapshot.empty)
                throw new Error('Receiver not found');
            const receiverAccountData = receiverAccountSnapshot.docs[0].data();
            const receiverBankRef = receiverAccountData.bankRef;
            const receiverUserRef = receiverAccountData.userRef;
            // Crear la transferencia
            const transferData: TransferData = {
                senderId: this.id,
                receiverId: receiverUserRef.id,
                amount,
                reason,
                message,
                timestamp,
            };
            const transfer = new Transfer(transferData);
            await transfer.saveTransfer();
            // Actualizar los saldos de los usuarios
            const senderNewBalance = this.balance - amount;
            await firestore().collection('users').doc(this.id).update({ balance: senderNewBalance });
            const receiverUserSnapshot = await receiverUserRef.get();
            if (!receiverUserSnapshot.exists)
                throw new Error('Receiver user not found');
            const receiverUserBalance = receiverUserSnapshot.data()?.balance || 0;
            const receiverNewBalance = receiverUserBalance + amount;
            await receiverUserRef.update({ balance: receiverNewBalance });
            await this.addContact(receiverUserRef.id);
            console.log('Money transferred successfully');
        } catch (error) {
            console.error('Error transferring money:', error);
            throw error;
        }
    }

    getId = () => this.id;
    getFirstName = () => this.firstName;
    getContacts = () => this.contacts;
    getBalance = () => this.balance;
    getUserInvestment = () => this.userInvestment;
}

export default User;
