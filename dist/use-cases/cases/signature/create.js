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

// src/use-cases/cases/signature/create.ts
var create_exports = {};
__export(create_exports, {
  CreateSignatureUseCase: () => CreateSignatureUseCase
});
module.exports = __toCommonJS(create_exports);

// src/use-cases/erros/not-found-error.ts
var NotFoundErros = class extends Error {
  constructor(text) {
    super(`${text} not found`);
  }
};

// src/utils/planMapping.ts
var planMapping = (planName) => {
  switch (planName) {
    case "Mensal - Essencial":
      return "ESSENTIAL";
    case "Mensal - Profissional":
      return "PROFESSIONAL";
    case "Mensal - Ilimitado":
      return "UNLIMITED";
    case "Mensal -  Essencial":
      return "ESSENTIAL";
    default:
      return void 0;
  }
};

// src/use-cases/cases/signature/create.ts
var CreateSignatureUseCase = class {
  constructor(usersRepository, signaturesRepository) {
    this.usersRepository = usersRepository;
    this.signaturesRepository = signaturesRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      userId,
      plan,
      price,
      payment_method,
      chargeFrequency,
      next_charge_date,
      kirvano_type,
      kirvano_sale_id,
      kirvano_checkout_id
    }) {
      const user = yield this.usersRepository.findById(userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const signaturePlan = planMapping(plan);
      const signature = yield this.signaturesRepository.create({
        price,
        payment_method,
        status: "ACTIVE",
        plan: signaturePlan,
        kirvano_type,
        kirvano_sale_id,
        kirvano_checkout_id,
        next_charge_date,
        ChargeFrequency: chargeFrequency,
        user: {
          connect: {
            id: userId
          }
        }
      });
      return {
        signature
      };
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateSignatureUseCase
});
