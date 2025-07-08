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
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route } from './entities/route.entity';

@Controller('routes')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get()
  findAll(): Promise<Route[]> {
    return this.routeService.findAll();
  }

  @Get('date/:date')
  findByDate(@Param('date') date: string): Promise<Route[]> {
    return this.routeService.findByDate(new Date(date));
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Route> {
    return this.routeService.findOne(+id);
  }

  @Post()
  create(@Body() createRouteDto: CreateRouteDto): Promise<Route> {
    return this.routeService.create(createRouteDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRouteDto: UpdateRouteDto,
  ): Promise<Route> {
    return this.routeService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.routeService.remove(+id);
  }
}
