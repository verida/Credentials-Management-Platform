import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Headers,
  HttpException,
  HttpStatus,
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
  ) { }

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
    const credential = await this.credentialService.issue(issuer, data) as any;

    if (credential.error && credential.error.message) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: credential.error.message,
      }, HttpStatus.BAD_REQUEST);
    }


    return credential
  }

  @Get()
  async findAll(@Headers() headers): Promise<Credential[]> {
    const user = await this.authService.userByToken(headers);
    const issuer = await this.issuerService.findOne(user['issuerId']);
    return this.credentialService.findAll(issuer);
  }
}
