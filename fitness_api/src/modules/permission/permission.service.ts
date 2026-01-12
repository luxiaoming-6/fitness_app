import { AppDataSource } from '../../common/config/ormconfig';
import { In } from 'typeorm';
import { Role } from '../../common/entities/role';
import { Permission } from '../../common/entities/permission';
import { User } from '../../common/entities/user';
import bcrypt from 'bcrypt';

// 权限服务类
class PermissionService {
  private roleRepository = AppDataSource.getRepository(Role);
  private permissionRepository = AppDataSource.getRepository(Permission);
  private userRepository = AppDataSource.getRepository(User);

  /**
   * 初始化基础权限
   */
  async initBasicPermissions() {
    const basicPermissions = [
      // 用户相关权限
      { code: 'user:read', name: '查看用户', description: '查看用户列表和详情', resource: 'user', action: 'read' },
      { code: 'user:create', name: '创建用户', description: '创建新用户', resource: 'user', action: 'create' },
      { code: 'user:update', name: '更新用户', description: '更新用户信息', resource: 'user', action: 'update' },
      { code: 'user:delete', name: '删除用户', description: '删除用户', resource: 'user', action: 'delete' },
      { code: 'user:*', name: '所有用户权限', description: '拥有所有用户管理权限', resource: 'user', action: '*' },
      
      // 角色相关权限
      { code: 'role:read', name: '查看角色', description: '查看角色列表和详情', resource: 'role', action: 'read' },
      { code: 'role:create', name: '创建角色', description: '创建新角色', resource: 'role', action: 'create' },
      { code: 'role:update', name: '更新角色', description: '更新角色信息', resource: 'role', action: 'update' },
      { code: 'role:delete', name: '删除角色', description: '删除角色', resource: 'role', action: 'delete' },
      
      // 权限相关权限
      { code: 'permission:read', name: '查看权限', description: '查看权限列表', resource: 'permission', action: 'read' },
      
      // 系统管理权限
      { code: 'system:config', name: '系统配置', description: '系统配置管理', resource: 'system', action: 'config' },
    ];

    for (const permData of basicPermissions) {
      // 使用 findOrCreate 模式，更可靠的初始化方式
      const existingPermission = await this.permissionRepository.findOneBy({ code: permData.code });
      
      if (existingPermission) {
        // 更新现有权限
        Object.assign(existingPermission, permData);
        await this.permissionRepository.save(existingPermission);
      } else {
        // 创建新权限
        const newPermission = new Permission();
        Object.assign(newPermission, permData);
        await this.permissionRepository.save(newPermission);
      }
    }

    console.log('基础权限初始化完成');
  }

  /**
   * 初始化默认角色
   */
  async initDefaultRoles() {
    // 获取所有权限
    const allPermissions = await this.permissionRepository.find();
    
    // 获取用户相关权限
    const userPermissions = await this.permissionRepository.findBy({
      code: In(['user:read', 'user:update']),
    });

    // 默认角色配置
    const defaultRoles = [
      // 管理员角色 - 拥有所有权限
      {
        name: 'admin',
        description: '系统管理员，拥有所有权限',
        permissions: allPermissions,
      },
      
      // 普通用户角色 - 只能查看和更新自己
      {
        name: 'user',
        description: '普通用户，只能查看和更新自己',
        permissions: userPermissions,
      },
    ];

    for (const roleData of defaultRoles) {
      const existingRole = await this.roleRepository.findOne({
        where: { name: roleData.name },
        relations: ['permissions'],
      });

      if (existingRole) {
        // 更新角色权限
        existingRole.permissions = roleData.permissions;
        await this.roleRepository.save(existingRole);
      } else {
        // 创建新角色
        const newRole = new Role();
        newRole.name = roleData.name;
        newRole.description = roleData.description;
        newRole.permissions = roleData.permissions;
        await this.roleRepository.save(newRole);
      }
    }

    console.log('默认角色初始化完成');
  }

  /**
   * 初始化超级管理员用户
   */
  async initAdminUser() {
    // 检查是否已存在管理员用户
    const adminUser = await this.userRepository.findOneBy({
      phone: '13800138000' // 默认管理员手机号
    });
    
    if (!adminUser) {
      // 创建初始管理员
      const newAdmin = new User();
      newAdmin.phone = '13800138000';
      newAdmin.username = 'admin';
      newAdmin.nickname = '超级管理员';
      // 初始密码：admin123
      newAdmin.password = await bcrypt.hash('admin123', 10);
      
      // 关联管理员角色
      const adminRole = await this.roleRepository.findOneBy({ name: 'admin' });
      if (adminRole) {
        newAdmin.roles = [adminRole];
      }
      
      await this.userRepository.save(newAdmin);
      console.log('初始管理员创建成功');
      console.log('初始账号：13800138000');
      console.log('初始密码：admin123');
      console.log('请在首次登录后修改密码！');
    }
  }

  /**
   * 检查用户是否有指定权限
   * @param userId 用户ID
   * @param permissionCode 权限编码
   * @returns 是否有权限
   */
  async hasPermission(userId: number, permissionCode: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles', 'roles.permissions'],
    });

    if (!user) {
      return false;
    }

    // 检查用户的所有角色权限
    for (const role of user.roles) {
      for (const permission of role.permissions) {
        if (permission.matches(permissionCode)) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * 获取用户的所有权限
   * @param userId 用户ID
   * @returns 权限列表
   */
  async getUserPermissions(userId: number): Promise<Permission[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles', 'roles.permissions'],
    });

    if (!user) {
      return [];
    }

    // 合并所有角色的权限，去重
    const permissionMap = new Map<string, Permission>();
    for (const role of user.roles) {
      for (const permission of role.permissions) {
        permissionMap.set(permission.code, permission);
      }
    }

    return Array.from(permissionMap.values());
  }

  /**
   * 为用户分配角色
   * @param userId 用户ID
   * @param roleId 角色ID
   */
  async assignRole(userId: number, roleId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    const role = await this.roleRepository.findOneBy({ id: roleId });

    if (!user || !role) {
      throw new Error('用户或角色不存在');
    }

    // 检查角色是否已分配
    const hasRole = user.roles.some(r => r.id === roleId);
    if (!hasRole) {
      user.roles.push(role);
      await this.userRepository.save(user);
    }
  }

  /**
   * 从用户移除角色
   * @param userId 用户ID
   * @param roleId 角色ID
   */
  async removeRole(userId: number, roleId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new Error('用户不存在');
    }

    // 过滤掉要移除的角色
    user.roles = user.roles.filter(role => role.id !== roleId);
    await this.userRepository.save(user);
  }

  /**
   * 为角色分配权限
   * @param roleId 角色ID
   * @param permissionIds 权限ID列表
   */
  async assignPermissionsToRole(roleId: number, permissionIds: number[]): Promise<void> {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });

    const permissions = await this.permissionRepository.findByIds(permissionIds);

    if (!role) {
      throw new Error('角色不存在');
    }

    role.permissions = permissions;
    await this.roleRepository.save(role);
  }
}

// 导出单例实例
export const permissionService = new PermissionService();
