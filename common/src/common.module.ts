import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ApiModule as MockApi } from './clients/mock';
import { ApiModule as UserApi } from './clients/user';
import { AuthGuard } from './decorators/AuthGuard';

@Module({
  imports: [HttpModule, MockApi, UserApi],
  exports: [AuthGuard],
  providers: [AuthGuard],
})
export class CommonModule {}
