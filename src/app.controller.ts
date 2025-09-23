import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
export class AppController {
  @Get('/health')
  healthCheck(): string {
    return 'OK';
  }
}
