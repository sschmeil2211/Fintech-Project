/**
 * Define el módulo "FirestoreModule". Proporciona el servicio "FirestoreService" para interactuar con la base de datos Firestore
 * 
 */
import { Module } from '@nestjs/common';
import { FirestoreService } from '../services/firestore.service';

@Module({
    providers: [FirestoreService],
    exports: [FirestoreService],
})
export class FirestoreModule { }