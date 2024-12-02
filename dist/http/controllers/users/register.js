var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

// src/http/controllers/users/register.ts
var register_exports = {};
__export(register_exports, {
  register: () => register
});
module.exports = __toCommonJS(register_exports);
var import_zod2 = require("zod");

// src/use-cases/erros/user-already-exists-error.ts
var UserAlreadyExistsError = class extends Error {
  constructor() {
    super("E-mail already exists.");
  }
};

// src/use-cases/cases/users/register.ts
var import_bcryptjs = require("bcryptjs");

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

// src/use-cases/cases/users/register.ts
var RegisterUseCase = class {
  constructor(usersRepository, signatureRepository) {
    this.usersRepository = usersRepository;
    this.signatureRepository = signatureRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      name,
      email,
      phone,
      password,
      document
    }) {
      const password_hash = yield (0, import_bcryptjs.hash)(password, 6);
      const userWithSameEmail = yield this.usersRepository.findByEmail(email);
      if (userWithSameEmail) {
        throw new UserAlreadyExistsError();
      }
      const customer = yield stripe.customers.create({
        email,
        phone,
        name
      });
      const user = yield this.usersRepository.create({
        name,
        email,
        phone,
        document,
        password_hash,
        stripeCustomersId: customer.id
      });
      yield this.signatureRepository.create({
        price: "0",
        plan: "free",
        status: "free",
        end_date: null,
        trial_end_date: null,
        ChargeFrequency: "MONTHLY",
        stripe_subscription_id: "N/A",
        stripe_customer_id: customer.id,
        user: { connect: { id: user.id } },
        payment_method: "N/A",
        start_date: /* @__PURE__ */ new Date(),
        next_charge_date: "N/A"
      });
      return { user };
    });
  }
};

// src/repositories/prisma/prisma-user-repository.ts
var PrimasUsersRepository = class {
  findById(id) {
    return __async(this, null, function* () {
      const user = yield prisma.user.findFirst({
        where: {
          id
        }
      });
      return user;
    });
  }
  findByCustomerId(id) {
    return __async(this, null, function* () {
      const user = yield prisma.user.findFirst({
        where: {
          stripeCustomersId: id
        }
      });
      return user;
    });
  }
  findByEmail(email) {
    return __async(this, null, function* () {
      const user = yield prisma.user.findUnique({
        where: {
          email
        }
      });
      return user;
    });
  }
  create(data) {
    return __async(this, null, function* () {
      const user = yield prisma.user.create({
        data: __spreadProps(__spreadValues({}, data), {
          role: "MEMBER"
        })
      });
      return user;
    });
  }
  update(id, data) {
    return __async(this, null, function* () {
      const user = yield prisma.user.update({
        where: {
          id
        },
        data: __spreadValues({}, data)
      });
      return user;
    });
  }
};

// src/repositories/prisma/prisma-signature-repository.ts
var PrismaSignaturesRepository = class {
  findLastByStripeSubscriptionId(subscriptionId) {
    return __async(this, null, function* () {
      const signature = yield prisma.signature.findFirst({
        where: { stripe_subscription_id: subscriptionId }
      });
      return signature;
    });
  }
  findByUserId(userId) {
    return __async(this, null, function* () {
      const signature = yield prisma.signature.findFirst({
        where: {
          userId
        },
        orderBy: {
          created_at: "desc"
        }
      });
      return signature;
    });
  }
  findManyByUserId(userId) {
    return __async(this, null, function* () {
      const signatures = yield prisma.signature.findMany({
        where: {
          userId
        }
      });
      return signatures;
    });
  }
  checkStatusSignature(userId) {
    return __async(this, null, function* () {
      const signature = yield prisma.signature.findFirst({
        where: {
          userId
        },
        orderBy: {
          created_at: "desc"
        }
      });
      return signature;
    });
  }
  updateStatusSignature(signatureId, status) {
    return __async(this, null, function* () {
      const updatedSignature = yield prisma.signature.update({
        where: {
          id: signatureId
        },
        data: {
          status
        }
      });
      return updatedSignature;
    });
  }
  delete(id) {
    return __async(this, null, function* () {
      const deletedSignature = yield prisma.signature.delete({
        where: {
          id
        }
      });
      return deletedSignature;
    });
  }
  update(id, signature) {
    return __async(this, null, function* () {
      const updatedSignature = yield prisma.signature.update({
        where: {
          id
        },
        data: signature
      });
      return updatedSignature;
    });
  }
  create(data) {
    return __async(this, null, function* () {
      const createdSignature = yield prisma.signature.create({
        data
      });
      return createdSignature;
    });
  }
  getSignaturesTwoDaysAfterCreation() {
    return __async(this, null, function* () {
      const twoDaysAgo = /* @__PURE__ */ new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      twoDaysAgo.setHours(0, 0, 0, 0);
      const endOfTwoDaysAgo = /* @__PURE__ */ new Date();
      endOfTwoDaysAgo.setDate(endOfTwoDaysAgo.getDate() - 2);
      endOfTwoDaysAgo.setHours(23, 59, 59, 999);
      return prisma.signature.findMany({
        where: {
          status: "trialing",
          created_at: {
            gte: twoDaysAgo,
            lte: endOfTwoDaysAgo
          }
        },
        include: {
          user: true
        }
      });
    });
  }
  getSignaturesAtHalfTrial() {
    return __async(this, null, function* () {
      const threeDaysAgo = /* @__PURE__ */ new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      const startOfDay = new Date(threeDaysAgo.setHours(0, 0, 0, 0));
      const endOfDay = new Date(threeDaysAgo.setHours(23, 59, 59, 999));
      console.log(
        "Intervalo para assinaturas com 3 dias de cria\xE7\xE3o:",
        startOfDay,
        endOfDay
      );
      return prisma.signature.findMany({
        where: {
          status: "trialing",
          created_at: {
            gte: startOfDay,
            lte: endOfDay
          }
        },
        include: {
          user: true
        }
      });
    });
  }
  getSignaturesTwoDaysBeforeTrialEnds() {
    return __async(this, null, function* () {
      const fiveDaysAgo = /* @__PURE__ */ new Date();
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
      const startOfDay = new Date(fiveDaysAgo.setHours(0, 0, 0, 0));
      const endOfDay = new Date(fiveDaysAgo.setHours(23, 59, 59, 999));
      return prisma.signature.findMany({
        where: {
          status: "trialing",
          created_at: {
            gte: startOfDay,
            lte: endOfDay
          }
        },
        include: {
          user: true
        }
      });
    });
  }
};

