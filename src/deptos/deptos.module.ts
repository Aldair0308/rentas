import { Module } from '@nestjs/common';
import { DeptosService } from './deptos.service';
import { DeptosController } from './deptos.controller';
import { Depto } from './entities/depto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Depto])],
  controllers: [DeptosController],
  providers: [DeptosService],
})
export class DeptosModule {}
