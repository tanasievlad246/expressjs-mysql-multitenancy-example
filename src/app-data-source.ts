import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "mysqluser",
    password: "password",
    entities: ["src/models/*.entity{.ts,.js}"],
});
