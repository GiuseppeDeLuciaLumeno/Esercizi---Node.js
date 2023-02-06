"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const missingSetting = "Warning: No Value set for this enviroment variable";
const config = {
    "PORT": process.env.PORT || missingSetting,
    "SESSION_SECRET": process.env.SESSION_SECRET || missingSetting,
    "GITHUB_CLIENT_ID": process.env.GITHUB_CLIENT_ID || missingSetting,
    "GITHUB_CLIENT_SECRET": process.env.GITHUB_CLIENT_SECRET || missingSetting,
    "GITHUB_CALLBACK_URL": process.env.GITHUB_CALLBACK_URL || missingSetting,
};
exports.default = config;
