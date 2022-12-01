import { HttpService } from '@nestjs/axios';
import { Injectable, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SurgeryExitDto } from '../dto/surgeryExit.dto';
import { SurgeryEntity } from '../models/surgery.entity';
import { Surgery } from '../models/surgery.interface';

@Injectable()
export class SurgeryService {
    constructor(
        @InjectRepository(SurgeryEntity)
        private readonly surgeryRepository: Repository<SurgeryEntity>,
        private http: HttpService
    ){}

    async createSurgery(surgery: Surgery): Promise<Surgery> {
        return this.surgeryRepository.save(surgery);
    }

    getSurgeryList(): Observable<Surgery[]> {
        return from(this.surgeryRepository.find());
    }

    async getSurgerybyPatient(id: string): Promise<Surgery> {
        return this.surgeryRepository.findOne({ patientId: id });
    }

    async getSurgery(id: string): Promise<SurgeryExitDto> {
        return this.surgeryRepository.findOne(id);
    }

    async updateSurgery(id: string, surgery: Surgery): Promise<UpdateResult> {
        return await this.surgeryRepository.update(id, surgery);
    }

    async deleteSurgery(id: string): Promise<DeleteResult> {
        return this.surgeryRepository.delete(id);
    }

    async validatePatient(surgery: Surgery, @Request() req): Promise<any> {
        return this.http.get('https://puente-solidaridad-patient.herokuapp.com/v1/patient/' + surgery.patientId, {
            headers: {
                'Authorization': req.headers.authorization,
            }  
        })
        .toPromise()
        .then(res => res.data)
        .catch(err => err); 
    }

    async validatePhysician(physicianId: string, @Request() req): Promise<any> {
        return this.http.get('https://puente-solidaridad-physician.herokuapp.com/v1/physician/' + physicianId, {
            headers: {
                'Authorization': req.headers.authorization,
            }  
        })
        .toPromise()
        .then(res => res.data)
        .catch(err => err); 
    }
}
