import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { DealerService } from './dealer.service';
import { CreateDealerDto } from './dto/create-dealer.dto';
import { UpdateDealerDto } from './dto/update-dealer.dto';
import { AuthDto } from './dto/auth.dto';

@Controller('dealer')
export class DealerController {
  constructor(private readonly dealerService: DealerService) {}

  @Post()
  singin(@Body() auth: AuthDto){
    return this.dealerService.signIn(auth);
  }

  @Post()
  create(@Body() createDealerDto: CreateDealerDto) {
    return this.dealerService.create(createDealerDto);
  }

  @Get()
  findAll() {
    return this.dealerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dealerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDealerDto: UpdateDealerDto,
  ) {
    return this.dealerService.update(id, updateDealerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dealerService.remove(id);
  }
}
