import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import parameterRoutes from "./routes/parametersRoute"
import cors from "cors"


const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: "http://localhost:3001", 
    optionsSuccesStatus: 200
}

app.use(cors<Request>(corsOptions))

// Middlewares
app.use(bodyParser.json());

// Ruta configuracion de parametros
app.use("/api/parameters", parameterRoutes)

// Rutas de prueba inicial
app.get("/", async (req: Request, res: Response) => {
    res.send("Bienvenido a la api de loteria")
})


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
})