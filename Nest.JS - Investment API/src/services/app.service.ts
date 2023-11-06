/**
 * Define el servicio "AppService", proporciona la funcion "getHello()" para obtener el "HelloWorld!"
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
