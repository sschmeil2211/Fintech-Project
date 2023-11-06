/**
 * Define el servicio "FirestoreService". Se utiliza apra interactuar con la base de datos de Firestore.
 * Contiene funciones para obtener todas las inversiones, agregar usuarios a una inversión y actuaizar los porcentajes de la inversion
 * 
 * getAllInvestments(): Obtiene todas las inversiones de Firestore
 * addUserToInvestment(): Agrega un user a una inversión y actualiza sus saldos
 * updateInvestmentPercent(): Actualiza los porcentajes de inversión de un user en una inversion específica
 */
import { Injectable } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';

@Injectable()
export class FirestoreService {
    private readonly firestore: Firestore;

    constructor() {
        this.firestore = new Firestore({
            projectId: 'brubankfirebase',
            keyFilename: './config/brubankfirebase-06dd245cfb72.json',
        });
    }

    async updateAllUserInvestments(date: Date) {
        try {
            // Obtener todos los usuarios
            const usersSnapshot = await this.firestore.collection("users").get();
    
            // Iterar sobre cada usuario
            for (const userDoc of usersSnapshot.docs) {
                const userId = userDoc.id;
                const userData = userDoc.data();
    
                // Verificar si el usuario tiene un mapa de inversiones (userInvestment)
                if (!userData.userInvestment) {
                    continue; // El usuario no tiene inversiones, pasar al siguiente usuario
                }
    
                // Obtener todas las inversiones del usuario
                const userInvestments = userData.userInvestment;
    
                // Obtener la fecha de la última actualización (si existe)
                const lastUpdateDate = userData.lastUpdateDate || null;
                const currentDate = date.toISOString().split("T")[0]; // Obtener la fecha actual en formato YYYY-MM-DD
    
                // Verificar si ya se ha realizado una actualización hoy
                if (lastUpdateDate === currentDate) {
                    continue; // Ya se realizó una actualización hoy, pasar al siguiente usuario
                }
    
                // Iterar sobre las inversiones del usuario
                for (const investmentId in userInvestments) {
                    let newInvestmentValue: number = userInvestments[investmentId]; // Inicializar con el valor actual
    
                    if (userInvestments.hasOwnProperty(investmentId)) {
                        const investmentValue = userInvestments[investmentId];
    
                        // Buscar la inversión correspondiente en la lista de inversiones
                        const investmentRef = this.firestore.collection("investments").doc(investmentId);
                        const investmentDoc = await investmentRef.get();
    
                        // Verificar si se encontró la inversión
                        if (investmentDoc.exists) {
                            const investmentData = investmentDoc.data();
    
                            // Verificar si la inversión tiene un mapa de porcentajes (percents)
                            if (investmentData.percents) {
                                const percents = Object.entries(investmentData.percents);
                                let percentage = 0;
    
                                // Verificar si la inversión tiene un porcentaje válido para el día actual
                                for (let i = percents.length - 1; i >= 0; i--) {
                                    const [date, percent] = percents[i];
                                    if (date <= currentDate) {
                                        percentage = percent as number;
                                        break; // Salir del bucle cuando se encuentre la primera fecha menor o igual
                                    }
                                } 
                                newInvestmentValue += investmentValue * percentage / 100;
                            }
                        }
    
                        // Actualizar el valor de la inversión en el mapa del usuario
                        userInvestments[investmentId] = newInvestmentValue;
                    }
                }
    
                // Actualizar la fecha de la última actualización en los datos del usuario
                await userDoc.ref.update({
                    userInvestment: userInvestments,
                    lastUpdateDate: currentDate, // Actualizar la fecha de la última actualización
                });
            }
            console.log("Todas las inversiones de todos los usuarios se han actualizado correctamente");
        } catch (error) {
            console.error("Error al actualizar las inversiones de los usuarios:", error);
            throw new Error("Error al actualizar las inversiones de los usuarios");
        }
    }

    async addUserToInvestment(investmentId: string, userId: string, investmentValue: number) {
        const userRef = this.firestore.collection('users').doc(userId);
        const investmentRef = this.firestore.collection('investments').doc(investmentId);
        try {
            const userData = ((await userRef.get()).data()).userInvestment ?? {};
            const investmentData = ((await investmentRef.get()).data()).users ?? [];
            if (userData.hasOwnProperty(investmentId) && investmentData.hasOwnProperty(userId)) {
                userData[investmentId] += investmentValue; 
            }
            else {
                userData[investmentId] = investmentValue;
                investmentData.push(userId);
            }
            await userRef.update({ userInvestment: userData });
            await investmentRef.update({ users: investmentData });
            console.log("Campo actualizado correctamente");
        } catch (error) {
            throw new Error('Error al actualizar el campo de inversiones del usuario: ' + error.message);
        }
    }

