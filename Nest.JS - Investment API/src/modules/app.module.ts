/**
 * Define el módulo principal de la aplicacion, "AppModule", que importa y configura otros módulos, controladores y servicios utilziados en la app
 * 
 * Configura modules, controllers y services
 */

import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { InvestmentController } from 'src/controllers/investment.controller';
import { FirestoreModule } from './firestore.module';
import { ScheduleModule  } from '@nestjs/schedule';
import { InvestmentService } from 'src/services/investment.service';

@Module({
  imports: [FirestoreModule, ScheduleModule.forRoot()],
  controllers: [AppController, InvestmentController],
  providers: [AppService, InvestmentService],
})
export class AppModule { }
