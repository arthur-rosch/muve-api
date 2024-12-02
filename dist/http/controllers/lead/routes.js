var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/http/controllers/lead/routes.ts
var routes_exports = {};
__export(routes_exports, {
  leadsRoutes: () => leadsRoutes
});
module.exports = __toCommonJS(routes_exports);

// src/http/controllers/lead/create.ts
var import_zod2 = require("zod");

// src/utils/planMappingStripe.ts
var planMappingStripe = (planName) => {
  switch (planName) {
    case "Mensal - Essencial":
      return "price_1QFSPrEb05Ibkd2B63CkdONX";
    case "Mensal - Profissional":
      return "price_1QFSQWEb05Ibkd2BaOS032wb";
    case "Mensal - Ilimitado":
      return "price_1QFSQwEb05Ibkd2BjOjnD8Zs";
    default:
      return "price_1QFSPrEb05Ibkd2B63CkdONX";
  }
};

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  JWT_SECRET: import_zod.z.string().nonempty(),
  NODE_ENV: import_zod.z.enum(["dev", "test", "production"]).default("dev"),
  PORT: import_zod.z.coerce.number().default(3e3),
  DB_HOST: import_zod.z.string().nonempty(),
  DB_USER: import_zod.z.string().nonempty(),
  DB_PASS: import_zod.z.string().nonempty(),
  DB_NAME: import_zod.z.string().nonempty(),
  DATABASE_URL: import_zod.z.string().url().nonempty(),
  DB_PORT: import_zod.z.coerce.number().default(25060),
  DB_SSLMODE: import_zod.z.enum(["disable", "require", "verify-ca", "verify-full", "prefer"]).default("require"),
  STRIPE_KEY: import_zod.z.string().nonempty(),
  STRIPE_SECRET_KEY: import_zod.z.string().nonempty(),
  STRIPE_SECRET_WEBHOOK_KEY: import_zod.z.string().nonempty(),
  PASS_EMAIL: import_zod.z.string().nonempty(),
  USER_EMAIL: import_zod.z.string().nonempty(),
  HOST_EMAIL: import_zod.z.string().nonempty(),
  PORT_EMAIL: import_zod.z.coerce.number().default(465)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("\u274C Invalid environment variables", _env.error.format());
  throw new Error("\u274C Invalid environment variables.");
}
var env = _env.data;

// src/services/send-email.ts
var import_nodemailer = __toESM(require("nodemailer"));

// src/services/get-url-youtube.ts
var ytdl = require("@distube/ytdl-core");

// src/lib/stripe.ts
var import_stripe = __toESM(require("stripe"));
var stripe = new import_stripe.default(env.STRIPE_SECRET_KEY);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : []
});

// src/lib/mixpanel.ts
var import_mixpanel = __toESM(require("mixpanel"));
var mixpanel = import_mixpanel.default.init("5fbda77db1c3a9a99cc4b9d70c4b9cee");

// src/services/stripe/checkout-sessions.ts
var createStripeCheckout = (_0) => __async(void 0, [_0], function* ({
  email,
  leadId,
  priceId,
  success_url
}) {
  const checkout = yield stripe.checkout.sessions.create({
    success_url,
    line_items: [
      {
        quantity: 1,
        price: priceId
      }
    ],
    customer_email: email,
    client_reference_id: leadId,
    payment_method_types: ["card"],
    phone_number_collection: {
      enabled: true
    },
    mode: "subscription",
    subscription_data: {
      trial_period_days: 7
    }
  });
  return checkout;
});

// src/use-cases/cases/lead/create.ts
var CreateLeadUseCase = class {
  constructor(leadRepository) {
    this.leadRepository = leadRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      plan,
      name,
      email,
      phone,
      document
    }) {
      const lead = yield this.leadRepository.create({
        plan,
        name,
        email,
        phone,
        document
      });
      const priceIdStripeProduct = planMappingStripe(plan);
      const { url } = yield createStripeCheckout({
        leadId: lead.id,
        email: lead.email,
        priceId: priceIdStripeProduct,
        success_url: `https://web.muveplayer.com/thanks`
      });
      return { lead, checkoutUrl: url };
    });
  }
};

// src/repositories/prisma/prisma-lead-repository.ts
var PrismaLeadsRepository = class {
  create(data) {
    return __async(this, null, function* () {
      const folder = yield prisma.lead.create({
        data
      });
      return folder;
    });
  }
  findById(id) {
    return __async(this, null, function* () {
      const lead = yield prisma.lead.findUnique({
        where: {
          id
        }
      });
      if (!lead) {
        return null;
      }
      return lead;
    });
  }
  findByEmail(email) {
    return __async(this, null, function* () {
      const user = yield prisma.lead.findFirst({
        where: {
          email
        }
      });
      if (!user) {
        return null;
      }
      return user;
    });
  }
  delete(id) {
    return __async(this, null, function* () {
      const lead = yield prisma.lead.delete({
        where: {
          id
        }
      });
      return lead;
    });
  }
};

// src/repositories/prisma/prisma-email-verification-repository.ts
var import_client2 = require("@prisma/client");
var prisma2 = new import_client2.PrismaClient();

// src/use-cases/factories/lead/make-create-use-case.ts
function makeCreateLeadUseCase() {
  const leadsRepository = new PrismaLeadsRepository();
  const createLeadUseCase = new CreateLeadUseCase(leadsRepository);
  return createLeadUseCase;
}

// src/http/controllers/lead/create.ts
function create(request, reply) {
  return __async(this, null, function* () {
    const createLeadBodySchema = import_zod2.z.object({
      plan: import_zod2.z.string(),
      name: import_zod2.z.string(),
      phone: import_zod2.z.string(),
      document: import_zod2.z.string(),
      email: import_zod2.z.string().email()
    });
    console.log(request.body);
    const { name, email, plan, document, phone } = createLeadBodySchema.parse(
      request.body
    );
    try {
      const createLeadUseCase = makeCreateLeadUseCase();
      const { checkoutUrl } = yield createLeadUseCase.execute({
        plan,
        name,
        email,
        phone,
        document
      });
      return reply.status(201).send({
        checkoutUrl
      });
    } catch (err) {
      return reply.status(409).send({ message: err.message });
    }
  });
}

// src/http/controllers/lead/routes.ts
function leadsRoutes(app) {
  return __async(this, null, function* () {
    app.post("/lead", create);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  leadsRoutes
});
