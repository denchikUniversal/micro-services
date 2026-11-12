import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: "Welcome endpoint",
    description: "Return a simple API welcome message"
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({
    summary: "Health check",
    description: "Checks if the gateaway is running"
  })
  @Get('health')
  getHealth() {
    return this.appService.getHealth();
  }
}
