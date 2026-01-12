import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { AppDataSource } from '../../common/config/ormconfig';
import { User } from '../../common/entities/user';
import { RefreshToken } from '../../common/entities/refresh-token';

// 用户服务类
class UserService {
  private userRepository = AppDataSource.getRepository(User);
  private refreshTokenRepository = AppDataSource.getRepository(RefreshToken);
  private jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
  private jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'your_refresh_secret';

  /**
   * 用户注册
   * @param userData 用户注册数据
   * @returns 注册结果
   */
  async register(userData: {
    phone: string;
    username: string;
    password: string;
    nickname?: string;
  }) {
    // 检查用户是否已存在
    const existingUser = await this.userRepository.findOne({
      where: { phone: userData.phone },
    });

    if (existingUser) {
      throw new Error('手机号已注册');
    }

    // 密码加密
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(userData.password, salt);

    // 创建新用户
    const user = new User();
    user.phone = userData.phone;
    user.username = userData.username;
    user.password = hashedPassword;
    user.nickname = userData.nickname || '';

    // 保存到数据库
    const savedUser = await this.userRepository.save(user);

    // 移除敏感信息
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  /**
   * 用户登录
   * @param phone 手机号
   * @param password 密码
   * @returns 登录结果，包含access token和refresh token
   */
  async login(phone: string, password: string) {
    // 查找用户，包含角色和权限
    const user = await this.userRepository.findOne({
      where: { phone },
      relations: ['roles', 'roles.permissions'],
    });

    if (!user) {
      throw new Error('用户不存在');
    }

    // 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('密码错误');
    }

    // 生成Access Token (15分钟过期)
    const accessToken = this.generateAccessToken(user);
    
    // 生成Refresh Token (30天过期)
    const refreshToken = await this.generateRefreshToken(user);

    // 移除敏感信息
    const { password: _, ...userWithoutPassword } = user;
    
    // 提取权限和角色信息
    const permissions = user.roles.flatMap(role => 
      role.permissions.map(permission => permission.code)
    );
    const roles = user.roles.map(role => role.name);

    return {
      accessToken,
      refreshToken: refreshToken.token,
      user: {
        ...userWithoutPassword,
        permissions,
        roles,
      },
      expiresIn: 900, // 15分钟，单位秒
    };
  }

  /**
   * 生成Access Token
   * @param user 用户对象
   * @returns Access Token
   */
  private generateAccessToken(user: User) {
    return jwt.sign(
      { id: user.id, phone: user.phone },
      this.jwtSecret,
      { expiresIn: '15m' } // 15分钟过期
    );
  }

  /**
   * 生成Refresh Token
   * @param user 用户对象
   * @returns Refresh Token对象
   */
  private async generateRefreshToken(user: User) {
    // 吊销该用户所有现有的Refresh Token
    await this.revokeAllRefreshTokens(user.id);
    
    // 生成新的Refresh Token
    const refreshToken = uuidv4();
    
    // 设置过期时间为30天
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    
    // 创建Refresh Token记录
    const tokenEntity = new RefreshToken();
    tokenEntity.token = refreshToken;
    tokenEntity.user = user;
    tokenEntity.expiresAt = expiresAt;
    tokenEntity.revoked = false;
    
    // 保存到数据库
    return await this.refreshTokenRepository.save(tokenEntity);
  }

  /**
   * 刷新Access Token
   * @param refreshToken Refresh Token
   * @returns 新的Access Token和Refresh Token
   */
  async refreshAccessToken(refreshToken: string) {
    // 验证Refresh Token
    const tokenEntity = await this.validateRefreshToken(refreshToken);
    
    if (!tokenEntity) {
      throw new Error('无效的刷新令牌');
    }
    
    // 生成新的Access Token
    const accessToken = this.generateAccessToken(tokenEntity.user);
    
    // 生成新的Refresh Token（刷新令牌轮换）
    const newRefreshToken = await this.generateRefreshToken(tokenEntity.user);
    
    return {
      accessToken,
      refreshToken: newRefreshToken.token,
      expiresIn: 900, // 15分钟，单位秒
    };
  }

  /**
   * 验证Refresh Token
   * @param token Refresh Token字符串
   * @returns Refresh Token实体或null
   */
  private async validateRefreshToken(token: string) {
    const tokenEntity = await this.refreshTokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });
    
    if (!tokenEntity) {
      return null;
    }
    
    if (tokenEntity.isExpired()) {
      // 吊销过期令牌
      await this.revokeRefreshToken(token);
      return null;
    }
    
    if (!tokenEntity.isActive()) {
      return null;
    }
    
    return tokenEntity;
  }

  /**
   * 吊销Refresh Token
   * @param token Refresh Token字符串
   */
  async revokeRefreshToken(token: string) {
    await this.refreshTokenRepository.update({ token }, {
      revoked: true,
    });
  }

  /**
   * 吊销用户所有的Refresh Token
   * @param userId 用户ID
   */
  async revokeAllRefreshTokens(userId: number) {
    await this.refreshTokenRepository.update({ 
      user: { id: userId }
    }, {
      revoked: true,
    });
  }

  /**
   * 根据ID获取用户信息
   * @param id 用户ID
   * @returns 用户信息
   */
  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles', 'roles.permissions'],
    });

    if (!user) {
      throw new Error('用户不存在');
    }

    // 移除敏感信息
    const { password, ...userWithoutPassword } = user;
    
    // 提取权限和角色信息
    const permissions = user.roles.flatMap(role => 
      role.permissions.map(permission => permission.code)
    );
    const roles = user.roles.map(role => role.name);
    
    return {
      ...userWithoutPassword,
      permissions,
      roles,
    };
  }
}

// 导出单例实例
export const userService = new UserService();
