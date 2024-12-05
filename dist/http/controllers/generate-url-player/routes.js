"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUrlPlayerRoutes = generateUrlPlayerRoutes;
const signed_url_1 = require("./signed-url");
const validate_signed_url_1 = require("./validate-signed-url");
const invalidate_url_1 = require("./invalidate-url");
async function generateUrlPlayerRoutes(app) {
    app.post("/generate/url", signed_url_1.generateSignedUrl);
    app.post("/validate/url", validate_signed_url_1.validateSignedUrl);
    app.post("/invalidate/url", invalidate_url_1.invalidateToken);
}
