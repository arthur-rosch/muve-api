"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const env_1 = require("../env");
const nodemailer_1 = __importDefault(require("nodemailer"));
async function sendEmail({ to, from, text, html, subject, }) {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: env_1.env.HOST_EMAIL,
            port: env_1.env.PORT_EMAIL,
            secure: true,
            auth: {
                user: env_1.env.USER_EMAIL,
                pass: env_1.env.PASS_EMAIL,
            },
        });
        const mailOptions = {
            to,
            from,
            text,
            html,
            subject,
        };
        const info = await transporter.sendMail(mailOptions);
        return info;
    }
    catch (error) {
        console.error('Erro ao enviar o email:', error);
        throw error;
    }
}
