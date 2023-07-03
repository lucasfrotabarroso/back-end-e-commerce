import { DataSource } from "typeorm";
import { User } from "../entities/User.entity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./db.sqlite",
    entities:[
        User
    ],
    migrations: [
        "src/database/migrations/*.ts"
    ]
    
})

AppDataSource.initialize()
.then(()=>{
    console.log("o data source foi iniciado")
})
.catch((err)=>{
    console.error("erro na inicializacao do data source", err)
})