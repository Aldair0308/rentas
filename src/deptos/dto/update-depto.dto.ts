import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsNumber, IsBoolean, IsString } from 'class-validator';
import { CreateDeptoDto } from './create-depto.dto';

export class UpdateDeptoDto extends PartialType(CreateDeptoDto) {
  @IsOptional()
  @IsNumber()
  numero?: number;

  @IsOptional()
  @IsNumber()
  precio?: number;

  @IsOptional()
  @IsNumber()
  deposito?: number;

  @IsOptional()
  @IsString()
  luz?: string;

  @IsOptional()
  @IsString()
  vencimiento?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
