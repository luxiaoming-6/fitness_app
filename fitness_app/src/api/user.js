// 用户相关 API
import { http } from '../utils/request';

// 用户登录
export const login = (data) => {
  return http.post('/user/login', data);
};

// 获取用户信息
export const getUserInfo = () => {
  return http.get('/user/info');
};

// 获取用户角色和权限
export const getUserPermissions = () => {
  return http.get('/user/permissions');
};

// 刷新令牌
export const refreshToken = (data) => {
  return http.post('/user/refresh', data);
};

// 用户登出
export const logout = () => {
  return http.post('/user/logout');
};
