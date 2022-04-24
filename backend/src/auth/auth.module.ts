import { Module } from '@nestjs/common';
import { UserModule } from './users/User.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AuthModule {}
