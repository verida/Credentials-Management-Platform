import {Controller, Post, Body, UseGuards} from '@nestjs/common';
import { validate } from 'class-validator';
import { CredentialService } from './credential.service';

import { IssueCredentialDto } from './dto';
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
@Controller('credential')
export class CredentialController {
    constructor(private credentialService: CredentialService) {}

    @Post('issue')
    async issue(@Body() data: IssueCredentialDto): Promise<object> {
        await validate(data).then(errors => { // errors is an array of validation errors
            if (errors.length > 0) {
                console.log("validation failed. errors: ", errors);
            }
        });

        return this.credentialService.issue(data)
    }
}
