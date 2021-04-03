import { Length } from "class-validator";
import { Entity, Column, ManyToOne } from "typeorm";
import { Model } from "./Model";
import { User } from "./User";

@Entity({ name: "posts" })
export class Post extends Model {
  @Column()
  @Length(1, 255)
  title: string;

  @Column()
  @Length(1, 255)
  body: string;

  @ManyToOne(() => User)
  user: User;

}
