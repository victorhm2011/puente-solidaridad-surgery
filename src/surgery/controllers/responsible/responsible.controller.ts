import { Body, Controller, Delete, Get, HttpException, NotFoundException, Param, ParseUUIDPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Observable } from 'rxjs';
import { errors } from 'src/surgery/constants/constants';
import { ResponsibleDto } from 'src/surgery/dto/responsible/responsible.dto';
import { ResponsiblePatchDto } from 'src/surgery/dto/responsible/responsiblePatch.dto';
import { JwtGuard } from 'src/surgery/guards/jwt.guard';
import { RolesGuard } from 'src/surgery/guards/roles.guard';
import { Responsible } from 'src/surgery/models/responsible/responsible.interface';
import { ResponsibleService } from 'src/surgery/services/responsible/responsible.service';

@Controller({version: '1'})
export class ResponsibleController {
    constructor(private responsibleService: ResponsibleService) {}

    @Post('responsible')
    async createResponsible(@Body() responsible: ResponsibleDto): Promise<Responsible> {
        return await this.responsibleService.createResponsible(responsible);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Get('responsibles')
    findAll(): Observable<Responsible[]> {
        return this.responsibleService.getResponsibleList();
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Get('responsible/:id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Responsible> {
        const responsible = await this.responsibleService.getResponsible(id);
        if(!responsible){
            throw new NotFoundException(errors.existResponsible);
        }
        return responsible;
    }

    @Patch('responsible/:id')
    @UsePipes(new ValidationPipe())
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() responsible: ResponsiblePatchDto
    ): Promise<Responsible> {
        const responsibleToUpdate = await this.responsibleService.getResponsible(id);
        if(!responsibleToUpdate){
            throw new NotFoundException(errors.existResponsible);
        }
        await this.responsibleService.updateResponsible(id, responsible);
        return await this.responsibleService.getResponsible(id);
    }

    @Delete('responsible/:id')
    async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<Responsible> {
        const responsibleToDelete = await this.responsibleService.getResponsible(id);
        if(!responsibleToDelete){
            throw new NotFoundException(errors.existResponsible);
        } else {
            await this.responsibleService.deleteResponsible(id);
            throw new HttpException(errors.removedResponsible, errors.noContent);
        }
    }
}
