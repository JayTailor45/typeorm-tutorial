import { Entity, Column, OneToMany } from "typeorm";
import { Model } from "./Model";
import { Post } from "./Post";

@Entity({name: 'users'})
export class User extends Model {

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

}
