import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, ValidationPipe, UsePipes, Put } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createEventoDto: CreateEventoDto) {
    const evento = await this.eventosService.create(createEventoDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Evento creado exitosamente',
      data: evento,
    };
  }

  @Get()
  async findAll() {
    const eventos = await this.eventosService.findAll();
    return {
      statusCode: HttpStatus.OK,
      data: eventos,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const evento = await this.eventosService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      data: evento,
    };
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventoDto: UpdateEventoDto,
  ) {
    const eventoActualizado = await this.eventosService.update(id, updateEventoDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Evento actualizado exitosamente',
      data: eventoActualizado,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.eventosService.remove(id);
  }
}