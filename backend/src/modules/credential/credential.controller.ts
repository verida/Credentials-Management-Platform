import { Controller, Get, Post, Body } from '@nestjs/common';
import { CredentialService } from './credential.service';

import { IssueCredentialDto } from './dto';

@Controller('credential')
export class CredentialController {
    constructor(private credentialService: CredentialService) {}

    @Post('issue')
    async issue(@Body() data: IssueCredentialDto): Promise<string> {
        return this.credentialService.issue(data)
    }
}
