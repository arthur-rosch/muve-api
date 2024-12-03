"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const env_1 = require("../env");
const nodemailer_1 = __importDefault(require("nodemailer"));
function sendEmail(_a) {
    return __awaiter(this, arguments, void 0, function* ({ to, from, text, html, subject, }) {
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
            const info = yield transporter.sendMail(mailOptions);
            return info;
        }
        catch (error) {
            console.error('Erro ao enviar o email:', error);
            throw error;
        }
    });
}
