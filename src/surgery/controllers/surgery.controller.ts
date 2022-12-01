import { Body, Controller, Delete, Get, HttpException, Param, Request, ParseUUIDPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe, NotFoundException, Inject, Query, BadRequestException } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { Roles } from '../decorators/roles.decorator';
import { SurgeryEntryDto } from '../dto/surgeryEntry.dto';
import { SurgeryExitDto } from '../dto/surgeryExit.dto';
import { SurgeryPatchDto } from '../dto/surgeryPatch.dto';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '../models/role.enum';
import { Surgery } from '../models/surgery.interface';
import { SurgeryService } from '../services/surgery.service';
import { errors } from '../constants/constants';
import { ClientProxy } from '@nestjs/microservices';
import { HospitalService } from '../services/hospital/hospital.service';
import { ResponsibleService } from '../services/responsible/responsible.service';

@Controller({version: '1'})
export class SurgeryController {
    constructor(private surgeryService: SurgeryService, @Inject('SURGERY_SERVICE') private readonly client: ClientProxy, private hospitalService: HospitalService,
    private responsibleService: ResponsibleService) {}

    @UseGuards(RolesGuard)
    @Post('surgery')
    @UsePipes(new ValidationPipe())
    async create(@Body() surgery: SurgeryEntryDto, @Request() req): Promise<any> {
        const patient = await this.surgeryService.validatePatient(surgery, req);
        const physicianFollow = await this.surgeryService.validatePhysician(surgery.physicianFollowId, req);
        const physicianSurgery = await this.surgeryService.validatePhysician(surgery.physicianSurgeryId, req);
        const hospital = await this.hospitalService.getHospital(surgery.hospitalId);
        const responsible = await this.responsibleService.getResponsible(surgery.responsibleId);
        const hospitalFollow = await this.hospitalService.getHospital(surgery.hospitalFollowId);
        if(!patient.patientId){
            throw new NotFoundException(errors.existPatient);
        }
        if(!physicianFollow.id){
            throw new NotFoundException(errors.existPhysician);
        }
        if(!physicianSurgery.id){
            throw new NotFoundException(errors.existPhysician);
        }
        if(!hospital){
            throw new NotFoundException(errors.existHospital);
        }
        if(!responsible){
            throw new NotFoundException(errors.existResponsible);
        }
        if(!hospitalFollow && surgery.hospitalFollowId){
            throw new NotFoundException(errors.existHospital);
        }
        return await this.surgeryService.createSurgery(surgery);
    }

    @Get('surgerys')
    findAll( @Request() req): Observable<Surgery[]> {
        return this.surgeryService.getSurgeryList();
    }

    @Get('surgery/:id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<SurgeryExitDto> {
        const surgery = await this.surgeryService.getSurgery(id);
        if(!surgery){
            throw new NotFoundException(errors.exist);
        }
        return surgery;
    }

    @Get('patient/:id/surgery')
    async getSurgeryByPatientPatient(@Param('id', new ParseUUIDPipe()) id: string, @Request() req): Promise<any> {
        const surgery = await this.surgeryService.getSurgerybyPatient(id);
        if(!surgery){
            throw new NotFoundException(errors.exist);
        }
        return surgery;
    }

    @Get('patient/:id/surgeries')
    async getSurgerybyPatient(@Param('id', new ParseUUIDPipe()) id: string): Promise<any> {
        return await this.surgeryService.getSurgerybyPatient(id);
    }

    @Get('surgeriesByDate')
    async surgeriesByDate(@Query('start') start: Date, @Query('end') end: Date): Promise<any> {
        if(start <= end){
            const resp = await this.client.send('surgeriesByDate', {start, end});
            return resp;
        } else {
            throw new BadRequestException(errors.badDates);
        }
    }

    @Patch('surgery/:id')
    @UsePipes(new ValidationPipe())
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() surgery: SurgeryPatchDto,
        @Request() req
    ): Promise<SurgeryExitDto> {
        const surgeryToUpdate = await this.surgeryService.getSurgery(id);
        const patient = await this.surgeryService.validatePatient(surgery, req);
        const physicianFollow = await this.surgeryService.validatePhysician(surgery.physicianFollowId, req);
        const physicianSurgery = await this.surgeryService.validatePhysician(surgery.physicianSurgeryId, req);
        const hospital = await this.hospitalService.getHospital(surgery.hospitalId);
        const hospitalFollow = await this.hospitalService.getHospital(surgery.hospitalFollowId);
        const responsible = await this.responsibleService.getResponsible(surgery.responsibleId);
        if(!surgeryToUpdate){
            throw new NotFoundException(errors.exist);
        }
        if(!patient.patientId && surgery.patientId){
            throw new NotFoundException(errors.existPatient);
        }
        if(!physicianFollow.id && surgery.physicianFollowId){
            throw new NotFoundException(errors.existPhysician);
        }
        if(!physicianSurgery.id && surgery.physicianSurgeryId){
            throw new NotFoundException(errors.existPhysician);
        }
        if(!hospital && surgery.hospitalId){
            throw new NotFoundException(errors.existHospital);
        }
        if(!hospitalFollow && surgery.hospitalFollowId){
            throw new NotFoundException(errors.existHospital);
        }
        if(!responsible){
            throw new NotFoundException(errors.existResponsible);
        }
        await this.surgeryService.updateSurgery(id, surgery);
        return await this.surgeryService.getSurgery(id);
    }

    @UseGuards(RolesGuard)
    @Delete('surgery/:id')
    async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<SurgeryExitDto> {
        const surgeryToUpdate = await this.surgeryService.getSurgery(id);
        if(!surgeryToUpdate){
            throw new NotFoundException(errors.exist);
        } else {
            await this.surgeryService.deleteSurgery(id);
            throw new HttpException(errors.removed, errors.noContent);
        }
    }
}
