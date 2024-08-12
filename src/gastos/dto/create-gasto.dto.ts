import { IsNumber, IsString, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGastoDto {
  @IsNumber()
  @IsNotEmpty()
  monto: number;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  fecha?: string;

}
