import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    user_id:string;

    @Column()
    user_password:string;


}