import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToMany, JoinTable, UpdateDateColumn } from 'typeorm';
import { Role } from './role';

@Entity()
export class User {
  @PrimaryGeneratedColumn()//自增主键
  id: number;

  @Column({
    unique: true,//唯一索引
  })
  phone: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    nullable: true,//可选字段
  })
  nickname: string;

  @CreateDateColumn()//自动生成创建时间
  createdAt: Date;

  @UpdateDateColumn()//自动生成更新时间
  updatedAt: Date;

  // 多对多关系：用户 ↔ 角色
  @ManyToMany(() => Role, role => role.users, { cascade: true })
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}