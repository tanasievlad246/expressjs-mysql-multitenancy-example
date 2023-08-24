import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    database: "default_db",
    synchronize: false
})
export class Tenant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}