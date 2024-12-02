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

// src/http/controllers/users/routes.ts
var routes_exports = {};
__export(routes_exports, {
  usersRoutes: () => usersRoutes
});
module.exports = __toCommonJS(routes_exports);

// src/http/controllers/users/register.ts
var import_zod2 = require("zod");

// src/use-cases/erros/not-found-error.ts
var NotFoundErros = class extends Error {
  constructor(text) {
    super(`${text} not found`);
  }
};

// src/use-cases/erros/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("Invalid credentials.");
  }
};

// src/use-cases/erros/user-already-exists-error.ts
var UserAlreadyExistsError = class extends Error {
  constructor() {
    super("E-mail already exists.");
  }
};

// src/use-cases/erros/late-signature-error.ts
var LateSubscriptionError = class extends Error {
  constructor() {
    super(`Late Subscription. Renew your plan to gain access`);
    this.name = "LateSubscriptionError";
  }
};

// src/use-cases/erros/subscription-canceled-error.ts
var SubscriptionCancelledError = class extends Error {
  constructor() {
    super(`Subscription cancelled, Subscribe to a plan to gain access`);
    this.name = "SubscriptionCancelledError";
  }
};

// src/use-cases/erros/subscription-paused-error.ts
var SubscriptionPausedError = class extends Error {
  constructor() {
    super("Subscription is paused due to overdue next charge date.");
    this.name = "SubscriptionPausedError";
  }
};

// src/use-cases/erros/email-verification-not-found-error.ts
var EmailVerificationNotFoundError = class extends Error {
  constructor() {
    super("Email verification not found or not verified.");
    this.name = "EmailVerificationNotFoundError";
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

// src/use-cases/cases/users/checkJwt.ts
var CheckJwtUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      userId
    }) {
      const user = yield this.usersRepository.findById(userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      return {
        user
      };
    });
  }
};

// src/use-cases/factories/user/make-checkJwt-use-case.ts
function makeCheckJwtUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const checkJwtUseCase = new CheckJwtUseCase(usersRepository);
  return checkJwtUseCase;
}

// src/http/controllers/users/checkJwt.ts
function checkJwt(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const userId = (_a = request.user) == null ? void 0 : _a.sub;
    if (!userId) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    try {
      const checkJwtUseCase = makeCheckJwtUseCase();
      const { user } = yield checkJwtUseCase.execute({
        userId
      });
      user.password_hash = "";
      return reply.status(200).send({
        user
      });
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(400).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/http/controllers/users/checkEmail.ts
var import_zod3 = require("zod");

// src/use-cases/cases/users/check-email.ts
var CheckEmailUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      email
    }) {
      const user = yield this.usersRepository.findByEmail(email);
      if (user) {
        throw new UserAlreadyExistsError();
      }
      return {
        user
      };
    });
  }
};

// src/use-cases/factories/user/make-check-email-use-case.ts
function makeCheckEmailUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const checkEmailUseCase = new CheckEmailUseCase(usersRepository);
  return checkEmailUseCase;
}

