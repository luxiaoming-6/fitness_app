import express from 'express';
import Joi from 'joi';

/**
 * 创建参数验证中间件
 * @param schema Joi验证模式
 * @param options 验证选项
 * @returns 验证中间件
 */
export const validate = (schema: Joi.Schema, options: { abortEarly?: boolean } = {}) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { error } = schema.validate(req.body, { 
      abortEarly: options.abortEarly || false,
      allowUnknown: true 
    });

    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).send({ 
        code: 400, 
        msg: '请求参数错误',
        errors 
      });
    }

    next();
  };
};

/**
 * 创建查询参数验证中间件
 * @param schema Joi验证模式
 * @param options 验证选项
 * @returns 验证中间件
 */
export const validateQuery = (schema: Joi.Schema, options: { abortEarly?: boolean } = {}) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { error } = schema.validate(req.query, { 
      abortEarly: options.abortEarly || false,
      allowUnknown: true 
    });

    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).send({ 
        code: 400, 
        msg: '查询参数错误',
        errors 
      });
    }

    next();
  };
};

/**
 * 创建路径参数验证中间件
 * @param schema Joi验证模式
 * @param options 验证选项
 * @returns 验证中间件
 */
export const validateParams = (schema: Joi.Schema, options: { abortEarly?: boolean } = {}) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { error } = schema.validate(req.params, { 
      abortEarly: options.abortEarly || false,
      allowUnknown: true 
    });

    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).send({ 
        code: 400, 
        msg: '路径参数错误',
        errors 
      });
    }

    next();
  };
};
