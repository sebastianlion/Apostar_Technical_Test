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
exports.sendDailyReport = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const imageService_1 = require("./imageService");
// Configuracion del transporte de Nodemailer
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    }
});
// Funcion para enviar el reporte diario
const sendDailyReport = () => __awaiter(void 0, void 0, void 0, function* () {
    const recipients = process.env.RECIPIENT_EMAILS || "sebastianlion12@hotmail.com";
    const image = yield (0, imageService_1.generateLotteryImage)(); // Genera la imagen de loteria
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipients,
        subject: "Resultados de Loterias del dia",
        text: "Adjunto se encuentran los resultados de la lotria del dia",
        attachments: [
            {
                filename: "ResultadosLoteria.png",
                content: image,
                encoding: "base64"
            }
        ]
    };
    yield transporter.sendMail(mailOptions);
    console.log("Reporte diario enviado a los correos: ", recipients);
});
exports.sendDailyReport = sendDailyReport;
