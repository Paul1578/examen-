import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInscripcionDto {
  @IsNotEmpty()
  @IsNumber()
  eventoId: number;

  @IsNotEmpty()
  @IsNumber()
  participanteId: number;
}