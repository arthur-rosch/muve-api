"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../src/env");
const app_1 = require("../src/app");
app_1.app
    .listen({
    host: '0.0.0.0',
    port: env_1.env.PORT,
})
    .then(() => {
    console.log(`🚀 HTTP Server Running ${env_1.env.PORT} !`);
});
