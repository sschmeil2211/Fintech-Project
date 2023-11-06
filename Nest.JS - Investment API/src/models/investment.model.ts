/**
 * Define un modelo de datos: InvestmentModel. Representa las propiedades de una inversión.
 * Enumera también los tipos posibles de inversiones
 * 
 * InvestmentModel -> Define las propiedades de una inversion: Tipo, Nombre, Saldo Inicial, Eficienicia Anual, Riesgo y Descripcion
 * 
 * InvestmentType -> Cripto, Bienes Raices, Divisas, Acciones de bolsa
 */

export enum InvestmentType {
    CRYPTO,
    ESTATE,
    FOREIGN_EXCHANGE,
    SHARES_OF_STOCK,
}

export class InvestmentModel { 
    type: InvestmentType;
    investmentName: string;
    initialBalance: number;
    efficiency: number;
    risk: number;
    description: string | null;
}