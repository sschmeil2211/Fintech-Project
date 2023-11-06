/**
 * Contiene pruebas unitarias para el controlador "AppController".
 * Utiliza el Framework jest para realizar pruebas en el método "getHello()" del controlador
 * 
 * Pruebas unitarias para verificar si el método "getHello()" devuelve "Hello World!"  
 */

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
