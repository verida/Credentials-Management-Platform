import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Headers,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { CredentialService } from './credential.service';
import { Credential } from './interfaces/credential.interface';

import { IssueCredentialDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from '../user/user.service';
import { IssuerService } from '../issuer/issuer.service';
import { AuthService } from '../auth/auth.service';

@UseGuards(AuthGuard('jwt'))
@Controller('credential')
export class CredentialController {
  constructor(
    private credentialService: CredentialService,
    private userService: UserService,
    private issuerService: IssuerService,
    private authService: AuthService,
  ) {}

  @Post('issue')
  async issue(
    @Body() data: IssueCredentialDto,
    @Req() request,
  ): Promise<object> {
    await validate(data).then(errors => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        return errors;
      }
    });

    const user = await this.userService.findOneById(request.user.userId);
    const issuer = await this.issuerService.findOne(user.issuerId);
    return this.credentialService.issue(issuer, data);
  }

  @Get()
  async findAll(@Headers() headers): Promise<Credential[]> {
    const user = await this.authService.userByToken(headers);
    const issuer = await this.issuerService.findOne(user['issuerId']);
    return this.credentialService.findAll(issuer);
  }
}
