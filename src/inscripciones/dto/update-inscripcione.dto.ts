import { PartialType } from '@nestjs/mapped-types';
import { CreateInscripcionDto } from './create-inscripcione.dto';


export class UpdateInscripcioneDto extends PartialType(CreateInscripcionDto) {}
