import { Module } from '@nestjs/common';
import { ARTICLES_REPOSITORY } from 'src/constants';
import { DbModule } from '../db/db.module';
import { ArticlesRepository } from './articles.repository';

const moduleProviders = [
  { provide: ARTICLES_REPOSITORY, useClass: ArticlesRepository },
];

const moduleExports = [
  { provide: ARTICLES_REPOSITORY, useClass: ArticlesRepository },
];

@Module({
  imports: [DbModule],
  providers: moduleProviders,
  exports: moduleExports,
})
export class RepositoriesModule {}
