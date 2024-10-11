import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IToken, TokenDto } from '@src/models/i-token';
import { ITokenPayload, TokenPayloadDto } from '@src/models/i-token-payload';
import { Response } from 'express';
import { UserService } from '../application/services/user.service';
import { UserDto } from '../models/i-credentials';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Checks if user with given login exists' })
  @ApiParam({ name: 'login', required: true, description: 'User login' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Boolean })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'No user found',
    type: Boolean,
  })
  @Get('existance/login/:login')
  public async loginExistanceCheck(
    @Param('username') login: string,
  ): Promise<boolean> {
    return this.userService.loginExistance(login);
  }

  @ApiOperation({ summary: 'Checks if user with given username exists' })
  @ApiParam({ name: 'username', required: true, description: 'User username' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Boolean })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'No user found',
    type: Boolean,
  })
  @Get('existance/username/:username')
  public async usernameExistanceCheck(
    @Param('username') username: string,
  ): Promise<boolean> {
    return this.userService.usernameExistance(username);
  }

  @ApiOperation({ summary: 'Registers user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User registered',
    type: TokenPayloadDto,
  })
  @ApiBody({ type: UserDto })
  @Post()
  public async register(@Body() credentials: UserDto): Promise<ITokenPayload> {
    return this.userService.register(
      credentials.login,
      credentials.username,
      credentials.password,
    );
  }

  @ApiOperation({ summary: 'Logins user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User logged in',
    type: TokenPayloadDto,
  })
  @ApiBody({ type: UserDto })
  @Post('login')
  public async login(
    @Body()
    credentials: UserDto,
  ): Promise<ITokenPayload> {
    return this.userService.login(credentials.login, credentials.password);
  }

  @ApiOperation({ summary: 'Validates user credentials input' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Credentials are valid',
    type: TokenPayloadDto,
  })
  @ApiBody({ type: TokenDto })
  @Post('validate')
  public async validateUser(
    @Body() tokenPayload: IToken,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ITokenPayload> {
    const validationResult = await this.userService.validateUserToken(
      tokenPayload.access_token,
    );
    if (validationResult === undefined) {
      res.status(HttpStatus.FORBIDDEN);
    }
    return validationResult;
  }
}
