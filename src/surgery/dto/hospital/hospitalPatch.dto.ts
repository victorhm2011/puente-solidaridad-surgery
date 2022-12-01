import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class HospitalPatchDto {

    @MaxLength(1000)
    @IsString()
    @IsOptional()
    hospitalName: string;

    @MaxLength(1000)
    @IsString()
    @IsOptional()
    hospitalAddress: string;

    @IsNumber()
    @IsOptional()
    hospitalPhone: number;
}