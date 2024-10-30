"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cron_1 = require("cron");
const mailService_1 = require("./services/mailService");
const parametersRoute_1 = __importDefault(require("./routes/parametersRoute"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares
app.use(body_parser_1.default.json());
// Ruta configuracion de parametros
app.use("/api/parameters", parametersRoute_1.default);
// Rutas de prueba inicial
app.get("/", (req, res) => {
    res.send("Bienvenido a la api de loteria");
});
const cron = new cron_1.CronJob("50 23 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mailService_1.sendDailyReport)();
    console.log("Reporte diario enviado a las 23:50");
}));
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});