// src/repositories/prisma/prisma-email-verification-repository.ts
var import_client2 = require("@prisma/client");
var prisma2 = new import_client2.PrismaClient();
var PrismaEmailVerificationRepository = class {
  create(email, code) {
    return __async(this, null, function* () {
      return prisma2.emailVerification.create({
        data: { email, code }
      });
    });
  }
  findByEmail(email) {
    return __async(this, null, function* () {
      return prisma2.emailVerification.findUnique({
        where: { email }
      });
    });
  }
  findById(id) {
    return __async(this, null, function* () {
      return prisma2.emailVerification.findUnique({
        where: { id }
      });
    });
  }
  findByCode(code) {
    return __async(this, null, function* () {
      return prisma2.emailVerification.findFirst({
        where: { code }
      });
    });
  }
  updateVerificationStatus(email) {
    return __async(this, null, function* () {
      return prisma2.emailVerification.update({
        where: { email },
        data: { isVerified: true }
      });
    });
  }
  updateCode(email, code) {
    return __async(this, null, function* () {
      return prisma2.emailVerification.update({
        where: { email },
        data: { code }
      });
    });
  }
};

// src/use-cases/factories/user/make-register-use-case.ts
function makeRegisterUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const signaturesRepository = new PrismaSignaturesRepository();
  const registerUseCase = new RegisterUseCase(
    usersRepository,
    signaturesRepository
  );
  return registerUseCase;
}

// src/services/send-email.ts
var import_nodemailer = __toESM(require("nodemailer"));
function sendEmail(_0) {
  return __async(this, arguments, function* ({
    to,
    from,
    text,
    html,
    subject
  }) {
    try {
      const transporter = import_nodemailer.default.createTransport({
        host: env.HOST_EMAIL,
        port: env.PORT_EMAIL,
        secure: true,
        auth: {
          user: env.USER_EMAIL,
          pass: env.PASS_EMAIL
        }
      });
      const mailOptions = {
        to,
        from,
        text,
        html,
        subject
      };
      const info = yield transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      console.error("Erro ao enviar o email:", error);
      throw error;
    }
  });
}

// src/services/get-url-youtube.ts
var ytdl = require("@distube/ytdl-core");

// src/utils/generateVerificationCode.ts
function generateVerificationCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }
  return code;
}

// src/use-cases/cases/email-verification/send-verification-code.ts
var SendVerificationCodeUseCase = class {
  constructor(emailVerificationRepository) {
    this.emailVerificationRepository = emailVerificationRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      email
    }) {
      const code = generateVerificationCode();
      let emailVerification;
      const existingVerification = yield this.emailVerificationRepository.findByEmail(email);
      if (existingVerification) {
        emailVerification = yield this.emailVerificationRepository.updateCode(
          email,
          code
        );
      } else {
        emailVerification = yield this.emailVerificationRepository.create(
          email,
          code
        );
      }
      yield sendEmail({
        to: email,
        from: env.USER_EMAIL,
        subject: "Muve - C\xF3digo de Verifica\xE7\xE3o",
        text: `Seu c\xF3digo de verifica\xE7\xE3o \xE9: ${code}`,
        html: `<p>Seu c\xF3digo de verifica\xE7\xE3o \xE9: <strong>${code}</strong></p>`
      });
      return {
        email: emailVerification
      };
    });
  }
};

// src/use-cases/factories/email-verification/make-send-verification-code-use-case.ts
function makeSendVerificationCodeUseCase() {
  const emailVerificationRepository = new PrismaEmailVerificationRepository();
  const sendVerificationCodeUseCase = new SendVerificationCodeUseCase(
    emailVerificationRepository
  );
  return sendVerificationCodeUseCase;
}

// src/http/controllers/users/register.ts
function register(request, reply) {
  return __async(this, null, function* () {
    const registerBodySchema = import_zod2.z.object({
      name: import_zod2.z.string(),
      phone: import_zod2.z.string(),
      document: import_zod2.z.string(),
      password: import_zod2.z.string(),
      email: import_zod2.z.string().email()
    });
    const { name, email, document, phone, password } = registerBodySchema.parse(
      request.body
    );
    try {
      const registerUseCase = makeRegisterUseCase();
      const sendVerificationCodeUseCase = makeSendVerificationCodeUseCase();
      const { user } = yield registerUseCase.execute({
        name,
        email,
        phone,
        document,
        password
      });
      if (user) {
        sendVerificationCodeUseCase.execute({
          email: user.email
        });
      }
      user.password_hash = "";
      return reply.status(201).send({ user });
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  register
});
