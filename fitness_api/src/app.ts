import "reflect-metadata";//typeorm需要的元数据反射库
import express from 'express';
import cors from 'cors';
// 使用 require 语法导入，解决 TypeScript 类型问题
const ipfilter = require('express-ipfilter').IpFilter;
import { AppDataSource } from './common/config/ormconfig';
import { apiRouter } from './routes/index';
import dotenv from 'dotenv';
import { loggerMiddleware, errorLoggerMiddleware } from './common/middleware/logger';

// 加载环境变量
dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    console.log("数据库连接成功");
    
    // 初始化权限、角色和管理员用户
    const { permissionService } = await import('./modules/permission/permission.service');
    await permissionService.initBasicPermissions();
    await permissionService.initDefaultRoles();
    await permissionService.initAdminUser();
    
    console.log("系统初始化完成");
  })
  .catch((error) => console.log("数据库连接失败", error));

const app = express();
const port = parseInt(process.env.PORT || '3000');



// 从环境变量读取允许的IP列表，默认允许本地和局域网IP
const allowedIPs = (process.env.ALLOWED_IPS || '::1,127.0.0.1,192.168.1.*,10.0.0.*')
  .split(',')
  .map(ip => ip.trim());

// IP过滤配置
const ipfilterOptions = {
  allowedIPs,
  mode: 'allow', // 白名单模式
  log: true, // 记录访问日志
  logLevel: 'warn', // 日志级别
  trustProxy: true // 如果使用了反向代理，需要开启
};

// CORS配置 - 允许来自特定源的请求
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // 允许的源列表
    const allowedOrigins = [
      'http://localhost:5173', // 前端开发服务器地址
      'https://your-production-domain.com' // 生产环境域名
    ];
    // 开发环境允许所有来源，生产环境只允许指定来源
    const isAllowed = process.env.NODE_ENV !== 'production' || allowedOrigins.includes(origin || '');
    if (isAllowed || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // 允许发送Cookie
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的HTTP方法
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // 允许的请求头
  maxAge: 86400 // 预检请求的缓存时间，单位秒
};

//中间件
app.use(loggerMiddleware);
app.use(ipfilter(allowedIPs, ipfilterOptions)); // IP过滤
app.use(cors(corsOptions)); // 优化后的CORS配置
app.use(express.json());

//路由注册 - 使用统一的API路由管理
app.use('/api', apiRouter);


//错误处理中间件 - 先记录错误日志，再返回响应
app.use(errorLoggerMiddleware);
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).send({code:500,msg:'服务端错误'});
});

app.listen(port, () => {
  console.log(`服务端运行在 http://localhost:${port}`);
});