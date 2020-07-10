import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { validate } from 'class-validator';
import { CredentialService } from './credential.service';

import { IssueCredentialDto, FetchCredentialDto } from './dto';
import { AuthGuard } from "@nestjs/passport";

import { UserService } from '../user/user.service';
import { IssuerService } from '../issuer/issuer.service';

@UseGuards(AuthGuard('jwt'))
@Controller('credential')
export class CredentialController {
    constructor(private credentialService: CredentialService, private userService: UserService, private issuerService: IssuerService) {}

    @Post('issue')
    async issue(@Body() data: IssueCredentialDto, @Req() request): Promise<object> {
        await validate(data).then(errors => { // errors is an array of validation errors
            if (errors.length > 0) {
                console.log("validation failed. errors: ", errors);
            }
        });

        const issuer = await this._getIssuer(request.user.userId)

        return this.credentialService.issue(issuer, data)
    }

    @Get()
    async findAll(@Body() data: FetchCredentialDto, @Req() request): Promise<Credential[]> {
        const issuer = await this._getIssuer(request.user.userId)
        return this.credentialService.findAll(issuer, data.filter, data.options)
    }

    async _getIssuer(userId: string) {
        const user = await this.userService.findOneById(userId)
        return this.issuerService.findOne(user.issuerId)
    }
}
