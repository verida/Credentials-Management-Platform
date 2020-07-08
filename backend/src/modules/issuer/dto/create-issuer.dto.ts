import { Length } from 'class-validator';
import { Unique } from '../../../validators/Unique';

export class CreateIssuerDto {
    @Length(2, 60)
    @Unique({ message: "This issuer name is already in use" })
    name: string;

    @Length(34)
    privateKey: string;

    @Length(34)
    did: string;

    @Length(10)
    chain: string;

    @Length(50)
    address: string;
}
