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
exports.analyticsRoutes = analyticsRoutes;
const verify_jwt_1 = require("@/http/middlewares/verify-jwt");
const add_view_timestamps_1 = require("./add-view-timestamps");
const get_analytics_by_video_id_1 = require("./get-analytics-by-video-id");
const add_view_unique_1 = require("./add-view-unique");
const verify_signature_1 = __importDefault(require("@/http/middlewares/verify-signature"));
function analyticsRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get('/analytic/:videoId', { onRequest: [verify_jwt_1.verifyJwt, verify_signature_1.default] }, get_analytics_by_video_id_1.getAnalyticsByVideoId);
        app.post('/add/analytics', add_view_timestamps_1.addViewTimestamps);
        app.post('/analytics/views', add_view_unique_1.addViewUnique);
    });
}
