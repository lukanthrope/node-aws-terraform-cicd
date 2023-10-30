import { Module } from '@nestjs/common';
import { ARTICLES_REPOSITORY } from 'src/constants';
import { DbModule } from '../db/db.module';
import { ArticlesRepository } from './articles.repository';

const providers = [
  { provide: ARTICLES_REPOSITORY, useClass: ArticlesRepository },
];

@Module({
  imports: [DbModule],
  providers: providers,
})
export class RepositoriesModule {}
