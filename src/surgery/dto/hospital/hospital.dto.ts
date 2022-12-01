import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class HospitalDto {

    @MaxLength(1000)
    @IsString()
    hospitalName: string;

    @MaxLength(1000)
    @IsString()
    hospitalAddress: string;

    @IsNumber()
    @IsOptional()
    hospitalPhone: number;
}