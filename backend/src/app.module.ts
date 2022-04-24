import { Module } from '@nestjs/common';
import { UserDummyService } from './users/User.dummy.service';
import { UserModule } from './users/User.module';
import { UserService } from './users/User.service';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [{ provide: UserService, useClass: UserDummyService }],
})
export class AppModule {}
