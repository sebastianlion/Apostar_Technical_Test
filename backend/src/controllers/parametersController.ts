import { Request, Response } from "express";
import {cronStart} from "../services/cronService"
import { Parameters, getParametersDb, updateParametersDb } from "../models/parametersModel";

export let parameters = {
    backgroundImage: "fondo.png",
    executionTime: "23:50",
    emails:["Direccion.analitica@apostar.com.co"]
};
cronStart(parameters)
const fillDb = async(parameters: Parameters) => {
    try {
        await updateParametersDb(parameters)
        console.log("Parametros actualizados correctamente")
    } catch (error) {
        console.error("Error al probar la base de datos: ", error)
    }
}
fillDb(parameters)

export const getParameters = async(req: Request, res: Response) => {
    const parametersDb = await getParametersDb();
    res.json(parametersDb)
}

export const updateParameters = (req: Request, res: Response) => {
    const {backgroundImage, executionTime, emails} = req.body;
    console.log("This is req.body: ", req.body);
    parameters = {backgroundImage, executionTime, emails};
    cronStart(parameters);
    fillDb(parameters)
    res.json(parameters);
}

export const getParametersValue = (): Parameters => parameters; 