import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticlesService } from 'src/domain/articles/interfaces';
import { CreateArticleDto } from 'src/dto/create-article.dto';
import { UpdateArticleDto } from 'src/dto/update-article.dto';
import { ARTICLES_SERVICE } from 'src/constants';
import { ArticleDto } from 'src/dto/article.dto';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(
    @Inject(ARTICLES_SERVICE) private readonly articlesService: ArticlesService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: ArticleDto })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOkResponse({ type: ArticleDto, isArray: true })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get('drafts')
  @ApiOkResponse({ type: ArticleDto, isArray: true })
  findDrafts() {
    return this.articlesService.findDrafts();
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ArticleDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.remove(id);
  }
}
