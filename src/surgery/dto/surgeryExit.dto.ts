import { IsDateString, IsOptional, IsString, MaxLength } from "class-validator";

export class SurgeryExitDto {

    @IsString()
    patientId: string;
    
    @IsString()
    physicianSurgeryId: string;

    @IsString()
    physicianFollowId: string;

    @IsDateString()
    surgeryDate: Date;

    @MaxLength(100)
    @IsString()
    pacemakerSerial: string;

    @MaxLength(100)
    @IsString()
    @IsOptional()
    atrialSerial: string;

    @MaxLength(100)
    @IsString()
    @IsOptional()
    ventricularSerial: string;

    @MaxLength(100)
    @IsString()
    @IsOptional()
    leftVentricularSerial: string;

    @MaxLength(500)
    @IsString()
    pacemakerModel: string;

    @MaxLength(500)
    @IsString()
    @IsOptional()
    atrialModel: string;
    
    @MaxLength(500)
    @IsString()
    @IsOptional()
    ventricularModel: string;

    @MaxLength(500)
    @IsString()
    @IsOptional()
    leftVentricularModel: string;

    @MaxLength(500)
    @IsString()
    socialWorker: string;

    @IsString()
    hospitalId: string;

    @IsString()
    hospitalFollowId: string;

    @IsString()
    responsibleId: string;
}