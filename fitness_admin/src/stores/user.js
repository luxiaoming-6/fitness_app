import { defineStore } from 'pinia';
import axios from '../utils/axios';

// 创建用户状态管理
export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    token: localStorage.getItem('token') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    permissions: [],
    roles: []
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token,
    hasPermission: (state) => (permission) => {
      return state.permissions.includes(permission) || state.permissions.includes('*');
    }
  },
  
  actions: {
    // 保存令牌
    saveTokens(token, refreshToken) {
      this.token = token;
      this.refreshToken = refreshToken;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      
      // 设置axios默认 headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    
    // 清除令牌
    clearTokens() {
      this.token = '';
      this.refreshToken = '';
      this.userInfo = null;
      this.permissions = [];
      this.roles = [];
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      delete axios.defaults.headers.common['Authorization'];
    },
    
    // 登录
    async login(credentials) {
      try {
        const response = await axios.post('/v1/user/login', credentials);
        const { accessToken: token, refreshToken, user } = response.data;
        
        this.saveTokens(token, refreshToken);
        this.userInfo = user;
        this.permissions = user.permissions || [];
        this.roles = user.roles || [];
        
        return response;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
    
    // 刷新令牌
    async refreshToken() {
      try {
        const response = await axios.post('/v1/user/refresh', {
          refreshToken: this.refreshToken
        });
        
        const { accessToken: token, refreshToken } = response.data;
        this.saveTokens(token, refreshToken);
        
        return response;
      } catch (error) {
        // 刷新令牌失败，清除登录状态
        this.clearTokens();
        throw error.response?.data || error;
      }
    },
    
    // 登出
    async logout() {
      try {
        await axios.post('/v1/user/logout');
      } catch (error) {
        console.error('Logout failed:', error);
      } finally {
        this.clearTokens();
      }
    },
    
    // 获取用户信息
    async getUserInfo() {
      try {
        const response = await axios.get('/v1/user/info');
        this.userInfo = response.data;
        this.permissions = response.data.permissions || [];
        this.roles = response.data.roles || [];
        
        return response;
      } catch (error) {
        throw error.response?.data || error;
      }
    }
  }
});
