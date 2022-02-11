import { IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Unique } from '../../../validators/Unique';

export class CreateIssuerDto {
  @Length(2, 60)
  @Unique({ message: 'This issuer name is already in use' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Must be a string!' })
  @Unique({ message: 'This issuer URL name is already in use' })
  @IsString({ message: 'urlName  must be a string' })
  urlName: string;

  @Length(3, 10)
  chain: string;
}
