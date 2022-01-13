import { Tank } from 'src/modules/tank/models/tank.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Tank)
export class TankRepository extends Repository<Tank> {}
