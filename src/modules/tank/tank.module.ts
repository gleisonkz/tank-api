import { TankService } from 'src/modules/tank/services/tank/tank.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TankController } from './controllers/tank.controller';
import { TankRepository } from './tank.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TankRepository])],
  controllers: [TankController],
  providers: [TankService],
})
export class TankModule {}
