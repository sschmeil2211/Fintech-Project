import { collection, getDocs, doc } from 'firebase/firestore';
import { app } from '../FirebaseConfig'
import { getFirestore, deleteDoc, setDoc } from 'firebase/firestore';

const db = getFirestore(app); // Obtiene una instancia de Firestore usando la configuración de Firebase

// Método para obtener todos los documentos de la colección "investments"
export const getAllInvestments = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'investments'));
        const investments = []; 
        querySnapshot.forEach((doc) => investments.push({ id: doc.id, ...doc.data() })); 
        return investments;
    } catch (error) {
        console.error("Error al obtener inversiones: ", error);
        throw error;
    }
};

//Create method
export const createInvestment = async (id, data) => {
    try { 
        const investmentRef = doc(db, 'investments', id);
        await setDoc(investmentRef, data);
        console.log("Inversion agregada correctamente");
    } catch (error) {
        console.error("Error al crear un nuevo investment: ", error);
        throw error;
    }
}; 

export const deleteInvestment = async (id) => {
    try {
        await deleteDoc(doc(db, "investments", id));
        console.log("Inversion eliminada");
    } catch (error) {
        console.error("Error al eliminar la inversión: ", error);
        throw error;
    } 
};