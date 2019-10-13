import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";


@Entity()
export class Bookmark {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    link: string

    @Column()
    title: string

    @ManyToOne(() => User, user => user.bookmarks)
    author: User;
}
