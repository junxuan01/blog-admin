import blogService from '@clients/blog';
import type { GetUsersParams, PageResponse, UserListItem } from './types';

/**
 * 获取用户列表
 * @returns Go API 返回的分页数据结构 { list, total, page, page_size }
 */
export const getUsers = async (params: GetUsersParams) => {
  return blogService.request<PageResponse<UserListItem>>({
    method: 'POST',
    url: '/api/v1/users/list',
    data: params,
  });
};
