import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from './role';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  code: string; // 权限编码，如"user:read"、"article:create"

  @Column({ length: 100 })
  name: string; // 权限名称，如"查看用户"、"创建文章"

  @Column({ length: 255 })
  description: string; // 权限描述

  @Column({ length: 50 })
  resource: string; // 资源类型，如"user"、"article"、"order"

  @Column({ length: 20 })
  action: string; // 操作类型，如"read"、"create"、"update"、"delete"

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 多对多关系：权限 ↔ 角色
  @ManyToMany(() => Role, role => role.permissions)
  roles: Role[];

  /**
   * 检查权限是否匹配
   * @param permissionCode 要检查的权限编码
   * @returns 是否匹配
   */
  matches(permissionCode: string): boolean {
    // 精确匹配
    if (this.code === permissionCode) {
      return true;
    }

    // 通配符匹配，如"user:*"匹配所有user相关权限
    if (this.code.endsWith(':*')) {
      const resource = this.code.split(':')[0];
      return permissionCode.startsWith(`${resource}:`);
    }

    return false;
  }
}