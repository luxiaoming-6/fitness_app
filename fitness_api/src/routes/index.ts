import express from 'express';
import userRouter from '../modules/user/user.controller';
import roleRouter from '../modules/permission/role.controller';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

const router: express.Router = express.Router();

// API版本前缀 - 从环境变量获取，默认v1
const API_VERSION = process.env.API_VERSION || 'v1';

// 注册所有路由
router.use('/user', userRouter);
router.use('/roles', roleRouter);

// 导出带版本前缀的路由器
export const apiRouter: express.Router = express.Router();
apiRouter.use(`/${API_VERSION}`, router);

export default router;
