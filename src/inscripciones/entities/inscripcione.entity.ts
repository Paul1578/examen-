import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Evento } from '../../eventos/entities/evento.entity';
import { Participante } from '../../participantes/entities/participante.entity';

@Entity()
export class Inscripcion {
  @PrimaryColumn()
  eventoId: number;

  @PrimaryColumn()
  participanteId: number;

  @ManyToOne(() => Evento, (evento) => evento.inscripciones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'eventoId' })
  evento: Evento;

  @ManyToOne(() => Participante, (participante) => participante.inscripciones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'participanteId' })
  participante: Participante;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaInscripcion: Date;

  @Column({ default: 'activo' })
  estado: string;
}
