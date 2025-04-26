import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, ValidationPipe, UsePipes, Put } from '@nestjs/common';
import { ParticipantesService } from './participantes.service';
import { CreateParticipanteDto } from './dto/create-participante.dto';
import { UpdateParticipanteDto } from './dto/update-participante.dto';

@Controller('participantes')
export class ParticipantesController {
  constructor(private readonly participantesService: ParticipantesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createParticipanteDto: CreateParticipanteDto) {
    const participante = await this.participantesService.create(createParticipanteDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Participante creado exitosamente',
      data: participante,
    };
  }

  @Get()
  async findAll() {
    const participantes = await this.participantesService.findAll();
    return {
      statusCode: HttpStatus.OK,
      data: participantes,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const participante = await this.participantesService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      data: participante,
    };
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParticipanteDto: UpdateParticipanteDto,
  ) {
    const participanteActualizado = await this.participantesService.update(
      id,
      updateParticipanteDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Participante actualizado exitosamente',
      data: participanteActualizado,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.participantesService.remove(id);
  }
}
