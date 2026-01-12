import express from 'express';

/**
 * 请求日志中间件 - 增强版，带详细性能指标
 */
export const loggerMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const start = Date.now();
  const startMemory = process.memoryUsage().heapUsed;

  // 记录请求开始
  console.log(`[${new Date().toISOString()}] 🚀 ${req.method} ${req.url} - 请求开始`);

  // 监听响应结束事件
  res.on('finish', () => {
    const duration = Date.now() - start;
    const endMemory = process.memoryUsage().heapUsed;
    const memoryUsed = endMemory - startMemory;
    const memoryMB = (memoryUsed / 1024 / 1024).toFixed(2);

    // 不同颜色区分不同响应时间
    let timeColor = '🟢'; // 绿色 - 快
    if (duration > 1000) timeColor = '🔴'; // 红色 - 慢
    else if (duration > 500) timeColor = '🟡'; // 黄色 - 中

    // 详细的响应日志
    console.log(`[${new Date().toISOString()}] ${timeColor} ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms - 内存使用: +${memoryMB}MB`);
  });

  next();
};

/**
 * 错误日志中间件
 */
export const errorLoggerMiddleware = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(`[${new Date().toISOString()}] 错误: ${err.message}`);
  console.error(err.stack);
  next(err);
};
