import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('responsible')
export class ResponsibleEntity {
    @PrimaryGeneratedColumn("uuid", { name: "responsible_id" })
    responsibleId: string;

    @Column({ default: null, name: "responsible_name" })
    responsibleName: string;

    @Column({ default: null, name: "institution" })
    institution: string;

    @Column({ default: null, name: "responsible_address" })
    responsibleAddress: string;

    @Column({ default: null, name: "responsible_phone" })
    responsiblePhone: string;
}