import { Module } from '@nestjs/common';
import { SecurityCctvService } from './cctv.service';
import { SecurityCctvController } from './cctv.controller';

@Module({
  controllers: [SecurityCctvController],
  providers: [SecurityCctvService],
  exports: [SecurityCctvService],
})
export class SecurityCctvModule { }
