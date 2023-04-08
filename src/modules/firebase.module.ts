import { Module } from '@nestjs/common';
import { FirebaseModule } from 'nestjs-firebase';
import path from 'path';

@Module({
  imports: [
    FirebaseModule.forRoot({
      googleApplicationCredential: path.join(
        process.cwd(),
        'firebase/service_account.json',
      ),
    }),
  ],
})
export class FireModule {}
