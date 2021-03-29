import { Entity, Column } from "typeorm";
import { Model } from "./Model";

@Entity({ name: "users" })
export class User extends Model {
  @Column()
  title: string;

  @Column()
  body: string;
}
