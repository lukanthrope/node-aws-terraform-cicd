import { Inject, Injectable } from '@nestjs/common';
import { ARTICLES_REPOSITORY } from 'src/constants';
import {
  ArticlesRepository,
  CreateArticle,
  UpdateArticle,
  ArticlesService as IArticlesService,
} from './interfaces';

@Injectable()
export class ArticlesService implements IArticlesService {
  constructor(
    @Inject(ARTICLES_REPOSITORY)
    private readonly articlesRepository: ArticlesRepository,
  ) {}

  public create(data: CreateArticle) {
    return this.articlesRepository.create(data);
  }

  public findDrafts() {
    return this.articlesRepository.findDrafts();
  }

  public findAll() {
    return this.articlesRepository.findAll();
  }

  public findOne(id: number) {
    return this.articlesRepository.findOne(id);
  }

  public update(id: number, data: UpdateArticle) {
    return this.articlesRepository.update(id, data);
  }

  public remove(id: number) {
    return this.articlesRepository.remove(id);
  }
}
