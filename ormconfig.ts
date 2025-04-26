import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Evento } from 'src/eventos/entities/evento.entity';
import { Inscripcion } from 'src/inscripciones/entities/inscripcione.entity';
import { Participante } from 'src/participantes/entities/participante.entity';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin123',
  database: 'examen',
  entities: [Evento, Participante, Inscripcion],
  synchronize: true,
  autoLoadEntities: true,
};

export default config;
