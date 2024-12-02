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

// src/http/middlewares/verify-signature.ts
var verify_signature_exports = {};
__export(verify_signature_exports, {
  checkSignatureMiddleware: () => checkSignatureMiddleware,
  default: () => verify_signature_default
});
module.exports = __toCommonJS(verify_signature_exports);
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var checkSignatureMiddleware = (request, reply) => __async(void 0, null, function* () {
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
    if (!signature) {
      return reply.status(401).send({ message: "Usu\xE1rio sem Plano" });
    }
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
    if (signature.status !== "active" && signature.status !== "trialing" && signature.status !== "free") {
      return reply.status(403).send({ message: "Assinatura inv\xE1lida." });
    }
  } catch (error) {
    console.error("Erro ao verificar assinatura:", error);
    reply.status(500).send({ message: "Erro interno do servidor." });
  }
});
var verify_signature_default = checkSignatureMiddleware;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkSignatureMiddleware
});
