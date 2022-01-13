import { Tank } from 'src/modules/tank/models/tank.entity';
import { DeleteResult, EntityRepository, Repository, UpdateResult } from 'typeorm';

@EntityRepository(Tank)
export class TankRepository extends Repository<Tank> {
  public async findAll(): Promise<Tank[]> {
    return await this.find();
  }

  public async findOneById(id: number): Promise<Tank> {
    return await this.findOne(id);
  }

  public async createOne(tank: Tank): Promise<Tank> {
    return await this.save(tank);
  }

  public async updateOne(id: number, tank: Tank): Promise<UpdateResult> {
    return this.update(id, tank);
  }

  public async deleteOne(id: number): Promise<DeleteResult> {
    return await this.delete(id);
  }

  public async findByName(name: string): Promise<Tank[]> {
    return await this.find({ name });
  }
}
