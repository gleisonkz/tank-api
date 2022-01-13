import { DatabaseModule } from 'src/modules/database/database.module';
import { TankModule } from 'src/modules/tank/tank.module';

import { Module } from '@nestjs/common';

@Module({
  imports: [TankModule, DatabaseModule],
})
export class AppModule {}
