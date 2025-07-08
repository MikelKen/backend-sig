import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Client> {
    return this.clientService.findOne(+id);
  }

  @Post()
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientService.create(createClientDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.clientService.remove(+id);
  }
}
