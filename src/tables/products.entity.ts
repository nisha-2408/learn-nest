import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Products{
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id'
    })
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string;

    @Column({
        type: 'varchar',
        nullable: false,
        default: 'nothing'
    })
    description: string;

    @Column({
        type: 'real',
        nullable: false,
    })
    price: number
}