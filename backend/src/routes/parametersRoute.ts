import express from "express";
import { getParameters, updateParameters } from "../controllers/parametersController";

const router = express.Router()

router.get("/", getParameters);
router.post("/", updateParameters)

export default router;