// src/http/controllers/users/checkEmail.ts
function checkEmail(request, reply) {
  return __async(this, null, function* () {
    const checkEmailBodySchema = import_zod3.z.object({
      email: import_zod3.z.string().email()
    });
    const { email } = checkEmailBodySchema.parse(request.body);
    try {
      const checkEmailUseCase = makeCheckEmailUseCase();
      yield checkEmailUseCase.execute({
        email
      });
      return reply.status(200).send(true);
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        return reply.status(400).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/http/controllers/users/authenticate.ts
var import_zod4 = require("zod");

// src/use-cases/cases/users/authenticate.ts
var import_bcryptjs2 = require("bcryptjs");
var AuthenticateUseCase = class {
  constructor(usersRepository, signaturesRepository, emailVerificationRepository) {
    this.usersRepository = usersRepository;
    this.signaturesRepository = signaturesRepository;
    this.emailVerificationRepository = emailVerificationRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      email,
      password
    }) {
      const user = yield this.usersRepository.findByEmail(email);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const doestPasswordMatches = yield (0, import_bcryptjs2.compare)(password, user.password_hash);
      console.log(doestPasswordMatches);
      if (!doestPasswordMatches) {
        throw new InvalidCredentialsError();
      }
      const signature = yield this.signaturesRepository.checkStatusSignature(
        user.id
      );
      if (!signature) {
        throw new NotFoundErros("Subscription");
      }
      if (signature.status === "canceled") {
        throw new SubscriptionCancelledError();
      }
      if (signature.status === "pending") {
        throw new LateSubscriptionError();
      }
      const { isVerified } = yield this.emailVerificationRepository.findByEmail(
        user.email
      );
      if (!isVerified) {
        throw new EmailVerificationNotFoundError();
      }
      if (signature.status === "free") {
        return {
          user,
          signature
        };
      }
      const currentDate = /* @__PURE__ */ new Date();
      const nextChargeDate = new Date(signature.next_charge_date);
      if (currentDate > nextChargeDate) {
        yield this.signaturesRepository.updateStatusSignature(user.id, "PAUSED");
        throw new SubscriptionPausedError();
      }
      return {
        user,
        signature
      };
    });
  }
};

// src/use-cases/factories/user/make-authenticate-use-case.ts
function makeAuthenticateUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const signaturesRepository = new PrismaSignaturesRepository();
  const emailVerificationRepository = new PrismaEmailVerificationRepository();
  const authenticateUseCase = new AuthenticateUseCase(
    usersRepository,
    signaturesRepository,
    emailVerificationRepository
  );
  return authenticateUseCase;
}

// src/http/controllers/users/authenticate.ts
function authenticate(request, reply) {
  return __async(this, null, function* () {
    const authenticateBodySchema = import_zod4.z.object({
      email: import_zod4.z.string().email(),
      password: import_zod4.z.string().min(6)
    });
    const { email, password } = authenticateBodySchema.parse(request.body);
    try {
      const authenticateUseCase = makeAuthenticateUseCase();
      const { user, signature } = yield authenticateUseCase.execute({
        email,
        password
      });
      const token = yield reply.jwtSign(
        {
          role: user.role
        },
        {
          sign: {
            sub: user.id,
            expiresIn: "7d"
          }
        }
      );
      user.password_hash = "";
      return reply.status(200).send({
        user,
        token,
        signature
      });
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        return reply.status(400).send({ message: err.message });
      }
      if (err instanceof SubscriptionCancelledError) {
        return reply.status(400).send({ message: err.message });
      }
      if (err instanceof LateSubscriptionError) {
        return reply.status(400).send({ message: err.message });
      }
      if (err instanceof SubscriptionPausedError) {
        return reply.status(400).send({ message: err.message });
      }
      if (err instanceof EmailVerificationNotFoundError) {
        return reply.status(400).send({ message: err.message });
      }
      if (err instanceof NotFoundErros) {
        return reply.status(400).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/http/controllers/users/update-email.ts
var import_zod5 = require("zod");

// src/use-cases/cases/users/update-email.ts
var import_bcryptjs3 = require("bcryptjs");
var UpdateEmailUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      email,
      newEmail,
      password
    }) {
      const user = yield this.usersRepository.findByEmail(email);
      if (!user) {
        throw new InvalidCredentialsError();
      }
      const userNewEmail = yield this.usersRepository.findByEmail(newEmail);
      if (userNewEmail) {
        throw new InvalidCredentialsError();
      }
      const doestPasswordMatches = yield (0, import_bcryptjs3.compare)(password, user.password_hash);
      if (!doestPasswordMatches) {
        throw new InvalidCredentialsError();
      }
      const newUser = yield this.usersRepository.update(user.id, __spreadProps(__spreadValues({}, user), {
        email: newEmail
      }));
      return {
        user: newUser
      };
    });
  }
};

// src/use-cases/factories/user/make-update-email-use-case.ts
function makeUpdateEmailUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const updateEmailUseCase = new UpdateEmailUseCase(usersRepository);
  return updateEmailUseCase;
}

