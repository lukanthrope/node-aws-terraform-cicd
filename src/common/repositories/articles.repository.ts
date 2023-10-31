import { Injectable } from '@nestjs/common';
import { DbClient } from 'src/common/db/db.client';
import {
  CreateArticle,
  UpdateArticle,
  ArticlesRepository as IArticlesRepository,
} from 'src/domain/articles/interfaces';

@Injectable()
export class ArticlesRepository implements IArticlesRepository {
  constructor(private db: DbClient) {}

  public create(data: CreateArticle) {
    return this.db.article.create({ data });
  }

  public findDrafts() {
    return this.db.article.findMany({ where: { published: false } });
  }

  public findAll() {
    return this.db.article.findMany({ where: { published: true } });
  }

  public findOne(id: number) {
    return this.db.article.findUnique({ where: { id } });
  }

  public update(id: number, data: UpdateArticle) {
    return this.db.article.update({
      where: { id },
      data,
    });
  }

  public remove(id: number) {
    return this.db.article.delete({ where: { id } });
  }
}
