import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { ParseIntPipe } from 'src/conception/pipe';
import { AuthGuard } from 'src/conception/guard';
import { LoggingInterceptor } from 'src/conception/interceptor';
import { CreateFlowerDto } from './dto/create-flower.dto';

@Controller('flowers')
@UseInterceptors(LoggingInterceptor)
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.flowersService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async create(@Body() CreateFlowerDto: CreateFlowerDto) {
    return await this.flowersService.create(CreateFlowerDto);
  }

  @Get('new-order')
  newOrder(){

  }
}
