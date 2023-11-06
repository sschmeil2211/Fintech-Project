import firestore from '@react-native-firebase/firestore';

export interface TransferData {
    senderId: string;
    receiverId: string;
    amount: number;
    reason: string;
    message: string;
    timestamp: string;
}

class Transfer {
    private senderId: string;
    private receiverId: string;
    private amount: number;
    private reason: string;
    private message: string;
    private timestamp: string;

    constructor(data: TransferData) {
        this.senderId = data.senderId;
        this.receiverId = data.receiverId;
        this.amount = data.amount;
        this.reason = data.reason;
        this.message = data.message;
        this.timestamp = data.timestamp;
    }

    async saveTransfer() {
        try {
            await firestore().collection('transfers').add({
                senderId: this.senderId,
                receiverId: this.receiverId,
                amount: this.amount,
                reason: this.reason,
                message: this.message,
                timestamp: this.timestamp,
            });
            console.log('Transfer saved successfully');
        } catch (error) {
            console.error('Error saving transfer:', error);
            throw error;
        }
    } 
}

export default Transfer;