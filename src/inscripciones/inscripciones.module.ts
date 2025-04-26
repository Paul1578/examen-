import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InscripcionesService } from './inscripciones.service';
import { InscripcionesController } from './inscripciones.controller';
import { Inscripcion } from './entities/inscripcione.entity';

import { EventoExistsPipe } from 'src/common/pipes/validate-entity-exists/evento-exists.pipe';
import { ParticipanteExistsPipe } from 'src/common/pipes/validate-entity-exists/participante-exists.pipe';

import { EventosModule } from 'src/eventos/eventos.module';
import { ParticipantesModule } from 'src/participantes/participantes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inscripcion]),
    EventosModule,
    ParticipantesModule,
  ],
  controllers: [InscripcionesController],
  providers: [
    InscripcionesService,
    EventoExistsPipe,
    ParticipanteExistsPipe,
  ],
})
export class InscripcionesModule {}
