"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateParameters = exports.getParameters = void 0;
let parameters = {
    backgroundImage: "./assets/fondo.png",
    executionTime: "23:50",
    emails: ["sebastianlion12@hotmail.com"]
};
const getParameters = (req, res) => {
    res.json(parameters);
};
exports.getParameters = getParameters;
const updateParameters = (req, res) => {
    const { backgroundImage, executionTime, emails } = req.body;
    parameters = { backgroundImage, executionTime, emails };
    res.json(parameters);
};
exports.updateParameters = updateParameters;
