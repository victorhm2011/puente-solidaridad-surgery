import { IsDateString, IsOptional, IsString, MaxLength } from "class-validator";

export class SurgeryPatchDto {

    @IsOptional()
    @IsString()
    patientId: string;

    @IsOptional()
    @IsString()
    physicianSurgeryId: string;

    @IsString()
    @IsOptional()
    physicianFollowId: string;

    @IsDateString()
    @IsOptional()
    surgeryDate: Date;

    @MaxLength(100)
    @IsString()
    @IsOptional()
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
    @IsOptional()
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
    @IsOptional()
    socialWorker: string;

    @IsString()
    @IsOptional()
    hospitalId: string;

    @IsString()
    @IsOptional()
    hospitalFollowId: string;

    @IsString()
    @IsOptional()
    responsibleId: string;
}