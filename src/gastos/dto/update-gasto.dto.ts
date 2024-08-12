import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsNumber, IsString, IsDate, IsBoolean } from 'class-validator';
import { CreateGastoDto } from './create-gasto.dto';

export class UpdateGastoDto extends PartialType(CreateGastoDto) {
  @IsOptional()
  @IsNumber()
  monto?: number;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsDate()
  fecha?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
