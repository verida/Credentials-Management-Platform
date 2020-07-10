import { IsObject } from 'class-validator';

export class FetchCredentialDto {
    @IsObject()
    filter: object;

    @IsObject()
    options: object;
}
