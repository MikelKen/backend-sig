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
import { RouteFormattedDto } from './dto/route-formatted.dto';
import { CreateRouteFlutterDto } from './dto/create-route-flutter.dto';

@Controller('routes')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post('flutter')
  createForFlutter(
    @Body() createRouteDto: CreateRouteFlutterDto,
  ): Promise<RouteFormattedDto> {
    return this.routeService.createRouteForFlutter(createRouteDto);
  }

  @Get('formatted')
  findAllFormattedForFlutter(): Promise<RouteFormattedDto[]> {
    return this.routeService.findAllFormattedForFlutter();
  }

  @Get(':id/formatted')
  findOneFormattedForFlutter(
    @Param('id') id: string,
  ): Promise<RouteFormattedDto> {
    return this.routeService.findOneFormattedForFlutter(+id);
  }

  @Patch(':id/start')
  startRoute(@Param('id') id: string): Promise<RouteFormattedDto> {
    return this.routeService.startRoute(+id);
  }

  @Patch(':id/end')
  endRoute(@Param('id') id: string): Promise<RouteFormattedDto> {
    return this.routeService.endRoute(+id);
  }

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
