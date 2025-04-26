import { Injectable } from '@nestjs/common';
import { EventosService } from 'src/eventos/eventos.service';
import { ValidateEntityExistsPipe } from './validate-entity-exists.pipe';

@Injectable()
export class EventoExistsPipe extends ValidateEntityExistsPipe {
  constructor(eventosService: EventosService) {
    super(eventosService, 'eventoId');
  }
}
