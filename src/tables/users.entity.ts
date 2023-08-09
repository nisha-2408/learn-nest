import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'bigint'
    })
    id: number;
    
    @Column({
        name: 'username',
        type: 'varchar',
        nullable: false,
        unique: true
    })
    username: string;

    @Column({
        name: 'password',
        type: 'varchar',
        nullable: false
    })
    password: string;

    @Column({
        name: 'email',
        type: 'varchar',
        nullable: false,
        unique: true
    })
    email: string;
}
