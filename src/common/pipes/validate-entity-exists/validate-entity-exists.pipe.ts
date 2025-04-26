import { PipeTransform,  Injectable,  ArgumentMetadata, NotFoundException, } from '@nestjs/common';;
import { EventosService } from 'src/eventos/eventos.service';
import { ParticipantesService } from 'src/participantes/participantes.service';


@Injectable()
export class ValidateEntityExistsPipe implements PipeTransform {
  constructor(
    private readonly service: EventosService | ParticipantesService,
    private readonly propertyName: string,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      return value; // Si el valor es undefined o null, pasa sin validar
    }

    const id = typeof value === 'object' ? value[this.propertyName] : value;

    if (id === undefined) {
      return value; // Si la propiedad no está en el objeto, pasa sin validar
    }

    try {
      const entity = await this.service.findOne(id);
      if (!entity) {
        throw new NotFoundException(
          `${
            this.propertyName.charAt(0).toUpperCase() + this.propertyName.slice(1, -2)
          } con ID ${id} no encontrado`,
        );
      }
      return value;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      return value; 
    }
  }
}