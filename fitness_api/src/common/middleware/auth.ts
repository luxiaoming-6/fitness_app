import express from 'express';
import jwt from 'jsonwebtoken';
import { permissionService } from '../../modules/permission/permission.service';

// 扩展Request接口，添加user和permissions属性
declare global {
  namespace Express {
    interface Request {
      user?: { id: number; phone: string; permissions?: string[] };
    }
  }
}

interface AuthRequest extends express.Request {
  user?: { id: number; phone: string; permissions?: string[] };
}

/**
 * JWT认证中间件
 */
export const authMiddleware = (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ code: 401, msg: '缺少认证令牌' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as { id: number; phone: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ code: 401, msg: '无效的认证令牌' });
  }
};

/**
 * 可选的JWT认证中间件
 */
export const optionalAuthMiddleware = (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret') as { id: number; phone: string };
    req.user = decoded;
  } catch (error) {
    // 忽略无效令牌，继续执行
  }

  next();
};

/**
 * 权限验证中间件
 * @param permissionCode 权限编码
 * @returns 中间件函数
 */
export const requirePermission = (permissionCode: string) => {
  return async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
    // 确保用户已认证
    if (!req.user) {
      return res.status(401).json({ code: 401, msg: '请先登录' });
    }

    try {
      // 检查用户是否有指定权限
      const hasPermission = await permissionService.hasPermission(req.user.id, permissionCode);
      
      if (!hasPermission) {
        return res.status(403).json({ code: 403, msg: '没有权限访问该资源' });
      }

      next();
    } catch (error: any) {
      res.status(500).json({ code: 500, msg: error.message || '权限验证失败' });
    }
  };
};
