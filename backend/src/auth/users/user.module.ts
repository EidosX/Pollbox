import { Module } from '@nestjs/common';
import { UserDummyService } from './user.dummy.service';
import { UserService } from './user.service';

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
