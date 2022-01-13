import { CreateTankDto, UpdateTankDto } from 'src/modules/tank/dto/tank.dto';
import { Tank } from 'src/modules/tank/models/tank.entity';
import { TankRepository } from 'src/modules/tank/tank.repository';
import { eMessages } from 'src/shared/enums/messages.enum';
import { DeleteResult, UpdateResult } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async getTankById(id: number): Promise<Tank> {
    const tank = await this.tankRepository.findOne(id);
    if (!tank)
      throw new HttpException(eMessages.NOT_FOUND, HttpStatus.NOT_FOUND);

    return tank;
  }

  createTank(tank: CreateTankDto): Promise<Tank> {
    const newTank = new Tank();
    newTank.name = tank.name;
    newTank.type = tank.type;

    return this.tankRepository.save(newTank);
  }

  async updateTank(id: number, tank: UpdateTankDto): Promise<UpdateResult> {
    const targetTank = await this.tankRepository.findOne(id);
    if (!targetTank)
      throw new HttpException(eMessages.NOT_FOUND, HttpStatus.NOT_FOUND);

    return this.tankRepository.update(id, tank);
  }

  async deleteTank(id: number): Promise<DeleteResult> {
    const targetTank = await this.tankRepository.findOne(id);
    if (!targetTank)
      throw new HttpException(eMessages.NOT_FOUND, HttpStatus.NOT_FOUND);

    return this.tankRepository.delete(id);
  }

  async getTankByName(name: string): Promise<Tank[]> {
    const tanks = await this.tankRepository
      .createQueryBuilder('tank')
      .where('LOWER(tank.name) like LOWER(:name)', { name: `%${name}%` })
      .getMany();

    return tanks;
  }
}
