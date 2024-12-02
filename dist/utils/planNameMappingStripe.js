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

// src/utils/planNameMappingStripe.ts
var planNameMappingStripe_exports = {};
__export(planNameMappingStripe_exports, {
  planNameMappingStripe: () => planNameMappingStripe
});
module.exports = __toCommonJS(planNameMappingStripe_exports);
var planNameMappingStripe = (priceId) => {
  switch (priceId) {
    case "price_1QFSPrEb05Ibkd2B63CkdONX":
      return "Mensal - Essencial";
    case "price_1QFSQWEb05Ibkd2BaOS032wb":
      return "Mensal - Profissional";
    case "price_1QFSQwEb05Ibkd2BjOjnD8Zs":
      return "Mensal - Ilimitado";
    default:
      return "Plano desconhecido";
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  planNameMappingStripe
});
