import { CreateTankDto, UpdateTankDto } from 'src/modules/tank/dto/tank.dto';
import { Tank } from 'src/modules/tank/models/tank.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { TankService } from '../services/tank/tank.service';

@Controller('tank')
export class TankController {
  constructor(private readonly tankService: TankService) {}

  @Get()
  getTanks(): Promise<Tank[]> {
    return this.tankService.getTanks();
  }

  @Get('/:id')
  async getTankById(@Param('id') id: number): Promise<Tank> {
    const targetTank = await this.tankService.getTankById(id);
    return targetTank;
  }

  @Get('/name/:name')
  async getTankByName(@Param('name') name: string): Promise<Tank[]> {
    const matchedTanks = await this.tankService.getTankByName(name);
    return matchedTanks;
  }

  @Post()
  async createTank(@Body() tankDto: CreateTankDto): Promise<Tank> {
    const tank = await this.tankService.createTank(tankDto);
    return tank;
  }

  @Put('/:id')
  async updateTank(
    @Param('id') id: number,
    @Body() tankDto: UpdateTankDto
  ): Promise<UpdateResult> {
    return this.tankService.updateTank(id, tankDto);
  }

  @Delete('/:id')
  async deleteTank(@Param('id') id: number): Promise<DeleteResult> {
    return this.tankService.deleteTank(id);
  }
}
