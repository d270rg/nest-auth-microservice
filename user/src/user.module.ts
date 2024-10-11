import { CommonModule } from '@common/common.module';
import { AuthGuard } from '@common/decorators/AuthGuard';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '@src/application/services/user.service';
import { ValidatorService } from '@src/application/services/validator.service';
import { UserController } from '@src/presentation/user.controller';
import { UserStorage } from '@src/storage/user.storage';
import * as dotenv from 'dotenv';
import { TokenService } from './application/services/token.service';
dotenv.config({ path: '../.env' });

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_KEY,
    }),
    CommonModule,
  ],
  controllers: [UserController],
  providers: [
    AuthGuard,
    // Application Services
    UserService,
    ValidatorService,
    TokenService,
    // Storages
    UserStorage,
  ],
})
export class UserModule {}
