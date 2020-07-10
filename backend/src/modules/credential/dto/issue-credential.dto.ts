import { IsObject, IsString, Length, IsNotEmpty, Matches } from 'class-validator';

export class IssueCredentialDto {
    @IsString()
    @Length(8,8)
    @IsNotEmpty()
    @Matches(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)
    dob: string;

    @IsString()
    @IsNotEmpty()
    mobile: string;

    @IsNotEmpty()
    @IsObject()
    data: object;
}
