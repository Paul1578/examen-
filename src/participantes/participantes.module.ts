import { Module } from '@nestjs/common';
import { ParticipantesService } from './participantes.service';
import { ParticipantesController } from './participantes.controller';
import { Participante } from './entities/participante.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Participante])],
  controllers: [ParticipantesController],
  providers: [ParticipantesService],
  exports: [ParticipantesService]
})
export class ParticipantesModule {}
