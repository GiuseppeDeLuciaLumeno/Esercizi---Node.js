"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const validation_1 = require("./lib/validation");
const client_1 = require("@prisma/client");
const multer_1 = require("./lib/middleware/multer");
const upload = (0, multer_1.initMulterMiddleware)();
const corsOptions = {
    origin: "http://localhost:8080"
};
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.get("/planets", async (request, response) => {
    const planets = await prisma.planet.findMany();
    response.json(planets);
});
app.get("/planets/:id(\\d+)", async (request, response, next) => {
    const planetid = Number(request.params.id);
    const planet = await prisma.planet.findUnique({
        where: { id: planetid }
    });
    if (!planet) {
        response.status(404);
        return next(`Cannot GET /planets/${planetid}`);
    }
    response.json(planet);
});
app.post("/planets", (0, validation_1.validate)({ body: validation_1.planetSchema }), async (request, response) => {
    const planetData = request.body;
    const planet = await prisma.planet.create({
        data: planetData
    });
    response.status(201).json(planet);
});
app.put("/planets/:id(\\d+)", (0, validation_1.validate)({ body: validation_1.planetSchema }), async (request, response, next) => {
    const planetId = Number(request.params.id);
    const planetData = request.body;
    try {
        const planet = await prisma.planet.update({
            where: { id: planetId },
            data: planetData
        });
        response.status(200).json(planet);
    }
    catch (error) {
        response.status(404);
        next(`Cannot PUT /plantes/${planetId}`);
    }
});
app.delete("/planets/:id(\\d+)", async (request, response, next) => {
    const planetId = Number(request.params.id);
    try {
        await prisma.planet.delete({
            where: { id: planetId }
        });
        response.status(204).end();
    }
    catch (error) {
        response.status(404);
        next(`Cannot DELETE /plantes/${planetId}`);
    }
});
app.post("/planets/:id(\\d+)/photo", upload.single("photo"), async (request, response, next) => {
    console.log("request.file", request.file);
    if (!request.file) {
        response.status(400);
        return next("No photo file uploaded.");
    }
    const photoFilename = request.file.filename;
    response.status(201).json({ photoFilename });
});
app.use(validation_1.validationErrorMiddleware);
exports.default = app;
