import express from 'express';
import { permissionService } from './permission.service';
import { authMiddleware, requirePermission } from '../../common/middleware/auth';
import { responseUtil } from '../../common/utils/response';
import { AppDataSource } from '../../common/config/ormconfig';
import { Role } from '../../common/entities/role';
import { Permission } from '../../common/entities/permission';

const router: express.Router = express.Router();

// 获取存储库实例
const roleRepository = AppDataSource.getRepository(Role);
const permissionRepository = AppDataSource.getRepository(Permission);

/**
 * 获取角色列表
 */
router.get('/', authMiddleware, requirePermission('role:read'), async (req: express.Request, res: express.Response) => {
  try {
    const roles = await roleRepository.find({ relations: ['permissions'] });
    responseUtil.success(res, roles, '获取角色列表成功');
  } catch (error: any) {
    responseUtil.error(res, error.message || '获取角色列表失败');
  }
});

/**
 * 创建角色
 */
router.post('/', authMiddleware, requirePermission('role:create'), async (req: express.Request, res: express.Response) => {
  try {
    const { name, description, permissionIds = [] } = req.body;
    
    // 检查角色名称是否已存在
    const existingRole = await roleRepository.findOne({ where: { name } });
    if (existingRole) {
      return responseUtil.error(res, '角色名称已存在');
    }
    
    // 获取权限列表
    const permissions = await permissionRepository.findByIds(permissionIds);
    
    // 创建新角色
    const newRole = new Role();
    newRole.name = name;
    newRole.description = description;
    newRole.permissions = permissions;
    
    const savedRole = await roleRepository.save(newRole);
    responseUtil.success(res, savedRole, '创建角色成功');
  } catch (error: any) {
    responseUtil.error(res, error.message || '创建角色失败');
  }
});

/**
 * 更新角色
 */
router.put('/:id', authMiddleware, requirePermission('role:update'), async (req: express.Request, res: express.Response) => {
  try {
    const roleId = parseInt(req.params.id || '0');
    if (isNaN(roleId)) {
      return responseUtil.error(res, '无效的角色ID');
    }
    
    const { name, description, permissionIds = [] } = req.body;
    
    // 检查角色是否存在
    const role = await roleRepository.findOne({ 
      where: { id: roleId },
      relations: ['permissions']
    });
    if (!role) {
      return responseUtil.error(res, '角色不存在');
    }
    
    // 检查角色名称是否已被其他角色使用
    const existingRole = await roleRepository.findOne({ 
      where: { name }
    });
    if (existingRole && existingRole.id !== roleId) {
      return responseUtil.error(res, '角色名称已存在');
    }
    
    // 获取权限列表
    const permissions = await permissionRepository.findByIds(permissionIds);
    
    // 更新角色
    role.name = name;
    role.description = description;
    role.permissions = permissions;
    
    const updatedRole = await roleRepository.save(role);
    responseUtil.success(res, updatedRole, '更新角色成功');
  } catch (error: any) {
    responseUtil.error(res, error.message || '更新角色失败');
  }
});

/**
 * 删除角色
 */
router.delete('/:id', authMiddleware, requirePermission('role:delete'), async (req: express.Request, res: express.Response) => {
  try {
    const roleId = parseInt(req.params.id || '0');
    if (isNaN(roleId)) {
      return responseUtil.error(res, '无效的角色ID');
    }
    
    // 检查角色是否存在
    const role = await roleRepository.findOne({ where: { id: roleId } });
    if (!role) {
      return responseUtil.error(res, '角色不存在');
    }
    
    // 删除角色
    await roleRepository.remove(role);
    responseUtil.success(res, null, '删除角色成功');
  } catch (error: any) {
    responseUtil.error(res, error.message || '删除角色失败');
  }
});

/**
 * 获取权限列表
 */
router.get('/permissions', authMiddleware, requirePermission('permission:read'), async (req: express.Request, res: express.Response) => {
  try {
    const permissions = await permissionRepository.find();
    responseUtil.success(res, permissions, '获取权限列表成功');
  } catch (error: any) {
    responseUtil.error(res, error.message || '获取权限列表失败');
  }
});

/**
 * 为用户分配角色
 */
router.post('/assign-to-user', authMiddleware, requirePermission('role:update'), async (req: express.Request, res: express.Response) => {
  try {
    const { userId, roleId } = req.body;
    
    await permissionService.assignRole(userId, roleId);
    responseUtil.success(res, null, '角色分配成功');
  } catch (error: any) {
    responseUtil.error(res, error.message || '角色分配失败');
  }
});

/**
 * 从用户移除角色
 */
router.post('/remove-from-user', authMiddleware, requirePermission('role:update'), async (req: express.Request, res: express.Response) => {
  try {
    const { userId, roleId } = req.body;
    
    await permissionService.removeRole(userId, roleId);
    responseUtil.success(res, null, '角色移除成功');
  } catch (error: any) {
    responseUtil.error(res, error.message || '角色移除失败');
  }
});

export default router;
