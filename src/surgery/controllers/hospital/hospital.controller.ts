import { Body, Controller, Delete, Get, HttpException, NotFoundException, Param, ParseUUIDPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Observable } from 'rxjs';
import { errors } from 'src/surgery/constants/constants';
import { HospitalDto } from 'src/surgery/dto/hospital/hospital.dto';
import { HospitalPatchDto } from 'src/surgery/dto/hospital/hospitalPatch.dto';
import { JwtGuard } from 'src/surgery/guards/jwt.guard';
import { RolesGuard } from 'src/surgery/guards/roles.guard';
import { Hospital } from 'src/surgery/models/hospital.interface';
import { HospitalService } from 'src/surgery/services/hospital/hospital.service';

@Controller({version: '1'})
export class HospitalController {
    constructor(private hospitalService: HospitalService) {}

    @Post('hospital')
    async createHospital(@Body() hospital: HospitalDto): Promise<Hospital> {
        return await this.hospitalService.createHospital(hospital);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Get('hospitals')
    findAll(): Observable<Hospital[]> {
        return this.hospitalService.getHospitalsList();
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Get('hospital/:id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Hospital> {
        const hospital = await this.hospitalService.getHospital(id);
        if(!hospital){
            throw new NotFoundException(errors.existHospital);
        }
        return hospital;
    }

    @Patch('hospital/:id')
    @UsePipes(new ValidationPipe())
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() hospital: HospitalPatchDto
    ): Promise<Hospital> {
        const hospitalToUpdate = await this.hospitalService.getHospital(id);
        if(!hospitalToUpdate){
            throw new NotFoundException(errors.existHospital);
        }
        await this.hospitalService.updateHospital(id, hospital);
        return await this.hospitalService.getHospital(id);
    }

    @Delete('hospital/:id')
    async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<Hospital> {
        const hospitalToUpdate = await this.hospitalService.getHospital(id);
        if(!hospitalToUpdate){
            throw new NotFoundException(errors.existHospital);
        } else {
            await this.hospitalService.deleteHospital(id);
            throw new HttpException(errors.removed, errors.noContent);
        }
    }

}
