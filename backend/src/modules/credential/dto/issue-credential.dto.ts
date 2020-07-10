import { IsObject, IsString, Length, IsNotEmpty, IsDefined, Contains } from 'class-validator';

export class IssueCredentialDto {
    @IsString()
    @Length(8)
    @IsNotEmpty()
    dob: string;

    @IsString()
    @IsNotEmpty()
    mobile: string;

    @IsNotEmpty()
    @IsObject()
    data: object;
}
