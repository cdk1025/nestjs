import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';

// closure-table 或者 materialized-path
// 这两种方式一个用单表存储，一个用两个表，但实现的效果是一样的。
@Entity()
@Tree('closure-table')
// @Tree('materialized-path')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  status: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @Column()
  name: string;

  @TreeChildren()
  children: City[];

  @TreeParent()
  parent: City;
}
