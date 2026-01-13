/**
 * 文章相关的类型定义（匹配 Go 后端）
 */

/**
 * 简化的用户信息（用于文章列表）
 */
export interface ArticleAuthor {
  id: number;
  username: string;
  email: string;
  avatar: string;
}

/**
 * 文章信息（匹配 Go model.Article）
 */
export interface Article {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  user_id: number;
  user?: ArticleAuthor; // 关联的用户信息（可选）
}

/**
 * 文章列表项
 */
export interface ArticleListItem extends Article {}

/**
 * 创建文章请求（匹配 Go dto.CreateArticleRequest）
 */
export interface CreateArticleRequest {
  title: string;
  content: string;
}

/**
 * 更新文章请求（匹配 Go dto.UpdateArticleRequest）
 */
export interface UpdateArticleRequest {
  title?: string;
  content?: string;
}

/**
 * 文章列表请求（匹配 Go dto.ListArticlesRequest）
 */
export interface ListArticlesRequest {
  page?: number;
  page_size?: number;
  keyword?: string;
}

/**
 * 文章列表响应（匹配 Go dto.ArticlePageResponse）
 */
export interface ArticlePageResponse {
  list: ArticleListItem[];
  total: number;
  page: number;
  page_size: number;
}
