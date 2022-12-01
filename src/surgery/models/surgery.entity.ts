import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('surgery')
export class SurgeryEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: null})
    patientId: string;

    @Column({ default: null})
    physicianSurgeryId: string;

    @Column({ default: null})
    physicianFollowId: string;

    @Column({ type: 'date', default: null})
    surgeryDate: Date;

    @Column({ default: null})
    pacemakerSerial: string;

    @Column({ default: null})
    atrialSerial: string;

    @Column({ default: null})
    ventricularSerial: string;

    @Column({ default: null})
    leftVentricularSerial: string;

    @Column({ default: null})
    pacemakerModel: string;

    @Column({ default: null})
    atrialModel: string;

    @Column({ default: null})
    ventricularModel: string;

    @Column({ default: null})
    leftVentricularModel: string;

    @Column({ default: null})
    socialWorker: string;

    @Column({ default: null})
    hospitalId: string;
    
    @Column({ default: null})
    hospitalFollowId: string;

    @Column({ default: null})
    responsibleId: string;

    @CreateDateColumn()
    created!: Date;
}
