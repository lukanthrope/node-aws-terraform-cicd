import { Controller, HttpCode, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('health-check')
@ApiTags('health-check')
export class HealthController {
  @Post()
  @HttpCode(200)
  @ApiResponse({ status: 200 })
  healthCheck() {
    return 'OK';
  }
}
