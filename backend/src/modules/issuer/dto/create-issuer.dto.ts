import { Length, Matches } from 'class-validator';
import { Unique } from '../../../validators/Unique';

export class CreateIssuerDto {
    @Length(2, 60)
    @Unique({ message: "This issuer name is already in use" })
    name: string;

    @Length(2, 60)
    @Unique({ message: "This issuer URL name is already in use" })
    @Matches(/^[0-9a-z\-]*$/, null, {
        message: 'urlName must be lowercase alpha numeric with no spaces'
    })
    urlName: string;

    @Length(3,10)
    chain: string;
}
