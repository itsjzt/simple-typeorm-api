import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import * as crypto from 'crypto';


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

}