// src/http/controllers/users/update-email.ts
function updateEmail(request, reply) {
  return __async(this, null, function* () {
    const updateEmailBodySchema = import_zod5.z.object({
      email: import_zod5.z.string().email(),
      newEmail: import_zod5.z.string().email(),
      password: import_zod5.z.string().min(6)
    });
    const { email, password, newEmail } = updateEmailBodySchema.parse(
      request.body
    );
    try {
      const updateEmailUseCase = makeUpdateEmailUseCase();
      const { user } = yield updateEmailUseCase.execute({
        email,
        newEmail,
        password
      });
      user.password_hash = "";
      return reply.status(200).send({
        user
      });
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        return reply.status(400).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/http/controllers/users/update-profile.ts
var import_zod6 = require("zod");

// src/use-cases/cases/users/update-profile.ts
var UpdateProfileUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      document,
      name,
      phone,
      userId
    }) {
      const user = yield this.usersRepository.findById(userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const updatedUser = yield this.usersRepository.update(userId, {
        document,
        name,
        phone
      });
      return {
        user: updatedUser
      };
    });
  }
};

// src/use-cases/factories/user/make-update-profile-use-case.ts
function makeUpdateProfileUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const updateProfileUseCase = new UpdateProfileUseCase(usersRepository);
  return updateProfileUseCase;
}

// src/http/controllers/users/update-profile.ts
function updateProfile(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const updateProfileBodySchema = import_zod6.z.object({
      document: import_zod6.z.string(),
      phone: import_zod6.z.string(),
      name: import_zod6.z.string()
    });
    const userId = (_a = request.user) == null ? void 0 : _a.sub;
    const { document, name, phone } = updateProfileBodySchema.parse(request.body);
    try {
      const updateProfileUseCase = makeUpdateProfileUseCase();
      const { user } = yield updateProfileUseCase.execute({
        document,
        name,
        phone,
        userId
      });
      user.password_hash = "";
      return reply.status(200).send({
        user
      });
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        return reply.status(400).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/http/controllers/users/update-password.ts
var import_zod7 = require("zod");

// src/use-cases/cases/users/update-password.ts
var import_bcryptjs4 = require("bcryptjs");
var UpdatePasswordUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      userId,
      password,
      newPassword
    }) {
      const user = yield this.usersRepository.findById(userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const doestPasswordMatches = yield (0, import_bcryptjs4.compare)(password, user.password_hash);
      if (!doestPasswordMatches) {
        throw new InvalidCredentialsError();
      }
      const newPasswordHashed = yield (0, import_bcryptjs4.hash)(newPassword, 6);
      const newUser = yield this.usersRepository.update(user.id, __spreadProps(__spreadValues({}, user), {
        password_hash: newPasswordHashed
      }));
      return {
        user: newUser
      };
    });
  }
};

// src/use-cases/factories/user/make-update-password-use-case.ts
function makeUpdatePasswordUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const updatePasswordUseCase = new UpdatePasswordUseCase(usersRepository);
  return updatePasswordUseCase;
}

// src/http/controllers/users/update-password.ts
function updatePassword(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const updatePasswordBodySchema = import_zod7.z.object({
      newPassword: import_zod7.z.string().min(6),
      password: import_zod7.z.string().min(6)
    });
    const userId = (_a = request.user) == null ? void 0 : _a.sub;
    const { password, newPassword } = updatePasswordBodySchema.parse(request.body);
    try {
      const updatePasswordUseCase = makeUpdatePasswordUseCase();
      const { user } = yield updatePasswordUseCase.execute({
        userId,
        password,
        newPassword
      });
      user.password_hash = "";
      return reply.status(200).send({
        user
      });
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        return reply.status(400).send({ message: err.message });
      }
      if (err instanceof NotFoundErros) {
        return reply.status(400).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/http/controllers/users/forgot-password.ts
var import_zod8 = require("zod");

// src/use-cases/cases/users/forgot-password.ts
var import_bcryptjs5 = require("bcryptjs");
var ForgotPasswordUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      userId,
      newPassword,
      confirmNewPassword
    }) {
      const user = yield this.usersRepository.findById(userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const newPasswordHashed = yield (0, import_bcryptjs5.hash)(newPassword, 6);
      const newUser = yield this.usersRepository.update(user.id, __spreadProps(__spreadValues({}, user), {
        password_hash: newPasswordHashed
      }));
      return {
        user: newUser
      };
    });
  }
};

