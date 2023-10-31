import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ArticlesController } from './articles.controller';
import { ArticlesModule } from 'src/domain/articles/articles.module';

@Module({
  imports: [ArticlesModule],
  controllers: [HealthController, ArticlesController],
})
export class ControllersModule {}
