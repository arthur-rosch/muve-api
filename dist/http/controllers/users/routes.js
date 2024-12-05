"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = usersRoutes;
const register_1 = require("./register");
const checkJwt_1 = require("./checkJwt");
const checkEmail_1 = require("./checkEmail");
const authenticate_1 = require("./authenticate");
const update_email_1 = require("./update-email");
const update_profile_1 = require("./update-profile");
const update_password_1 = require("./update-password");
const forgot_password_1 = require("./forgot-password");
const add_info_first_access_1 = require("./add-info-first-access");
const generatePasswordResetToken_1 = require("./generatePasswordResetToken");
const verify_jwt_1 = require("../../middlewares/verify-jwt");
const verify_signature_1 = require("../../middlewares/verify-signature");
async function usersRoutes(app) {
    app.post("/users", register_1.register);
    app.post("/sessions", authenticate_1.authenticate);
    app.post("/check/email", checkEmail_1.checkEmail);
    app.post("/send/password", generatePasswordResetToken_1.generatePasswordResetToken);
    app.post("/forgot/password", { onRequest: [verify_jwt_1.verifyJwt] }, forgot_password_1.forgotPassword);
    /** Authenticated **/
    app.get("/checkJWT", { onRequest: [verify_jwt_1.verifyJwt, verify_signature_1.checkSignatureMiddleware] }, checkJwt_1.checkJwt);
    app.post("/first/access", { onRequest: [verify_jwt_1.verifyJwt, verify_signature_1.checkSignatureMiddleware] }, add_info_first_access_1.AddInfoFirstAccess);
    app.post("/update/email", { onRequest: [verify_jwt_1.verifyJwt, verify_signature_1.checkSignatureMiddleware] }, update_email_1.updateEmail);
    app.post("/update/password", { onRequest: [verify_jwt_1.verifyJwt, verify_signature_1.checkSignatureMiddleware] }, update_password_1.updatePassword);
    app.post("/update/profile", { onRequest: [verify_jwt_1.verifyJwt, verify_signature_1.checkSignatureMiddleware] }, update_profile_1.updateProfile);
}
