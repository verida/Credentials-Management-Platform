import {
  IsObject,
  IsString,
  Length,
  IsNotEmpty,
  Matches,
} from 'class-validator';

export class IssueCredentialDto {
  @IsString()
  @Length(10, 10)
  @IsNotEmpty()
  @Matches(/[0-9]{4}-[0-9]{2}-[0-9]{2}/, null, {
    message: 'Date of Birth must be YYYY-MM-DD',
  })
  dob: string;

  @IsString()
  @IsNotEmpty()
  did: string;

  @IsNotEmpty()
  @IsObject()
  data: object;
}
