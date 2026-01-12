import express from 'express';
import joi from 'joi';
import dotenv from 'dotenv';
import { validate } from '../../common/middleware/validation';
import { userService } from './user.service';
import { responseUtil } from '../../common/utils/response';

// 加载环境变量
dotenv.config();

const router: express.Router = express.Router();

// 注册验证模式
const registerSchema = joi.object({
  phone: joi.string().required().messages({ 'any.required': '手机号不能为空' }),
  username: joi.string().required().messages({ 'any.required': '用户名不能为空' }),
  password: joi.string().min(6).required().messages({ 
    'any.required': '密码不能为空',
    'string.min': '密码长度不能少于6个字符' 
  }),
  nickname: joi.string(),
});

// 登录验证模式
const loginSchema = joi.object({
  phone: joi.string().required().messages({ 'any.required': '手机号不能为空' }),
  password: joi.string().min(6).required().messages({ 
    'any.required': '密码不能为空',
    'string.min': '密码长度不能少于6个字符' 
  }),
});

/**
 * 用户注册
 */
router.post('/register', validate(registerSchema), async (req: express.Request, res: express.Response) => {
  try {
    const user = await userService.register(req.body);
    responseUtil.success(res, user, '注册成功');
  } catch (error: any) {
    responseUtil.error(res, error.message || '注册失败');
  }
});

/**
 * 用户登录
 */
router.post('/login', validate(loginSchema), async (req: express.Request, res: express.Response) => {
  try {
    const result = await userService.login(req.body.phone, req.body.password);
    responseUtil.success(res, result, '登录成功');
  } catch (error: any) {
    // 统一处理登录错误信息，避免暴露过多细节
    if (error.message === '用户不存在' || error.message === '密码错误') {
      responseUtil.error(res, '用户不存在或密码错误');
    } else {
      responseUtil.error(res, error.message || '登录失败');
    }
  }
});

/**
 * 获取当前用户信息（示例：需要认证的路由）
 */
router.get('/profile', async (req: express.Request, res: express.Response) => {
  try {
    // 这里应该从认证中间件获取用户ID
    // 暂时使用固定ID示例
    const userId = 1;
    const user = await userService.getUserById(userId);
    responseUtil.success(res, user, '获取用户信息成功');
  } catch (error: any) {
    responseUtil.error(res, error.message || '获取用户信息失败');
  }
});

/**
 * 获取当前用户信息（兼容前端info路径）
 */
router.get('/info', async (req: express.Request, res: express.Response) => {
  try {
    // 这里应该从认证中间件获取用户ID
    // 暂时使用固定ID示例
    const userId = 1;
    const user = await userService.getUserById(userId);
    responseUtil.success(res, user, '获取用户信息成功');
  } catch (error: any) {
    responseUtil.error(res, error.message || '获取用户信息失败');
  }
});

/**
 * 刷新Access Token
 */
router.post('/refresh', async (req: express.Request, res: express.Response) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return responseUtil.error(res, '缺少刷新令牌', 400);
    }
    
    const result = await userService.refreshAccessToken(refreshToken);
    responseUtil.success(res, result, '令牌刷新成功');
  } catch (error: any) {
    responseUtil.error(res, error.message || '令牌刷新失败', 401);
  }
});

/**
 * 用户登出
 */
router.post('/logout', async (req: express.Request, res: express.Response) => {
  try {
    const { refreshToken } = req.body;
    
    if (refreshToken) {
      // 吊销Refresh Token
      await userService.revokeRefreshToken(refreshToken);
    }
    
    responseUtil.success(res, null, '登出成功');
  } catch (error: any) {
    responseUtil.error(res, error.message || '登出失败');
  }
});

export default router;