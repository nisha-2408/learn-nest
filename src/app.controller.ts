import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Custom-Header', 'some text')
  getHello(): string {
    return this.appService.getHello();
  }
}
