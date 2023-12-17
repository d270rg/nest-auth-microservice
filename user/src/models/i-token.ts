import { ApiProperty } from '@nestjs/swagger';

export interface IToken {
  access_token: string;
}

export class TokenDto {
  @ApiProperty()
  access_token: string;
}
