import {createCanvas, loadImage} from "canvas"
import axios from "axios";
import https from "https"
import path from "path"

const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})

interface Lottery {
    LOTERIA_ID: number;
    NOMBRE: string;
    NUMERO_SORTEO: string | null;
    NUMERO_GANADOR: string | null;
    SERIE: string | null;
    TIPO_LOTERIA_ID: number;
}

// Funcion para obtener resultados de loterias desde la API
export const fetchLotteryResults = async () => {
    
    const response = await instance.get("https://resultadosloterias.apostar.com.co/api/test-db/")
    return response.data;
}

// Funcion para generar la imagen de resultados de loteria
export const generateLotteryImage = async (backgroundImage: string): Promise<Buffer> => {
    const results = await fetchLotteryResults();
    const imagePath = path.resolve(__dirname, `../assets/${backgroundImage}`)
    const backgroundImageUrl = imagePath || process.env.BACKGROUND_IMAGE;
    const canvas = createCanvas(1236, 1600);
    const ctx = canvas.getContext("2d");

    // Cargar la imagen de fondo
    const background = await loadImage(imagePath);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const capitalizeFirsLetter = (date: string) => {
        return date.charAt(0).toUpperCase() + date.slice(1)
    }

    function formatDate(date: Date) {
        const dayName = Intl.DateTimeFormat("es-ES", {
            weekday: "long"
        }).format(date)
        const day = date.getDate().toString().padStart(2, "0");
        const month = Intl.DateTimeFormat("es-ES", {
            month: "long"
        }).format(date)
        const year = date.getFullYear();

        return `${capitalizeFirsLetter(dayName)} ${day} de ${capitalizeFirsLetter(month)} ${year}`
    }

    
    // Agregar texto de resultados
    const now = new Date();
    ctx.font = "bold 22px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(formatDate(now), 820, 300)

    ctx.fillStyle = "black"
    const mainLotterys = results.filter((result: Lottery) => result.NOMBRE.startsWith("LOTERIA") && result.NUMERO_SORTEO !== null)
    .forEach((filteredResult: Lottery, index: number) => {
        ctx.fillText(`${filteredResult.NOMBRE}`, 100, 460 + index*35)
        ctx.fillStyle = "red"
        ctx.fillText(`${filteredResult.NUMERO_SORTEO}`, 450, 460 + index*35)
        ctx.fillStyle = "black"
        if(filteredResult.SERIE !== null){
            ctx.fillText(`SERIE: `, 700, 460 + index*35)
            ctx.fillStyle = "red"
            ctx.fillText(`${filteredResult.NUMERO_SORTEO}`, 780, 460 + index*35)
            ctx.fillStyle = "black"
        }
    })
    const winerLotterys = results.filter((result: Lottery) => !result.NOMBRE.startsWith("LOTERIA") && result.NUMERO_GANADOR !== null)
    .forEach((filteredResult: Lottery, index: number) => {   
        if(index < 12) {
            ctx.fillText(`${filteredResult.NOMBRE}`, 100, 720 + index*35)
            ctx.fillStyle = "red"
            ctx.fillText(`${filteredResult.NUMERO_GANADOR}`, 450, 720 + index*35)
            ctx.fillStyle = "black"
        } else {
            ctx.fillText(`${filteredResult.NOMBRE}`, 600, 300 + index*35)
            ctx.fillStyle = "red"
            ctx.fillText(`${filteredResult.NUMERO_GANADOR}`, 950, 300 + index*35)
            ctx.fillStyle = "black"
        }
})
    
    return canvas.toBuffer("image/png")
}