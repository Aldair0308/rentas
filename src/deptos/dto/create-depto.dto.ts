import { IsNumber, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

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

  @IsDate()
  @IsOptional()
  luz?: string;

  @IsDate()
  @IsOptional()
  vencimiento?: string;
}
