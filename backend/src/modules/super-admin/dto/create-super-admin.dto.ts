import { IsEmail, Length } from 'class-validator';
import { Unique } from '../../../validators/Unique';

export class CreateSuperAdminDto {
    @IsEmail()
    @Length(10, 60)
    @Unique({ message: "This email address is already in use" })
    email: string;

    @Length(10, 60)
    password: string;
}
