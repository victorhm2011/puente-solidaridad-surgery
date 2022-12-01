import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { HospitalEntity } from 'src/surgery/models/hospital.entity';
import { Hospital } from 'src/surgery/models/hospital.interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class HospitalService {
    
    constructor(
        @InjectRepository(HospitalEntity)
        private readonly hospitalRepository: Repository<HospitalEntity>
    ){}

    async createHospital(hospital: Hospital): Promise<Hospital> {
        return this.hospitalRepository.save(hospital);
    }

    getHospitalsList(): Observable<Hospital[]> {
        return from(this.hospitalRepository.find());
    }

    async getHospital(id: string): Promise<Hospital> {
        return this.hospitalRepository.findOne(id);
    }

    async updateHospital(id: string, hospital: Hospital): Promise<UpdateResult> {
        return this.hospitalRepository.update(id, hospital);
    }

    async deleteHospital(id: string): Promise<DeleteResult> {
        return this.hospitalRepository.delete(id);
    }
}