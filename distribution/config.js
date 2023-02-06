"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const missingSetting = "Warning: No Value set for this enviroment variable";
const config = {
    "PORT": process.env.PORT || missingSetting,
};
exports.default = config;
