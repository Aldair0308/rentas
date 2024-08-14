import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {

  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository <Cliente>,
  ){}

  async create(createClienteDto: CreateClienteDto) {
    // Obtener la fecha y hora actual en UTC
    const now = new Date();
  
    // Obtener el desfase de UTC a la hora local de CDMX (CST)
    const offset = -6 * 60; // UTC-6 minutos
  
    // Ajustar la fecha y hora a la zona horaria de CDMX
    const localDate = new Date(now.getTime() + offset * 60 * 1000);
  
    // Establecer el timestamp en el formato ISO
    createClienteDto.fecha = localDate.toISOString();
  
    const cliente = this.clienteRepository.create(createClienteDto);
    return await this.clienteRepository.save(cliente);
  }

  async findAll() {
    return await this.clienteRepository.find();
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException(`Cliente con el id ${id} no encontrado`);
    }
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.clienteRepository.preload({
      id,
      ...updateClienteDto,
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con el id ${id} no encontrado`);
    }

    return await this.clienteRepository.save(cliente);
  }

  async remove(id: number) {
    const cliente = await this.findOne(id); // Reuse findOne to check existence
    if (cliente) {
      await this.clienteRepository.remove(cliente);
      return { message: `Cliente con el id ${id} ha sido eliminado` };
    }
  }

  async getClientesInfo() {
    try {
      // Usar QueryBuilder para obtener datos de forma segura
      const clientes = await this.clienteRepository
        .createQueryBuilder('cliente')
        .select(['cliente.depto', 'cliente.nombre', 'cliente.telefono'])
        .getMany();

      // Asegúrate de filtrar valores inválidos
      const validClientes = clientes.filter(cliente => cliente.depto !== null && !isNaN(cliente.depto));

      // Devolver datos transformados
      return validClientes.map(cliente => ({
        depto: cliente.depto,
        nombre: cliente.nombre,
        telefono: cliente.telefono
      }));
    } catch (error) {
      console.error('Error en getClientesInfo:', error);
      throw new Error('Error en la consulta de clientes');
    }
  }
}
