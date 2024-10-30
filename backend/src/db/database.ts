import {Database} from "sqlite3"
import fs from "fs";
import path from "path";

const db = new Database("./database.sqlite", (err) => {
    if(err){
        console.error("Error al conectar con la base de datos", err.message)
    } else {
        console.log("Conectado a la base de datos SQlite")

        // Ejecuta el script SQL al inicializar
        const initSql = fs.readFileSync(path.join(__dirname, "init.sql"), "utf-8" );
        db.exec(initSql, (err) => {
            if(err) {
                console.error("Error al crear las tablas", err.message)
            } else {
                console.log("Tablas creadas o existentes verificadas")
            }
        })
    }
})

export default db