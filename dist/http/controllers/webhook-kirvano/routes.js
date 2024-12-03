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
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookKirvanoRoutes = webhookKirvanoRoutes;
const purchaseApproved_1 = require("./purchaseApproved");
const subscriptionExpired_1 = require("./subscriptionExpired");
const subscriptionRenewed_1 = require("./subscriptionRenewed");
const subscriptionCanceled_1 = require("./subscriptionCanceled");
function webhookKirvanoRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post('/webhook/purchase/approved', purchaseApproved_1.purchaseApproved);
        app.post('/webhook/subscription/expired', subscriptionExpired_1.subscriptionExpired);
        app.post('/webhook/subscription/renewed', subscriptionRenewed_1.subscriptionRenewed);
        app.post('/webhook/subscription/canceled', subscriptionCanceled_1.subscriptionCanceled);
    });
}