// src/use-cases/factories/user/make-forgot-password-use-case.ts
function makeForgotPasswordUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const forgotPasswordUseCase = new ForgotPasswordUseCase(usersRepository);
  return forgotPasswordUseCase;
}

// src/http/controllers/users/forgot-password.ts
function forgotPassword(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const updatePasswordBodySchema = import_zod8.z.object({
      newPassword: import_zod8.z.string().min(6),
      confirmNewPassword: import_zod8.z.string().min(6)
    });
    const userId = (_a = request.user) == null ? void 0 : _a.sub;
    const { confirmNewPassword, newPassword } = updatePasswordBodySchema.parse(
      request.body
    );
    try {
      const forgotPasswordUseCase = makeForgotPasswordUseCase();
      const { user } = yield forgotPasswordUseCase.execute({
        userId,
        newPassword,
        confirmNewPassword
      });
      user.password_hash = "";
      return reply.status(200).send({
        user
      });
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        return reply.status(400).send({ message: err.message });
      }
      if (err instanceof NotFoundErros) {
        return reply.status(400).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/http/controllers/users/add-info-first-access.ts
var import_zod9 = require("zod");
var import_jsonwebtoken = require("jsonwebtoken");

// src/use-cases/cases/users/add-info-first-access.ts
var AddInfoFirstAccessUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      userId,
      accountType,
      memberArea,
      videoHosting
    }) {
      const user = yield this.usersRepository.findById(userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const newUser = yield this.usersRepository.update(user.id, __spreadProps(__spreadValues({}, user), {
        accountType,
        memberArea,
        videoHosting
      }));
      return {
        user: newUser
      };
    });
  }
};

// src/use-cases/factories/user/make-add-info-first-access-use-case.ts
function makeAddInfoFirstAccessUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const addInfoFirstAccessUseCase = new AddInfoFirstAccessUseCase(
    usersRepository
  );
  return addInfoFirstAccessUseCase;
}

