/**
 * 用户列表项（匹配 Go model.User）
 */
export interface UserListItem {
  id: number;
  username: string;
  email: string;
  avatar: string;
  created_at: string;
  updated_at: string;
}

/**
 * 获取用户列表请求参数
 */
export interface GetUsersParams {
  page: number;
  page_size: number;
  keyword?: string;
}

/**
 * Go API 统一响应结构
 */
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

/**
 * 分页响应结构（匹配 Go dto.PageResponse）
 */
export interface PageResponse<T> {
  list: T[];
  total: number;
  page: number;
  page_size: number;
}
