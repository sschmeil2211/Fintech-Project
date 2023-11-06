/**
 * Punto de entrada de la aplicación. Se utiliza para inicializar el servidor Nest.js.
 * Habilita el soporte CORS (Cross-Origin Resource Sharing) para permitir solicitudes desde una ubicación específica
 * 
 * origin: 'http://192.168.0.60:3000'
 * port: 3000
 * 
 * bootstrap(): inicia la aplicacion de Nest.js, configura las opciones de CORS y escucha en el puerto 3000.
 * Maneja el Hot Module Replacement
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3001', // Reemplaza con la URL de tu aplicación React.js
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Habilita las cookies de origen cruzado si es necesario
  };
  app.enableCors(corsOptions);
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();