// src/http/controllers/users/add-info-first-access.ts
function AddInfoFirstAccess(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const addInfoFirstAccessBodySchema = import_zod9.z.object({
      accountType: import_zod9.z.string(),
      memberArea: import_zod9.z.string(),
      videoHosting: import_zod9.z.string()
    });
    const userId = (_a = request.user) == null ? void 0 : _a.sub;
    if (!userId) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    const { accountType, memberArea, videoHosting } = addInfoFirstAccessBodySchema.parse(request.body);
    try {
      const addInfoFirstAccessUseCase = makeAddInfoFirstAccessUseCase();
      yield addInfoFirstAccessUseCase.execute({
        accountType,
        memberArea,
        videoHosting,
        userId
      });
      return reply.status(200).send(true);
    } catch (err) {
      if (err instanceof import_jsonwebtoken.NotBeforeError) {
        return reply.status(400).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/http/controllers/users/generatePasswordResetToken.ts
var import_zod10 = require("zod");

// src/templates/resetPassword-email.ts
var ResetPasswordEmail = ({ link, name }) => {
  return `<!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"/><!--<![endif]-->
<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		sup,
		sub {
			line-height: 0;
			font-size: 75%;
		}

		@media (max-width:500px) {

			.desktop_hide table.icons-inner,
			.social_block.desktop_hide .social-table {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>
<body class="body" style="background-color: #f8f8f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #155ec3;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #155ec3; width: 480px; margin: 0 auto;" width="480">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #155ec3;"><span style="word-break: break-word;">\u200A</span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 480px; margin: 0 auto;" width="480">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:25px;padding-top:22px;width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment" style="line-height:10px">
<div style="max-width: 144px;"><img alt="I'm an image" height="auto" src="images/muve_azul.svg" style="display: block; height: auto; border: 0; width: 100%;" title="I'm an image" width="144"/></div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 480px; margin: 0 auto;" width="480">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-top:50px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span style="word-break: break-word;">\u200A</span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:30px;line-height:120%;text-align:left;mso-line-height-alt:36px;">
<p style="margin: 0;"><strong>Esqueceu sua senha? Vamos resolver isso agora!</strong></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">Ol\xE1, ${name}!</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;">Estamos aqui para te ajudar a redefinir sua senha e voltar ao controle dos seus v\xEDdeos no Muve em poucos minutos.</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;"><strong>Basta clicar no bot\xE3o abaixo para criar uma nova senha:</strong></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="button_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:10px;padding-right:10px;padding-top:15px;text-align:center;">
<div align="center" class="alignment"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:62px;width:193px;v-text-anchor:middle;" arcsize="97%" stroke="false" fillcolor="#155ec3">
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:Tahoma, sans-serif;font-size:16px">
<![endif]-->
<a href=${link} style="background-color:#155ec3;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:60px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:16px;font-weight:400;mso-border-alt:none;padding-bottom:15px;padding-top:15px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;"><span style="word-break: break-word; padding-left: 30px; padding-right: 30px; font-size: 16px; display: inline-block; letter-spacing: normal;"><span style="word-break: break-word; line-height: 32px;"><strong>Redefinir Senha</strong></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">Se voc\xEA n\xE3o solicitou essa altera\xE7\xE3o, fique tranquilo(a), sua conta est\xE1 segura. Basta ignorar este e-mail.</p>
<p style="margin: 0;">Qualquer coisa, \xE9 s\xF3 nos chamar!</p>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #f8f8f9; width: 480px; margin: 0 auto;" width="480">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="empty_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div></div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #2b303a; width: 480px; margin: 0 auto;" width="480">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #155ec3;"><span style="word-break: break-word;">\u200A</span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-top:40px;width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment" style="line-height:10px">
<div style="max-width: 96px;"><img alt="Alternate text" height="auto" src="images/d973e97e-79dc-46a2-a65d-817259bf3973.png" style="display: block; height: auto; border: 0; width: 100%;" title="Alternate text" width="96"/></div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="social_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:28px;text-align:center;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;" width="104px">
<tr>
<td style="padding:0 10px 0 10px;"><a href="https://www.facebook.com/people/Muve/61566478731090/" target="_blank"><img alt="Facebook" height="auto" src="images/facebook2x.png" style="display: block; height: auto; border: 0;" title="Facebook" width="32"/></a></td>
<td style="padding:0 10px 0 10px;"><a href="https://www.instagram.com/muveplayer/" target="_blank"><img alt="Instagram" height="auto" src="images/instagram2x.png" style="display: block; height: auto; border: 0;" title="Instagram" width="32"/></a></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:15px;">
<div style="color:#bbbbbb;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:12px;line-height:150%;text-align:left;mso-line-height-alt:18px;">
<p style="margin: 0; word-break: break-word;">Voc\xEA est\xE1 recebendo este e-mail porque fez uma compra ou se inscreveu no Muve. Siga-nos nas redes sociais e fique por dentro das novidades, dicas e atualiza\xE7\xF5es!<br/>Caso tenha alguma d\xFAvida, entre em contato com nossa equipe de suporte.</p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #555961;"><span style="word-break: break-word;">\u200A</span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:40px;padding-right:40px;padding-top:20px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:12px;line-height:120%;text-align:left;mso-line-height-alt:14.399999999999999px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #95979c;">Muve Copyright \xA9 2024</span></p>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #ffffff; width: 480px; margin: 0 auto;" width="480">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center; line-height: 0;" width="100%">
<tr>
<td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
<!--[if !vml]><!-->
<table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; padding-left: 0px; padding-right: 0px;"><!--<![endif]-->
<tr>
<td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"><a href="http://designedwithbeefree.com/" style="text-decoration: none;" target="_blank"><img align="center" alt="Beefree Logo" class="icon" height="auto" src="images/Beefree-logo.png" style="display: block; height: auto; margin: 0 auto; border: 0;" width="34"/></a></td>
<td style="font-family: 'Inter', sans-serif; font-size: 15px; font-weight: undefined; color: #1e0e4b; vertical-align: middle; letter-spacing: undefined; text-align: center; line-height: normal;"><a href="http://designedwithbeefree.com/" style="color: #1e0e4b; text-decoration: none;" target="_blank">Designed with Beefree</a></td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table><!-- End -->
</body>
</html>`;
};

// src/use-cases/cases/users/find-by-email.ts
var FindByEmailUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      email
    }) {
      const user = yield this.usersRepository.findByEmail(email);
      if (!user) {
        throw new NotFoundErros("User");
      }
      return {
        user
      };
    });
  }
};

