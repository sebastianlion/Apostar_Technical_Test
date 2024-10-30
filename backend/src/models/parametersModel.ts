import { parameters } from "../controllers/parametersController";
import db from "../db/database"

// Interfaz para los parametros
export interface Parameters {
    backgroundImage: string;
    executionTime: string;
    emails: string[];
}
export interface DbRow {
    backgroundImage: string;
    executionTime: string;
    emails: string;
}

// Funcion para obtener los parametros actuales
export const getParametersDb = (): Promise<Parameters> => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM parameters ORDER BY id DESC LIMIT 1", (err, row: DbRow) => {
            if(err) {
                return reject(err)
            }
            if(!row){
                resolve(parameters);
            } else {
            resolve({
                backgroundImage: row.backgroundImage,
                executionTime: row.executionTime,
                emails: JSON.parse(row.emails)
            })
        }
        })
    })
}

// Funcion para actualizar los parametros

export const updateParametersDb = (params: Parameters): Promise<void> => {
    return new Promise((resolve, reject) => {
        const emails = JSON.stringify(params.emails);
        console.log("Guardando datos")
        db.run(`INSERT INTO parameters (backgroundImage, executionTime, emails) VALUES (?, ?, ?)`,
            [params.backgroundImage, params.executionTime, emails],
            (err) => {
                if(err) return reject(err);
                resolve()
            }
        )
    })
}