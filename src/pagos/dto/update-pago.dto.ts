
import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsNumber, IsString, IsBoolean, IsNotEmpty, IsDate } from 'class-validator';
import { CreatePagoDto } from './create-pago.dto';

export class UpdatePagoDto extends PartialType(CreatePagoDto) {
  @IsOptional()
  @IsNumber()
  monto?: number;

  @IsString()
  @IsNotEmpty()
  tipo?: string;
  
  @IsString()
  @IsNotEmpty()
  depto?: string;
  
  @IsString()
  @IsNotEmpty()
  cliente?: string;
  
  @IsString()
  @IsNotEmpty()
  telefono?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsOptional()
  @IsDate()
  fecha?: Date;
}
