import { IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Unique } from '../../../validators/Unique';

export class UpdateIssuerDto {
  @IsOptional()
  @Length(2, 60)
  @Unique({ message: 'This issuer name is already in use' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Must be a string!' })
  avatarUri: string;

  @IsOptional()
  @IsString({ message: 'Must be a string!' })
  @Unique({ message: 'This issuer URL name is already in use' })
  urlName: string;

  @IsOptional()
  @Length(3, 10)
  chain: string;
}
