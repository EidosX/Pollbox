import { Module } from '@nestjs/common';
import { UserDummyService } from './User.dummy.service';
import { UserService } from './User.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: UserService,
      useClass: UserDummyService,
    },
  ],
})
export class UserModule {}
