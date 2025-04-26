import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inscripcion } from './entities/inscripcione.entity';
import { DataSource, Repository } from 'typeorm';
import { EventosService } from 'src/eventos/eventos.service';
import { ParticipantesService } from 'src/participantes/participantes.service';
import { CreateInscripcionDto } from './dto/create-inscripcione.dto';
import { UpdateInscripcioneDto } from './dto/update-inscripcione.dto';

@Injectable()
export class InscripcionesService {
  constructor(
    @InjectRepository(Inscripcion)
    private readonly inscripcionRepository: Repository<Inscripcion>,
    private readonly eventosService: EventosService, 
    private readonly participantesService: ParticipantesService,
    private readonly dataSource: DataSource,
  ) {
    console.log('EventosService', this.eventosService);
  }

  async create(createInscripcionDto: CreateInscripcionDto): Promise<Inscripcion> {
    const { eventoId, participanteId } = createInscripcionDto;
    const evento = await this.eventosService.findOne(eventoId);
    const participante = await this.participantesService.findOne(participanteId);

    const inscripcion = this.inscripcionRepository.create({ evento, participante });
    return this.dataSource.transaction(async (manager) => {
      return manager.save(inscripcion);
    });
  }

  async findAll(): Promise<Inscripcion[]> {
    return this.inscripcionRepository.find({ relations: ['evento', 'participante'] });
  }

  async findOne(eventoId: number, participanteId: number): Promise<Inscripcion> {
    const inscripcion = await this.inscripcionRepository.findOne({
      where: { evento: { id: eventoId }, participante: { id: participanteId } },
      relations: ['evento', 'participante'],
    });
    if (!inscripcion) {
      throw new NotFoundException(
        `Inscripción para evento ${eventoId} y participante ${participanteId} no encontrada`,
      );
    }
    return inscripcion;
  }

  async update(
    eventoId: number,
    participanteId: number,
    updateInscripcionDto: UpdateInscripcioneDto,
  ): Promise<Inscripcion> {
    const inscripcion = await this.findOne(eventoId, participanteId);
    this.inscripcionRepository.merge(inscripcion, updateInscripcionDto);
    return this.dataSource.transaction(async (manager) => {
      return manager.save(inscripcion);
    });
  }

  async remove(eventoId: number, participanteId: number): Promise<void> {
    const inscripcion = await this.findOne(eventoId, participanteId);
    await this.inscripcionRepository.remove(inscripcion);
  }
}
