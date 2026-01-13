import blogService from '@clients/blog';
import type {
  Article,
  ArticlePageResponse,
  CreateArticleRequest,
  ListArticlesRequest,
  UpdateArticleRequest,
} from './types';

/**
 * 获取文章列表
 * @param params 查询参数
 */
export const getArticles = async (params: ListArticlesRequest) => {
  return blogService.request<ArticlePageResponse>({
    method: 'POST',
    url: '/api/v1/articles/list',
    data: params,
  });
};

/**
 * 获取文章详情
 * @param id 文章ID
 */
export const getArticle = async (id: number) => {
  return blogService.request<Article>({
    method: 'GET',
    url: `/api/v1/articles/${id}`,
  });
};

/**
 * 创建文章
 * @param data 文章数据
 */
export const createArticle = async (data: CreateArticleRequest) => {
  return blogService.request<Article>({
    method: 'POST',
    url: '/api/v1/articles',
    data,
  });
};

/**
 * 更新文章
 * @param id 文章ID
 * @param data 更新数据
 */
export const updateArticle = async (id: number, data: UpdateArticleRequest) => {
  return blogService.request<Article>({
    method: 'PUT',
    url: `/api/v1/articles/${id}`,
    data,
  });
};

/**
 * 删除文章
 * @param id 文章ID
 */
export const deleteArticle = async (id: number) => {
  return blogService.request<void>({
    method: 'DELETE',
    url: `/api/v1/articles/${id}`,
  });
};
