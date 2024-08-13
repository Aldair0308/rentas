import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeptosService } from './deptos.service';
import { CreateDeptoDto } from './dto/create-depto.dto';
import { UpdateDeptoDto } from './dto/update-depto.dto';

@Controller('deptos')
export class DeptosController {
  constructor(private readonly deptosService: DeptosService) {}

  @Post()
  create(@Body() createDeptoDto: CreateDeptoDto) {
    return this.deptosService.create(createDeptoDto);
  }

  @Get()
  findAll() {
    return this.deptosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deptosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeptoDto: UpdateDeptoDto) {
    // Convert string dates to Date objects if they are present
    if (updateDeptoDto.luz && typeof updateDeptoDto.luz === 'string') {
      updateDeptoDto.luz = new Date(updateDeptoDto.luz);
    }
    if (updateDeptoDto.vencimiento && typeof updateDeptoDto.vencimiento === 'string') {
      updateDeptoDto.vencimiento = new Date(updateDeptoDto.vencimiento);
    }
    
    return this.deptosService.update(+id, updateDeptoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deptosService.remove(+id);
  }
}
