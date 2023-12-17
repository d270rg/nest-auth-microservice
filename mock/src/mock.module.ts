import { CommonModule } from '@common/common.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MockController } from '@src/presentation/mock.controller';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_KEY,
    }),
    CommonModule,
  ],
  controllers: [MockController],
})
export class MockServiceModule {}
