import { IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeptoDto {
  @IsNumber()
  @IsNotEmpty()
  numero: number;

  @IsNumber()
  @IsNotEmpty()
  precio: number;

  @IsNumber()
  @IsNotEmpty()
  deposito: number;

  @IsString()
  @IsOptional()
  luz?: string;

  @IsString()
  @IsOptional()
  vencimiento?: string;
}
