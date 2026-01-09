/**
 * 登录请求参数（匹配 Go dto.LoginRequest）
 */
export interface ILogin {
  username: string;
  password: string;
}

/**
 * 注册请求参数（匹配 Go dto.RegisterRequest）
 */
export interface IRegister {
  username: string;
  password: string;
  email: string;
}

/**
 * 用户信息（匹配 Go model.User）
 */
export interface UserInfo {
  id: number;
  username: string;
  email: string;
  avatar: string;
  created_at: string;
  updated_at: string;
}

/**
 * 登录响应数据（匹配 Go dto.LoginResponse）
 */
export interface LoginResponse {
  token: string;
  user: UserInfo;
}

