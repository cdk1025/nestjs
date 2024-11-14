import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'aaa_user',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;
}
