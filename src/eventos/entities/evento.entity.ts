import { Inscripcion } from 'src/inscripciones/entities/inscripcione.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class Evento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: 'timestamp' })
  fechaInicio: Date;

  @Column({ type: 'timestamp' })
  fechaFin: Date;

  @Column()
  ubicacion: string;

  @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.evento)
  inscripciones: Inscripcion[];
}
