"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundErros = void 0;
class NotFoundErros extends Error {
    constructor(text) {
        super(`${text} not found`);
    }
}
exports.NotFoundErros = NotFoundErros;
