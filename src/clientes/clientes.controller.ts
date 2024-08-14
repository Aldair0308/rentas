import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new BadRequestException('El ID proporcionado no es válido');
    }
    return this.clientesService.findOne(idNumber);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new BadRequestException('El ID proporcionado no es válido');
    }
    return this.clientesService.update(idNumber, updateClienteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new BadRequestException('El ID proporcionado no es válido');
    }
    return this.clientesService.remove(idNumber);
  }
  
  @Get('info')
  getClientesInfo() {
    return this.clientesService.getClientesInfo();
  }
  
}