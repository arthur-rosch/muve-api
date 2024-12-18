"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoFormRoutes = videoFormRoutes;
const update_1 = require("./update");
const add_lead_1 = require("./add-lead");
const get_all_leads_by_video_id_1 = require("./get-all-leads-by-video-id");
const verify_jwt_1 = require("../../middlewares/verify-jwt");
const verify_signature_1 = require("../../middlewares/verify-signature");
async function videoFormRoutes(app) {
    app.get('/form/:videoId', {
        onRequest: [verify_jwt_1.verifyJwt, verify_signature_1.checkSignatureMiddleware],
    }, get_all_leads_by_video_id_1.getAllLeadsFormsByVideoId);
    app.post('/form/video', {
        onRequest: [verify_jwt_1.verifyJwt, verify_signature_1.checkSignatureMiddleware],
    }, update_1.updateVideoForm);
    app.post('/form/lead', add_lead_1.createLeadForm);
}
