import { DataSource } from 'typeorm';
import { User } from '../entities/user';
import { Role } from '../entities/role';
import { Permission } from '../entities/permission';
import { RefreshToken } from '../entities/refresh-token';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any || 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'fitness_api',
  entities: [User, Role, Permission, RefreshToken],
  synchronize: true,
  logging: true,
  driver: require('mysql2'),
});