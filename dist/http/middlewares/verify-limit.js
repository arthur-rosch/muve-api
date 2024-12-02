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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/http/middlewares/verify-limit.ts
var verify_limit_exports = {};
__export(verify_limit_exports, {
  checkVideoLimitMiddleware: () => checkVideoLimitMiddleware,
  default: () => verify_limit_default
});
module.exports = __toCommonJS(verify_limit_exports);
var import_client = require("@prisma/client");

// src/utils/planNameMappingStripe.ts
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

// src/http/middlewares/verify-limit.ts
var prisma = new import_client.PrismaClient();
var checkVideoLimitMiddleware = (request, reply) => __async(void 0, null, function* () {
  var _a;
  const userId = (_a = request.user) == null ? void 0 : _a.sub;
  if (!userId) {
    return reply.status(401).send({ message: "Usu\xE1rio n\xE3o autenticado." });
  }
  try {
    const signature = yield prisma.signature.findFirst({
      where: {
        userId
      },
      orderBy: {
        created_at: "desc"
      }
    });
    if (signature.status === "canceled") {
      return reply.status(403).send({ message: "Assinatura cancelada." });
    }
    if (signature.status === "past_due") {
      return reply.status(403).send({ message: "Assinatura com pagamento atrasado." });
    }
    if (signature.status === "trialing") {
      const trialEndDate = signature.trial_end_date;
      if (trialEndDate && new Date(trialEndDate) < /* @__PURE__ */ new Date()) {
        return reply.status(403).send({ message: "Per\xEDodo de teste expirado." });
      }
    }
    if (signature.status !== "active" && signature.status !== "trialing") {
      return reply.status(403).send({ message: "Assinatura inv\xE1lida." });
    }
    const planName = planNameMappingStripe(signature.plan);
    console.log(planName);
    let videoLimit;
    switch (planName) {
      case "Mensal - Essencial":
        videoLimit = 10;
        break;
      case "Mensal - Profissional":
        videoLimit = 25;
        break;
      case "Mensal - Ilimitado":
        videoLimit = 150;
        break;
      default:
        videoLimit = 1;
    }
    const videoCount = yield prisma.video.count({
      where: {
        userId
      }
    });
    if (videoCount >= videoLimit) {
      return reply.status(403).send({ message: "Limite de v\xEDdeos excedido." });
    }
  } catch (error) {
    console.error("Erro ao verificar limite de v\xEDdeos:", error);
    reply.status(500).send({ message: "Erro interno do servidor." });
  }
});
var verify_limit_default = checkVideoLimitMiddleware;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkVideoLimitMiddleware
});
