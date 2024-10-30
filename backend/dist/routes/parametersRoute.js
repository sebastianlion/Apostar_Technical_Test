"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const parametersController_1 = require("../controllers/parametersController");
const router = express_1.default.Router();
router.get("/", parametersController_1.getParameters);
router.post("/", parametersController_1.updateParameters);
exports.default = router;
