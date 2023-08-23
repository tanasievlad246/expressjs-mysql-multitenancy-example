import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "mysqluser",
    password: "password",
    database: "test",
    entities: ["src/models/*.entity{.ts,.js}"],
    synchronize: true,
    logging: true,
    insecureAuth: true
});
