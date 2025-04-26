import { Injectable } from '@nestjs/common';
import { ParticipantesService } from 'src/participantes/participantes.service';
import { ValidateEntityExistsPipe } from './validate-entity-exists.pipe';

@Injectable()
export class ParticipanteExistsPipe extends ValidateEntityExistsPipe {
  constructor(participantesService: ParticipantesService) {
    super(participantesService, 'participanteId');
  }
}
