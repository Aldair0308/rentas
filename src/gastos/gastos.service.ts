import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gasto } from './entities/gasto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GastosService {

  constructor(
    @InjectRepository(Gasto)
    private readonly gastoRepository: Repository <Gasto>,
  ){}


  async create(createGastoDto: CreateGastoDto) {
    // Obtener la fecha y hora actual en UTC
    const now = new Date();
  
    // Obtener el desfase de UTC a la hora local de CDMX (CST)
    const offset = -6 * 60; // UTC-6 minutos
  
    // Ajustar la fecha y hora a la zona horaria de CDMX
    const localDate = new Date(now.getTime() + offset * 60 * 1000);
  
    // Establecer el timestamp en el formato ISO
    createGastoDto.fecha = localDate.toISOString();
  
    const gasto = this.gastoRepository.create(createGastoDto);
    return await this.gastoRepository.save(gasto);
  }

  async findAll() {
    return await this.gastoRepository.find();
  }

  async findOne(id: number) {
    const gasto = await this.gastoRepository.findOneBy({ id });
    if (!gasto) {
      throw new NotFoundException(`Gasto with ID ${id} not found`);
    }
    return gasto;
  }

  async update(id: number, updateGastoDto: UpdateGastoDto) {
    const gasto = await this.gastoRepository.preload({
      id,
      ...updateGastoDto,
    });

    if (!gasto) {
      throw new NotFoundException(`Gasto with ID ${id} not found`);
    }

    return await this.gastoRepository.save(gasto);
  }

  async remove(id: number) {
    const gasto = await this.findOne(id); // Reuse findOne to check existence
    if (gasto) {
      await this.gastoRepository.remove(gasto);
      return { message: `Gasto with ID ${id} has been removed` };
    }
  }
}
