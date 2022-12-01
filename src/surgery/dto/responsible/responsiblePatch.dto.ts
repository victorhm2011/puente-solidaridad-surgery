import { IsOptional, IsString, MaxLength } from "class-validator";

export class ResponsiblePatchDto {

    @MaxLength(1000)
    @IsString()
    @IsOptional()
    responsibleName: string;

    @MaxLength(1000)
    @IsString()
    @IsOptional()
    institution: string;

    @MaxLength(1000)
    @IsString()
    @IsOptional()
    responsibleAddress: string;

    @MaxLength(100)
    @IsOptional()
    @IsString()
    responsiblePhone: string;
}
