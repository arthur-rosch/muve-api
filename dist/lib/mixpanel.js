"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixpanel = void 0;
const mixpanel_1 = __importDefault(require("mixpanel"));
exports.mixpanel = mixpanel_1.default.init('5fbda77db1c3a9a99cc4b9d70c4b9cee');
