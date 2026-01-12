import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 512,
    unique: true,
  })
  token: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({
    type: 'datetime',
  })
  expiresAt: Date;

  @Column({
    default: false,
  })
  revoked: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 检查令牌是否有效
  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  // 检查令牌是否可用（未过期且未被吊销）
  isActive(): boolean {
    return !this.revoked && !this.isExpired();
  }
}