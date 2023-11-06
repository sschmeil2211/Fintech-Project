/**
 * Define el "AppController". Maneja las solicitudes HTTP relacionadas con la app principal, en este
 * caso, el controlador tiene un método que devuelve "Hello World!"
 * 
 * "getHello()": se llama cuando se hace una solicitud GET a la raíz del servidor y devuelve "Hello World!"
 */

import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
