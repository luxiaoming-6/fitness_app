// 封装 uni.request，统一处理网络请求

// 基础配置
const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/v1' : '/api/v1';
const TIME_OUT = 10000; // 10秒超时

// 请求拦截器配置
const requestInterceptors = {
  // 请求前处理
  before(config) {
    // 可以在这里添加 token
    const token = uni.getStorageSync('token');
    if (token) {
      config.header.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // 请求错误处理
  error(error) {
    return Promise.reject(error);
  }
};

// 响应拦截器配置
const responseInterceptors = {
  // 响应成功处理
  success(response) {
    const { data, statusCode } = response;
    
    // 统一处理不同状态码
    if (statusCode === 200) {
      // 假设后端返回格式为 { code: 200, msg: 'success', data: {} }
      if (data.code === 200) {
        return data;
      } else {
        // 业务错误，显示错误信息
        uni.showToast({
          title: data.msg || '请求失败',
          icon: 'none'
        });
        return Promise.reject(data);
      }
    } else if (statusCode === 401) {
      // 未授权，跳转到登录页
      uni.showToast({
        title: '登录已过期，请重新登录',
        icon: 'none'
      });
      uni.navigateTo({
        url: '/pages/login/login'
      });
      return Promise.reject({ code: 401, msg: '未授权' });
    } else {
      uni.showToast({
        title: '网络请求失败',
        icon: 'none'
      });
      return Promise.reject({ code: statusCode, msg: '网络请求失败' });
    }
  },
  // 响应错误处理
  error(error) {
    uni.showToast({
      title: '网络请求失败',
      icon: 'none'
    });
    return Promise.reject(error);
  }
};

// 封装请求方法
const request = (options) => {
  // 合并基础配置和请求配置
  const config = {
    url: BASE_URL + options.url,
    method: options.method || 'GET',
    data: options.data || {},
    header: {
      'Content-Type': 'application/json',
      ...options.header
    },
    timeout: options.timeout || TIME_OUT,
    ...options
  };
  
  // 应用请求拦截器
  try {
    const processedConfig = requestInterceptors.before(config);
    
    // 返回 Promise
    return new Promise((resolve, reject) => {
      uni.request({
        ...processedConfig,
        success: (response) => {
          try {
            const result = responseInterceptors.success(response);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        },
        fail: (error) => {
          reject(responseInterceptors.error(error));
        }
      });
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// 封装常用请求方法
export const http = {
  // GET 请求
  get(url, params = {}, options = {}) {
    return request({
      url,
      method: 'GET',
      data: params,
      ...options
    });
  },
  
  // POST 请求
  post(url, data = {}, options = {}) {
    return request({
      url,
      method: 'POST',
      data,
      ...options
    });
  },
  
  // PUT 请求
  put(url, data = {}, options = {}) {
    return request({
      url,
      method: 'PUT',
      data,
      ...options
    });
  },
  
  // DELETE 请求
  delete(url, params = {}, options = {}) {
    return request({
      url,
      method: 'DELETE',
      data: params,
      ...options
    });
  }
};

export default request;