    async addRandomProfitToUserInvestment(investmentId: string, userId: string, newProfit: number) {
        try {
            // Construye las referencias a las colecciones y documentos necesarios
            const investmentRef = this.firestore.collection('investments').doc(investmentId);
            const userRef = this.firestore.collection('users').doc(userId);
            const userInvestmentQuery = this.firestore.collection('userInvestments')
                .where('investmentRef', '==', investmentRef)
                .where('userRef', '==', userRef);

            // Realiza la consulta para encontrar el documento de userInvestments
            const userInvestmentSnapshot = await userInvestmentQuery.get();

            if (!userInvestmentSnapshot.empty) {
                // Obtiene el primer documento (debería ser único debido a la consulta)
                const userInvestmentDoc = userInvestmentSnapshot.docs[0];
                const userInvestmentData = userInvestmentDoc.data();

                /* // Calcula el nuevo valor de "profits" sumando el número aleatorio
                const newProfits = (userInvestmentData.profits || 0) + newProfit; */

                // Actualiza el campo "profits" en el documento de userInvestments
                await userInvestmentDoc.ref.update({ profits: newProfit });

                return { message: 'Número aleatorio agregado exitosamente al documento de userInvestments' };
            } else {
                throw new Error('El documento de userInvestments no existe para la inversión y el usuario especificados');
            }
        } catch (error) {
            throw new Error('Error al agregar el número aleatorio: ' + error.message);
        }
    }
    
    /*async createInvestment(investmentId: string, newInvestmentData: any) {
        try {
            const investmentRef = this.firestore.collection('investments').doc(investmentId);
            await investmentRef.set(newInvestmentData); // Utiliza set en lugar de setDoc 
            console.log("Inversión agregada correctamente");
        } catch (error) {
            throw new Error('Error al crear la inversión en Firestore');
        }
    } 

    async updateInvestmentPercent(investmentId: string, percents: any) {
        const investmentRef = this.firestore.collection('investments').doc(investmentId);
        try {
            console.log(investmentRef);
            // Actualizar el campo percent en el documento de inversión
            await investmentRef.update({ percents: percents });
        } catch (error) {
            throw new Error('Error al actualizar el campo percent en el documento de inversión: ' + error.message);
        }
    }

    async getAllInvestments() {
        const investmentsCollection = this.firestore.collection('investments');
        const snapshot = await investmentsCollection.get();
        const investments = [];
        snapshot.forEach((doc) => {
            const investmentData = doc.data();
            const investmentWithID = { id: doc.id, ...investmentData };
            investments.push(investmentWithID);
        });
        return investments;
    } 

    async getAllUserInvestments(userId: string) {
        const investments = [];
        try {
            const userRef = this.firestore.collection('users').doc(userId);
            const userInvestments = (await userRef.get()).data().userInvestment;

            console.log(userInvestments);

            // Recorre las claves (IDs de inversiones) en el mapa userInvestments
            for (const investmentId in userInvestments) {
                if (userInvestments.hasOwnProperty(investmentId)) {
                    // Crea una referencia al documento de inversión utilizando el ID
                    const investmentRef = this.firestore.collection('investments').doc(investmentId);
                    const investmentData = (await investmentRef.get()).data();
                    investments.push(investmentData);
                }
            }
            console.log(investments);
            return investments;
        } catch (error) {
            throw new Error('No se encontraron inversiones');
        }
    }

    async withdrawMoney(investmentId: string, userId: string, withdrawalAmount: number, withdrawalDate: Date) {
        try {
            const investmentRef = this.firestore.collection('investments').doc(investmentId);
            const userRef = this.firestore.collection('users').doc(userId);
            const [investmentSnapshot, userSnapshot] = await Promise.all([
                investmentRef.get(),
                userRef.get()
            ]);
            if (!investmentSnapshot.exists || !userSnapshot.exists)
                throw new Error("No se encontraron los docs");

            const investmentData = (investmentSnapshot.data()).userInvestment;
            const userData = (userSnapshot.data()).userInvestment;
            
            const investmentDate = new Date(investmentData.creationDate);
            if (withdrawalDate < investmentDate
            throw new Error('La fecha de retiro debe ser posterior a la fecha de inversión');
            

            console.log(investmentData);
            const amount = investmentData[userId] - withdrawalAmount;
            if (amount < 0)
                throw new Error('Saldo insuficiente');
            userData[investmentId] = amount; 

            await userRef.update({ userInvestment: userData }); 
            return { message: "Retiro exitoso", amount }
        } catch (error) {
            throw new Error('Error retirar el dinero: ' + error.message);
        }
    }*/
}