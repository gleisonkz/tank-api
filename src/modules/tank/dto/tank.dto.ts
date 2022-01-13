import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { eTankType } from 'src/shared/enums/tank.enum';

export class CreateTankDto {
  @IsNotEmpty({ message: 'O campo name é obrigatório' })
  @IsString({ message: 'O campo name deve ser uma string' })
  name: string;

  @IsNumber({}, { message: 'O campo type deve ser um número' })
  @IsNotEmpty({ message: 'O campo type é obrigatório' })
  type: eTankType;
}

export class UpdateTankDto {
  @IsString({ message: 'O campo name deve ser uma string' })
  name?: string;
  @IsNumber({}, { message: 'O campo type deve ser um número' })
  type?: eTankType;
}
