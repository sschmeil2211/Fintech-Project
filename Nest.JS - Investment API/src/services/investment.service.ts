/**
 * Define el servicio "InvestmentService". Realiza cálculos relacionados con las inversiones.
 * Utiliza el servicio FirestoreSErvice para actualizar las ganancias de inversión
 * 
 * maxIterations: el número máximo de iteraciones para encontrar una solución al problema = 2^32
 * monthlyFluctuations(): genera fluctuaciones mensuales aleatorias
 * randomFactor(): aplica un factor de aleatoriedad a la lista de porcentajes que PISA los de la solucion final
 * annualPercents(): calcula los porcentajes de inversión en un año
 * updatePercents(): actualiza los porcentajes de ganancias/perdidas utilizando los porcentajes calculados
 */
import { Injectable } from '@nestjs/common';
import { FirestoreService } from './firestore.service'; // Importa el servicio de Firestore que ya tienes 
import { Interval } from '@nestjs/schedule';

@Injectable()
export class InvestmentService {
    constructor(private readonly firestoreService: FirestoreService) { }

    /* private maxIterations = Math.pow(2, 32); //4.294.967.296 

    private monthlyFluctuations = (fluctuation: number) => Array.from({ length: 12 }, () => Math.random() * (fluctuation * 2) - fluctuation);

    private randomFactor(profitList: any, randomizer: number) {
        for (let i = 0; i < profitList.length; i++)
            if (Math.random() <= randomizer) {
                // Reemplazo un número al azar de la lista por un valor entre -100 y 100
                const index = Math.floor(Math.random() * 12); 
                profitList[index] = Math.random() * 200 - 100;
            }
    } 

    async annualPercents(expectedEff: number, errorRange: number, fluctuation: number, randomizer: number) {
        for (let i = 0; i < this.maxIterations; i++) {
            const randomNumbers = this.monthlyFluctuations(fluctuation);
            const sum = randomNumbers.reduce((acc, val) => acc + val, 0);
            if (Math.abs(sum - expectedEff) <= errorRange) {
                this.randomFactor(randomNumbers, randomizer);
                return randomNumbers;
            }
        }
        throw new Error(`No se encontró una solución válida después de ${this.maxIterations} iteraciones.`);
    }

    async setPercentsInvestment(expectedEff: number, errorRange: number, fluctuation: number, randomizer: number, investmentId: string) {
        try {
            const randomNumbers = await this.annualPercents(expectedEff, errorRange, fluctuation, randomizer)
            const percentsObject = {};

            // Genera un objeto donde la clave es el día y el valor es un arreglo de valores
            for (let i = 0; i < randomNumbers.length; i++) {
                const day = new Date();
                day.setMinutes(day.getMinutes() + i + 3); // Aumenta el día en 1 minuto por cada valor
                percentsObject[day.toISOString()] = randomNumbers[i];
            }

            await this.firestoreService.updateInvestmentPercent(investmentId, percentsObject);
            console.log("Valroes agregados correctamente");
        } catch (error) {
            console.error('Error al agregar el número aleatorio:', error);
        }
    }*/

    //@Interval(5000)
    async updateInvestmentValue(){
        try {
            const actualDate = new Date();
            await this.firestoreService.updateAllUserInvestments(actualDate);
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`);
        }
    }
}

/* const expecteEff = 10; //100% de rendimiento
const allowError = 0.1; //Se permite allowError >= expecteEff/100
const fluctuation = 1;//0.01; //Representa la estabilidad de la inversion. x < flutctuation < expectedEff/10
const factor = 0.01; //Hay un 1% de probabilidades de ue se genere un movimiento no planeado o externo
const initialValue = 1500; */