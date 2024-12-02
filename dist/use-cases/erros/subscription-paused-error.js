var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/use-cases/erros/subscription-paused-error.ts
var subscription_paused_error_exports = {};
__export(subscription_paused_error_exports, {
  SubscriptionPausedError: () => SubscriptionPausedError
});
module.exports = __toCommonJS(subscription_paused_error_exports);
var SubscriptionPausedError = class extends Error {
  constructor() {
    super("Subscription is paused due to overdue next charge date.");
    this.name = "SubscriptionPausedError";
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SubscriptionPausedError
});
