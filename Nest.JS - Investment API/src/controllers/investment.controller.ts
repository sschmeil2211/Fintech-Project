/**
 *Este archivo define el controlador "InvestmentController" que maneja las solicitudes HTTP relacionadas con las inversiones.
 *Contiene métodos para obtener todas las inversiones y seleccionar una inversión específica
 *
 * getAllInvestments(): maneja las solicitudes GET para obtener todas las inversiones disponibles
 * selectInvestment(): maneja las solicitudes PUT para seleccionar una inversion específica y agregar o actualizar la inversión de un usuario
 */

import { Controller, Get, Param, Body, Put, Post } from '@nestjs/common';
import { FirestoreService } from 'src/services/firestore.service';
import { InvestmentService } from 'src/services/investment.service';

@Controller('api/investment')
export class InvestmentController {
    constructor(
        private readonly firestoreService: FirestoreService,
        private readonly investmentService: InvestmentService
    ) { }

    /*@Put(':id/select')
    async selectInvestment(
        @Param('id') investmentId: string,
        @Body() body: { userId: string, investmentValue: number }
    ) {
        // Obtener el investmentId, el userId y el investmentValue del cuerpo de la solicitud
        const { userId, investmentValue } = body;
        const id = String(investmentId);
        // Lógica para agregar o actualizar la inversión del usuario
        await this.firestoreService.addUserToInvestment(id, userId, investmentValue);

        return { message: 'Usuario agregado a la inversión exitosamente' };
    }

     @Get()
    async getAllInvestments() {
        const investments = await this.firestoreService.getAllInvestments();
        return investments;
    } 

    @Get('/user/:id')
    async getUserInvestment(
        @Param('id') userId: string,
    ) {
        const investments = await this.firestoreService.getAllUserInvestments(userId);
        return investments;
    }

    @Post(':id/withdraw')
    async withdraw(
        @Param('id') investmentId: string,
        @Body() body: { userId: string, withdrawalAmount: number, withdrawalDate: Date }
    ) {
        // Obtener el investmentId, userId, withdrawalAmount y withdrawalDate del cuerpo de la solicitud
        const { userId, withdrawalAmount, withdrawalDate } = body;
        const id = String(investmentId);
        // Lógica para retirar dinero de la inversión
        const result = await this.firestoreService.withdrawMoney(id, userId, withdrawalAmount, withdrawalDate);
        return { message: result.message, amount: result.amount };
    }

    @Post()
    async createInvestment(@Body() body: any) {
        try {
            // Aquí debes validar y procesar los datos recibidos en el cuerpo de la solicitud (body).
            // Puedes acceder a los campos como body.type, body.name, etc.
            // Luego, utiliza estos datos para crear una nueva inversión en Firestore.

            // Ejemplo de creación de una inversión 
            const newInvestment = {
                type: body.type,
                name: body.name,
                description: body.description,
                expectedEfficiency: body.expectedEfficiency,
                errorRange: body.errorRange,
                fluctuations: body.fluctuations,
                randomizer: body.randomizer,
                initialBalance: body.initialBalance,
                users: [], // Puedes inicializar el mapa de usuarios/inversiones vacío
                percents: {}
            };
            const id = String(body.id);
            // Luego, llama a una función de servicio para agregar esta inversión a Firestore.
            // Por ejemplo: 
            const result = await this.firestoreService.createInvestment(id, newInvestment);

            await this.investmentService.setPercentsInvestment(body.expectedEfficiency, body.errorRange, body.fluctuations, body.randomizer, id);

            return { message: 'Inversión creada exitosamente', data: result };
        } catch (error) {
            console.error('Error al crear la inversión:', error);
            throw new Error('Error al crear la inversión');
        }
    } */
}