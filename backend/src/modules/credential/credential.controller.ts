import { Controller, Post, Body } from '@nestjs/common';
import { validate } from 'class-validator';
import { CredentialService } from './credential.service';

import { IssueCredentialDto } from './dto';

@Controller('credential')
export class CredentialController {
    constructor(private credentialService: CredentialService) {}

    @Post('issue')
    async issue(@Body() data: IssueCredentialDto): Promise<string> {
        await validate(data).then(errors => { // errors is an array of validation errors
            if (errors.length > 0) {
                console.log("validation failed. errors: ", errors);
            }
        });
        
        return this.credentialService.issue(data)
    }
}
