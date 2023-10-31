export interface Article {
  id: number;
  title: string;
  description?: string;
  body: string;
  published?: boolean;
}

export interface CreateArticle {
  title: string;
  description?: string;
  body: string;
  published?: boolean;
}

export interface UpdateArticle extends Partial<CreateArticle> {}

export interface ArticlesRepository {
  create(data: CreateArticle): Promise<Article>;

  findDrafts(): Promise<Article[]>;

  findAll(): Promise<Article[]>;

  findOne(id: number): Promise<Article>;

  update(id: number, data: UpdateArticle): Promise<Article>;

  remove(id: number): Promise<Article>;
}

export interface ArticlesService {
  create(data: CreateArticle): Promise<Article>;

  findDrafts(): Promise<Article[]>;

  findAll(): Promise<Article[]>;

  findOne(id: number): Promise<Article>;

  update(id: number, data: UpdateArticle): Promise<Article>;

  remove(id: number): Promise<Article>;
}
