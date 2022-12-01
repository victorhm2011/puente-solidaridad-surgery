import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { ResponsibleEntity } from 'src/surgery/models/responsible/responsible.entity';
import { Responsible } from 'src/surgery/models/responsible/responsible.interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ResponsibleService {
    constructor(
        @InjectRepository(ResponsibleEntity)
        private readonly responsibleRepository: Repository<ResponsibleEntity>
    ){}

    async createResponsible(responsible: Responsible): Promise<Responsible> {
        return this.responsibleRepository.save(responsible);
    }

    getResponsibleList(): Observable<Responsible[]> {
        return from(this.responsibleRepository.find());
    }

    async getResponsible(id: string): Promise<Responsible> {
        return this.responsibleRepository.findOne(id);
    }

    async updateResponsible(id: string, responsible: Responsible): Promise<UpdateResult> {
        return this.responsibleRepository.update(id, responsible);
    }

    async deleteResponsible(id: string): Promise<DeleteResult> {
        return this.responsibleRepository.delete(id);
    }
}
