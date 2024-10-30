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
exports.generateLotteryImage = void 0;
const canvas_1 = require("canvas");
const axios_1 = __importDefault(require("axios"));
// Funcion para obtener resultados de loterias desde la API
const fetchLotteryResults = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get("https://resultadosloterias.apostar.com.co/api/test-db/");
    return response.data;
});
// Funcion para generar la imagen de resultados de loteria
const generateLotteryImage = () => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield fetchLotteryResults();
    const backgroundImageUrl = process.env.BACKGROUND_IMAGE || "./assets/fondo.png";
    const canvas = (0, canvas_1.createCanvas)(800, 600);
    const ctx = canvas.getContext("2d");
    // Cargar la imagen de fondo
    const background = yield (0, canvas_1.loadImage)(backgroundImageUrl);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    // Agregar texto de resultados
    ctx.font = "28px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Resultados de loterias", 50, 100);
    // Mostrar cada resultado
    results.forEach((result, index) => {
        ctx.fillText(`${result.name}: ${result.number}`, 50, 150 + index * 40);
    });
    return canvas.toBuffer("image/png");
});
exports.generateLotteryImage = generateLotteryImage;
