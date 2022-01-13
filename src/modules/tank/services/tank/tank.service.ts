import { CreateTankDto, UpdateTankDto } from 'src/modules/tank/dto/tank.dto';
import { Tank } from 'src/modules/tank/models/tank.entity';
import { TankRepository } from 'src/modules/tank/tank.repository';
import { DeleteResult, UpdateResult } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TankService {
  constructor(
    @InjectRepository(TankRepository)
    private readonly tankRepository: TankRepository
  ) {}

  getTanks(): Promise<Tank[]> {
    return this.tankRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  getTankById(id: number): Promise<Tank> {
    return this.tankRepository.findOne(id);
  }

  createTank(tank: CreateTankDto): Promise<Tank> {
    const newTank = new Tank();
    newTank.name = tank.name;
    newTank.type = tank.type;

    return this.tankRepository.createOne(newTank);
  }

  updateTank(id: number, tank: UpdateTankDto): Promise<UpdateResult> {
    return this.tankRepository.update(id, tank);
  }

  deleteTank(id: number): Promise<DeleteResult> {
    return this.tankRepository.delete(id);
  }

  getTankByName(name: string): Promise<Tank[]> {
    return this.tankRepository
      .createQueryBuilder('tank')
      .where('tank.name LIKE :name', { name: `%${name}%` })
      .getMany();
  }
}
