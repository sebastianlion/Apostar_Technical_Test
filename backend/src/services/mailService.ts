import nodemailer from "nodemailer";
import { generateLotteryImage } from "./imageService";
import dotenv from "dotenv" 
import { getParametersValue }from "../controllers/parametersController"

dotenv.config()

// Configuracion del transporte de Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    }
});

// Funcion para enviar el reporte diario
export const sendDailyReport = async () => {
    const parameters = getParametersValue();
    const recipients = parameters.emails || process.env.RECIPIENT_EMAILS ;
    const image = await generateLotteryImage(parameters.backgroundImage); // Genera la imagen de loteria

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

    try {
        await transporter.sendMail(mailOptions);
        console.log("Reporte diario enviado a los correos: ", recipients)
    } catch (error) {
        console.error(error)
    }
}