// src/use-cases/factories/user/make-find-ny-email-use-case.ts
function makeFindByEmailUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const findByEmailUseCase = new FindByEmailUseCase(usersRepository);
  return findByEmailUseCase;
}

// src/http/controllers/users/generatePasswordResetToken.ts
function generatePasswordResetToken(request, reply) {
  return __async(this, null, function* () {
    const resetTokenSchema = import_zod10.z.object({
      email: import_zod10.z.string().email()
    });
    const { email } = resetTokenSchema.parse(request.body);
    try {
      const findByEmailUseCase = makeFindByEmailUseCase();
      const { user } = yield findByEmailUseCase.execute({
        email
      });
      const token = yield reply.jwtSign(
        {
          role: user.role
        },
        {
          sign: {
            sub: user.id,
            expiresIn: "1d"
          }
        }
      );
      const resetLink = `https://web.muveplayer.com/reset/password?token=${token}`;
      const emailContent = ResetPasswordEmail({
        link: resetLink,
        name: user.name
      });
      yield sendEmail({
        from: "contato@muveplayer.com",
        to: email,
        subject: "Redefini\xE7\xE3o de Senha Muve Player",
        html: emailContent
      });
      return reply.status(200).send({
        message: "Token de redefini\xE7\xE3o de senha enviado para o email."
      });
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/http/middlewares/verify-jwt.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
function verifyJwt(request, reply) {
  return __async(this, null, function* () {
    var _a;
    try {
      const token = (_a = request.headers.authorization) == null ? void 0 : _a.split(" ")[1];
      console.log(token);
      if (!token) {
        return reply.status(401).send({ message: "Unauthorized" });
      }
      const decoded = import_jsonwebtoken2.default.verify(token, process.env.JWT_SECRET);
      request.user = { sub: decoded.sub, role: decoded.role };
    } catch (err) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
  });
}

// src/http/middlewares/verify-signature.ts
var import_client3 = require("@prisma/client");
var prisma3 = new import_client3.PrismaClient();
var checkSignatureMiddleware = (request, reply) => __async(void 0, null, function* () {
  var _a;
  const userId = (_a = request.user) == null ? void 0 : _a.sub;
  if (!userId) {
    return reply.status(401).send({ message: "Usu\xE1rio n\xE3o autenticado." });
  }
  try {
    const signature = yield prisma3.signature.findFirst({
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

// src/http/controllers/users/routes.ts
function usersRoutes(app) {
  return __async(this, null, function* () {
    app.post("/users", register);
    app.post("/sessions", authenticate);
    app.post("/check/email", checkEmail);
    app.post("/send/password", generatePasswordResetToken);
    app.post("/forgot/password", { onRequest: [verifyJwt] }, forgotPassword);
    app.get(
      "/checkJWT",
      { onRequest: [verifyJwt, checkSignatureMiddleware] },
      checkJwt
    );
    app.post(
      "/first/access",
      { onRequest: [verifyJwt, checkSignatureMiddleware] },
      AddInfoFirstAccess
    );
    app.post(
      "/update/email",
      { onRequest: [verifyJwt, checkSignatureMiddleware] },
      updateEmail
    );
    app.post(
      "/update/password",
      { onRequest: [verifyJwt, checkSignatureMiddleware] },
      updatePassword
    );
    app.post(
      "/update/profile",
      { onRequest: [verifyJwt, checkSignatureMiddleware] },
      updateProfile
    );
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  usersRoutes
});
