"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookKirvanoRoutes = webhookKirvanoRoutes;
const purchaseApproved_1 = require("./purchaseApproved");
const subscriptionExpired_1 = require("./subscriptionExpired");
const subscriptionRenewed_1 = require("./subscriptionRenewed");
const subscriptionCanceled_1 = require("./subscriptionCanceled");
async function webhookKirvanoRoutes(app) {
    app.post('/webhook/purchase/approved', purchaseApproved_1.purchaseApproved);
    app.post('/webhook/subscription/expired', subscriptionExpired_1.subscriptionExpired);
    app.post('/webhook/subscription/renewed', subscriptionRenewed_1.subscriptionRenewed);
    app.post('/webhook/subscription/canceled', subscriptionCanceled_1.subscriptionCanceled);
}
