nstrucciones para Ejecutar Localmente
Clona el repositorio:

git clone <UR
L del repositorio>
cd <nombre del repositorio>

Instala las dependencias:

npm install

Configura la base de datos:

Crea una base de datos en tu sistema (por ejemplo, PostgreSQL, MySQL).

Copia el archivo ormconfig.ts.example a ormconfig.ts y actualiza los parámetros de conexión con los de tu base de datos.

Ejecuta las migraciones (si es necesario):

npm run typeorm:migrate

Ejecuta la aplicación:

npm run start:dev

La API estará disponible en http://localhost:3000.

Endpoints de la API
Eventos
POST /eventos: Crea un nuevo evento.

GET /eventos: Obtiene todos los eventos.

GET /eventos/:id: Obtiene un evento por su ID.

PUT /eventos/:id: Actualiza un evento existente.

DELETE /eventos/:id: Elimina un evento.

Participantes
POST /participantes: Crea un nuevo participante.

GET /participantes: Obtiene todos los participantes.

GET /participantes/:id: Obtiene un participante por su ID.

PUT /participantes/:id: Actualiza un participante existente.

DELETE /participantes/:id: Elimina un participante.

Inscripciones
POST /inscripciones: Crea una nueva inscripción de un participante a un evento.

GET /inscripciones: Obtiene todas las inscripciones.

GET /inscripciones/:eventoId/:participanteId: Obtiene una inscripción específica.

PUT /inscripciones/:eventoId/:participanteId: Actualiza una inscripción existente.

DELETE /inscripciones/:eventoId/:participanteId: Elimina una inscripción.