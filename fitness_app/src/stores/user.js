// 用户状态管理
import { defineStore } from 'pinia';
import { login, getUserInfo, logout, refreshToken } from '../api/user';

export const useUserStore = defineStore('user', {
  state: () => ({
    // 用户信息
    userInfo: null,
    // 登录状态
    isLoggedIn: false,
    // 访问令牌
    token: uni.getStorageSync('token') || '',
    // 刷新令牌
    refreshToken: uni.getStorageSync('refreshToken') || '',
    // 用户角色
    roles: [],
    // 用户权限
    permissions: []
  }),
  
  getters: {
    // 获取用户名
    username: (state) => state.userInfo?.nickname || state.userInfo?.username || '未知用户',
    // 获取用户头像
    avatar: (state) => state.userInfo?.avatar || '',
    // 检查是否有某个权限
    hasPermission: (state) => (permission) => {
      // 如果是超级管理员或有该权限则返回true
      return state.roles.includes('admin') || state.permissions.includes(permission) || state.permissions.includes('*');
    }
  },
  
  actions: {
    // 保存令牌到本地存储
    saveTokens(token, refreshToken) {
      this.token = token;
      this.refreshToken = refreshToken;
      uni.setStorageSync('token', token);
      uni.setStorageSync('refreshToken', refreshToken);
      this.isLoggedIn = true;
    },
    
    // 清除令牌和用户信息
    clearTokens() {
      this.token = '';
      this.refreshToken = '';
      this.userInfo = null;
      this.roles = [];
      this.permissions = [];
      this.isLoggedIn = false;
      uni.removeStorageSync('token');
      uni.removeStorageSync('refreshToken');
    },
    
    // 用户登录
    async login(credentials) {
      try {
        const result = await login(credentials);
        const { accessToken, refreshToken, user } = result.data;
        
        // 保存令牌
        this.saveTokens(accessToken, refreshToken);
        
        // 保存用户信息
        this.userInfo = user;
        this.roles = user.roles || [];
        this.permissions = user.permissions || [];
        
        return result;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    
    // 获取用户信息
    async fetchUserInfo() {
      try {
        const result = await getUserInfo();
        const user = result.data;
        
        this.userInfo = user;
        this.roles = user.roles || [];
        this.permissions = user.permissions || [];
        
        return result;
      } catch (error) {
        console.error('Get user info failed:', error);
        // 如果获取用户信息失败，可能是令牌过期，清除登录状态
        this.clearTokens();
        throw error;
      }
    },
    
    // 用户登出
    async logout() {
      try {
        await logout();
      } catch (error) {
        console.error('Logout failed:', error);
      } finally {
        // 无论登出请求是否成功，都清除本地令牌和用户信息
        this.clearTokens();
      }
    },
    
    // 刷新访问令牌
    async refreshAccessToken() {
      try {
        const result = await refreshToken({
          refreshToken: this.refreshToken
        });
        const { accessToken, refreshToken } = result.data;
        
        // 更新令牌
        this.saveTokens(accessToken, refreshToken);
        
        return result;
      } catch (error) {
        console.error('Refresh token failed:', error);
        // 刷新令牌失败，清除登录状态
        this.clearTokens();
        throw error;
      }
    }
  }
});
