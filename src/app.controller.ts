import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHealth(): string {
    console.log('Health check endpoint hit');
    return 'OK';
  }
export class AppController {
  @Get('/health')
  healthCheck(): string {
    return 'OK';
  }
}
