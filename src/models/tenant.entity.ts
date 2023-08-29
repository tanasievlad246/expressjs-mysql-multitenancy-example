import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    database: "default_db",
})
export class Tenant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}