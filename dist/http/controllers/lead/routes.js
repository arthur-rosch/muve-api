"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadsRoutes = leadsRoutes;
const create_1 = require("./create");
async function leadsRoutes(app) {
    app.post("/lead", create_1.create);
}
