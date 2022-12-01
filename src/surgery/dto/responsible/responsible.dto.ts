import { IsOptional, IsString, MaxLength } from "class-validator";

export class ResponsibleDto {

    @MaxLength(1000)
    @IsString()
    responsibleName: string;

    @MaxLength(1000)
    @IsString()
    institution: string;

    @MaxLength(1000)
    @IsString()
    responsibleAddress: string;

    @MaxLength(100)
    @IsOptional()
    @IsString()
    responsiblePhone: string;
}
