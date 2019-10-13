import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Bookmark } from "./Bookmark";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Bookmark, bookmark => bookmark.author)
    bookmarks: Bookmark[]
}
