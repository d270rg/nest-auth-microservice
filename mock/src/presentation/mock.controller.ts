import { AuthGuard } from '@common/decorators/AuthGuard';
import { ITokenPayload } from '@common/models/i-token-payload';
import { HttpStatus } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common/decorators/core';
import { Get, Request } from '@nestjs/common/decorators/http';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('mock')
@Controller('mock')
export class MockController {
  @ApiOperation({ summary: 'Protected operation' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User info response',
    type: Object,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Get('protected')
  public async protectedEndpoint(
    @Request() req: { user: ITokenPayload },
  ): Promise<ITokenPayload> {
    return req.user;
  }

  @ApiOperation({ summary: 'Public operation' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User info response',
    type: Object,
  })
  @ApiBearerAuth('access-token')
  @Get('public')
  public async publicEndpoint(
    @Request() req: { user: ITokenPayload },
  ): Promise<ITokenPayload> {
    return req.user;
  }

  public constructor() {}
}
