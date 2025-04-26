import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosModule } from './eventos/eventos.module';
import { ParticipantesModule } from './participantes/participantes.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import config from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), EventosModule, ParticipantesModule, InscripcionesModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
