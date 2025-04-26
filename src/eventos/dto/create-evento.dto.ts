import { IsNotEmpty, IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  fechaInicio: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  fechaFin: Date;

  @IsNotEmpty()
  @IsString()
  ubicacion: string;
}