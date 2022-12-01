import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('hospital')
export class HospitalEntity {
    @PrimaryGeneratedColumn("uuid", { name: "hospital_id" })
    hospitalId: string;

    @Column({ default: null, name: "hospital_name" })
    hospitalName: string;

    @Column({ default: null, name: "hospital_address" })
    hospitalAddress: string;

    @Column({ default: null, name: "hospital_phone" })
    hospitalPhone: number;
}