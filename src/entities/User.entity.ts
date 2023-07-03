import { randomUUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id_user:string

    
    @Column()
    name:string

    @Column()
    email:string

    @Column()
    password:string

    constructor(
        name:string,
        email:string,
        password:string
    ){
        this.id_user = randomUUID()
        this.name = name
        this.email = email
        this.password = password
    }

}