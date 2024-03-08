import { Task } from "../models/task.model";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const  dataSource: TypeOrmModuleOptions =({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: "root",
    password: "password",
    database: "todo",
    synchronize: true,
    entities: [Task],
});
