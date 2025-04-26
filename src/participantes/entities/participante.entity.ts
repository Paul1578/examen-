import { Inscripcion } from 'src/inscripciones/entities/inscripcione.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class Participante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.participante)
  inscripciones: Inscripcion[];
}
