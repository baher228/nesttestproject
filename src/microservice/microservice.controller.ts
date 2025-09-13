import { Controller } from '@nestjs/common';
import { MicroserviceService } from './microservice.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class MicroserviceController {
  constructor(private readonly microserviceService: MicroserviceService) {
    
  }
  @EventPattern('message') 
    handleMessage(data: string){
      this.microserviceService.handleMessage(data)
    }
}
