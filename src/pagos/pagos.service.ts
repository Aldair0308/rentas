import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PagosService {

  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
  ){}

  async create(createPagoDto: CreatePagoDto) {
    const pago = this.pagoRepository.create(createPagoDto);
    return await this.pagoRepository.save(pago);
  }

  async findAll() {
    return await this.pagoRepository.find();
  }

  async findOne(id: number): Promise<Pago> {
    const pago = await this.pagoRepository.findOneBy({ id });
    if (!pago) {
      throw new NotFoundException(`Pago con el ID ${id} no se pudo encontrar`);
    }
    return pago;
  }

  async update(id: number, updatePagoDto: UpdatePagoDto) {
    const pago = await this.pagoRepository.preload({
      id,
      ...updatePagoDto,
    });

    if (!pago) {
      throw new NotFoundException(`Pago con ID ${id} no se pudo encontrar`);
    }

    return await this.pagoRepository.save(pago);
  }

  async remove(id: number) {
    const pago = await this.findOne(id); // Obtener la entidad
    if (pago) {
      await this.pagoRepository.remove(pago);
      return { message: `Pago con ID ${id} ha sido eliminado` };
    }
  }
}

