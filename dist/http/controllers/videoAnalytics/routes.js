"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsRoutes = analyticsRoutes;
const verify_jwt_1 = require("../../middlewares/verify-jwt");
const add_view_timestamps_1 = require("./add-view-timestamps");
const get_analytics_by_video_id_1 = require("./get-analytics-by-video-id");
const add_view_unique_1 = require("./add-view-unique");
const verify_signature_1 = __importDefault(require("../../middlewares/verify-signature"));
async function analyticsRoutes(app) {
    app.get('/analytic/:videoId', { onRequest: [verify_jwt_1.verifyJwt, verify_signature_1.default] }, get_analytics_by_video_id_1.getAnalyticsByVideoId);
    app.post('/add/analytics', add_view_timestamps_1.addViewTimestamps);
    app.post('/analytics/views', add_view_unique_1.addViewUnique);
}
