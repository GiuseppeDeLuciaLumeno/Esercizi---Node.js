"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const client_1 = require("@prisma/client");
const l_1 = require("../l");
const multer_1 = require("../lib/middleware/multer");
const upload = (0, multer_1.initMulterMiddleware)();
const router = (0, express_1.Router)();
router.get("/", async (request, response) => {
    const planets = await client_1.prisma.planet.findMany();
    response.json(planets);
});
router.get("/:id(\\d+)", async (request, response, next) => {
    const planetid = Number(request.params.id);
    const planet = await client_1.prisma.planet.findUnique({
        where: { id: planetid }
    });
    if (!planet) {
        response.status(404);
        return next(`Cannot GET /planets/${planetid}`);
    }
    response.json(planet);
});
router.post("/", (0, l_1.validate)({ body: l_1.planetSchema }), async (request, response) => {
    const planetData = request.body;
    const planet = await client_1.prisma.planet.create({
        data: planetData
    });
    response.status(201).json(planet);
});
router.put("/:id(\\d+)", (0, l_1.validate)({ body: l_1.planetSchema }), async (request, response, next) => {
    const planetId = Number(request.params.id);
    const planetData = request.body;
    try {
        const planet = await client_1.prisma.planet.update({
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
router.delete("/:id(\\d+)", async (request, response, next) => {
    const planetId = Number(request.params.id);
    try {
        await client_1.prisma.planet.delete({
            where: { id: planetId }
        });
        response.status(204).end();
    }
    catch (error) {
        response.status(404);
        next(`Cannot DELETE /plantes/${planetId}`);
    }
});
router.post("/:id(\\d+)/photo", upload.single("photo"), async (request, response, next) => {
    console.log("request.file", request.file);
    if (!request.file) {
        response.status(400);
        return next("No photo file uploaded.");
    }
    const planetId = Number(request.params.id);
    const photoFilename = request.file.filename;
    try {
        await client_1.prisma.planet.update({
            where: { id: planetId },
            data: { photoFilename },
        });
        response.status(201).json({ photoFilename });
    }
    catch (error) {
        response.status(404);
        next(`Cannot POST /planet/${planetId}/photo`);
    }
});
router.use("/photo", express_1.default.static("uploads"));
exports.default = router;
