"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailVerificationRoutes = emailVerificationRoutes;
const validation_code_1 = require("./validation-code");
const send_verification_code_1 = require("./send-verification-code");
async function emailVerificationRoutes(app) {
    app.post("/email-verification/send", send_verification_code_1.sendVerificationCode);
    app.post("/email-verification/validate", validation_code_1.validateVerificationCode);
}
