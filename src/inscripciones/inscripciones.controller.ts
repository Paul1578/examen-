import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UpdateInscripcioneDto } from './dto/update-inscripcione.dto';
import { ParticipantesService } from '../participantes/participantes.service';
import { EventosService } from '../eventos/eventos.service';
import { InscripcionesService } from './inscripciones.service';
import { CreateInscripcionDto } from './dto/create-inscripcione.dto';
import { EventoExistsPipe } from 'src/common/pipes/validate-entity-exists/evento-exists.pipe';
import { ParticipanteExistsPipe } from 'src/common/pipes/validate-entity-exists/participante-exists.pipe';

@Controller('inscripciones')
export class InscripcionesController {
    constructor(
        private readonly inscripcionesService: InscripcionesService,
    ) { }

    @Post()
    @UsePipes(
        new ValidationPipe(),
        EventoExistsPipe,
        ParticipanteExistsPipe,
    )
    async create(@Body() createInscripcionDto: CreateInscripcionDto) {
        const inscripcion = await this.inscripcionesService.create(createInscripcionDto);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Inscripción creada exitosamente',
            data: inscripcion,
        };
    }

    @Get()
    async findAll() {
        const inscripciones = await this.inscripcionesService.findAll();
        return {
            statusCode: HttpStatus.OK,
            data: inscripciones,
        };
    }

    @Get(':eventoId/:participanteId')
    async findOne(
        @Param('eventoId') eventoId: string,
        @Param('participanteId') participanteId: string,
    ) {
        const inscripcion = await this.inscripcionesService.findOne(
            parseInt(eventoId, 10),
            parseInt(participanteId, 10),
        );
        return {
            statusCode: HttpStatus.OK,
            data: inscripcion,
        };
    }

    @Put(':eventoId/:participanteId')
    @UsePipes(
        new ValidationPipe(),
        EventoExistsPipe,
        ParticipanteExistsPipe,
    )
    async update(
        @Param('eventoId') eventoId: string,
        @Param('participanteId') participanteId: string,
        @Body() updateInscripcionDto: UpdateInscripcioneDto,
    ) {
        const inscripcionActualizada = await this.inscripcionesService.update(
            parseInt(eventoId, 10),
            parseInt(participanteId, 10),
            updateInscripcionDto,
        );
        return {
            statusCode: HttpStatus.OK,
            message: 'Inscripción actualizada exitosamente',
            data: inscripcionActualizada,
        };
    }

    @Delete(':eventoId/:participanteId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @Param('eventoId') eventoId: string,
        @Param('participanteId') participanteId: string,
    ) {
        await this.inscripcionesService.remove(parseInt(eventoId, 10), parseInt(participanteId, 10));
    }
}
