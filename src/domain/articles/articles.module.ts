import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/common/repositories/repositories.module';
import { ArticlesService } from './articles.service';
import { ARTICLES_SERVICE } from 'src/constants';

const moduleProviders = [
  { provide: ARTICLES_SERVICE, useClass: ArticlesService },
];

const moduleExports = [
  { provide: ARTICLES_SERVICE, useClass: ArticlesService },
];

@Module({
  imports: [RepositoriesModule],
  providers: moduleProviders,
  exports: moduleExports,
})
export class ArticlesModule {}
