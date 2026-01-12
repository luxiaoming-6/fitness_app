import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useUserStore } from '../stores/user';

// 创建axios实例
const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    // 如果有token，添加到请求头
    if (userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    // 如果请求成功，直接返回数据
    return data;
  },
  async (error) => {
    const { response } = error;
    const userStore = useUserStore();
    
    // 保存原始请求配置，用于重试
    const originalRequest = error.config;
    
    // 处理401未授权错误
    if (response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // 尝试刷新令牌
        await userStore.refreshToken();
        // 刷新令牌成功，重试原始请求
        originalRequest.headers['Authorization'] = `Bearer ${userStore.token}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // 刷新令牌失败，跳转到登录页
        ElMessage.error('登录已过期，请重新登录');
        // 清除登录状态
        userStore.clearTokens();
        // 跳转到登录页
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    // 处理其他错误
    const errorMessage = response?.data?.msg || '请求失败，请稍后重试';
    ElMessage.error(errorMessage);
    
    return Promise.reject(error);
  }
);

export default instance;
