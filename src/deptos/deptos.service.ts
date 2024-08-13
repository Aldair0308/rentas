import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeptoDto } from './dto/create-depto.dto';
import { UpdateDeptoDto } from './dto/update-depto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Depto } from './entities/depto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeptosService {

  constructor (
    @InjectRepository(Depto)
    private readonly deptoRepository: Repository <Depto>,
  ){}

  async create(createDeptoDto: CreateDeptoDto) {
    const depto = this.deptoRepository.create(createDeptoDto);
    return await this.deptoRepository.save(depto);
  }

  async findAll() {
    return await this.deptoRepository.find();
  }

  async findOne(id: number) {
    const depto = await this.deptoRepository.findOneBy({ id });
    if (!depto) {
      throw new NotFoundException(`Depto con el ID ${id} no encontrado`)
    }
    return depto;
  }

  async update(id: number, updateDeptoDto: UpdateDeptoDto) {
    const depto = await this.deptoRepository.preload({
      id,
      ...updateDeptoDto,
    });

    if (!depto) {
      throw new NotFoundException (`Depto con el ID ${id} no encontrado`)
    }
    return  await this.deptoRepository.save(depto);
  }

  async remove(id: number) {
    const depto = await this.findOne(id);
    if (depto) {
      await this.deptoRepository.remove(depto);
      return { message: `Depto con el ID ${id} ha sido eliminado` };
    }
  }
}
