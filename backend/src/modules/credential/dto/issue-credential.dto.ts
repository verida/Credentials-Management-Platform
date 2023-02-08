import {
  IsObject,
  IsString,
  Length,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';

export class IssueCredentialDto {
  @IsString()
  @Length(10, 10)
  @IsOptional()
  @Matches(/[0-9]{4}-[0-9]{2}-[0-9]{2}/, null, {
    message: 'Date of Birth must be YYYY-MM-DD',
  })
  dob: string;

  @IsString()
  @IsNotEmpty()
  did: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  summary: string;

  @IsString()
  @IsNotEmpty()
  schema: string;

  @IsObject()
  @IsOptional()
  proofs: Record<string, string[]>;

  @IsNotEmpty()
  @IsObject()
  data: object;
}
