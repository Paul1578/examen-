import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Evento } from './entities/evento.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ) {}

  async create(createEventoDto: CreateEventoDto): Promise<Evento> {
    const evento = this.eventoRepository.create(createEventoDto);
    return this.eventoRepository.save(evento);
  }

  async findAll(): Promise<Evento[]> {
    return this.eventoRepository.find();
  }

  async findOne(id: number): Promise<Evento> {
    const evento = await this.eventoRepository.findOne({ where: { id } });
    if (!evento) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    }
    return evento;
  }

  async update(id: number, updateEventoDto: UpdateEventoDto): Promise<Evento> {
    const evento = await this.findOne(id);
    this.eventoRepository.merge(evento, updateEventoDto);
    return this.eventoRepository.save(evento);
  }

  async remove(id: number): Promise<void> {
    const evento = await this.findOne(id);
    await this.eventoRepository.remove(evento);
  }
}