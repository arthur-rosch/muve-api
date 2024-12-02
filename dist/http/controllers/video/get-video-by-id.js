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

// src/http/controllers/video/get-video-by-id.ts
var get_video_by_id_exports = {};
__export(get_video_by_id_exports, {
  getVideoById: () => getVideoById
});
module.exports = __toCommonJS(get_video_by_id_exports);
var import_zod2 = require("zod");

// src/use-cases/erros/not-found-error.ts
var NotFoundErros = class extends Error {
  constructor(text) {
    super(`${text} not found`);
  }
};

// src/use-cases/cases/video/get-video-by-id.ts
var GetVideoByIdUseCase = class {
  constructor(userRepository, videoRepository, signatureRepository) {
    this.userRepository = userRepository;
    this.videoRepository = videoRepository;
    this.signatureRepository = signatureRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      videoId
    }) {
      console.log(videoId);
      const video = yield this.videoRepository.findById(videoId);
      console.log(video);
      if (!video) {
        throw new NotFoundErros("Video");
      }
      const user = yield this.userRepository.findById(video.userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const signature = yield this.signatureRepository.findByUserId(video.userId);
      if (!signature) {
        return { message: "Usu\xE1rio sem Plano" };
      }
      if (signature.status === "canceled") {
        return { message: "Assinatura cancelada." };
      }
      if (signature.status === "past_due") {
        return { message: "Assinatura com pagamento atrasado." };
      }
      if (signature.status === "trialing") {
        const trialEndDate = signature.trial_end_date;
        if (trialEndDate && new Date(trialEndDate) < /* @__PURE__ */ new Date()) {
          return { message: "Per\xEDodo de teste expirado." };
        }
      }
      if (signature.status !== "active" && signature.status !== "trialing") {
        return { message: "Assinatura inv\xE1lida." };
      }
      return { video };
    });
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

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : []
});

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

// src/repositories/prisma/prisma-video-repository.ts
var PrimasVideosRepository = class {
  findById(id) {
    return __async(this, null, function* () {
      const video = yield prisma.video.findUnique({
        where: {
          id
        },
        include: {
          Chapter: true,
          VideoButtons: true
        }
      });
      return video;
    });
  }
  findByUserId(userId) {
    return __async(this, null, function* () {
      const video = yield prisma.video.findFirst({
        where: {
          userId
        },
        include: {
          Chapter: true,
          VideoButtons: true
        }
      });
      return video;
    });
  }
  findByPlayerId(id) {
    return __async(this, null, function* () {
      const video = yield prisma.video.findFirst({
        where: {
          videoPlayerid: id
        }
      });
      return video;
    });
  }
  findManyByUserId(userId) {
    return __async(this, null, function* () {
      const videos = yield prisma.video.findMany({
        where: {
          userId
        },
        include: {
          Chapter: true,
          VideoButtons: true,
          analytics: {
            include: {
              viewTimestamps: true,
              viewUnique: true
            }
          }
        }
      });
      return videos;
    });
  }
  findManyByNotFolderId(userId) {
    return __async(this, null, function* () {
      const videosNotFolderId = yield prisma.video.findMany({
        where: {
          userId,
          folderId: void 0
        },
        include: {
          Chapter: true,
          VideoButtons: true,
          analytics: {
            include: {
              viewTimestamps: true,
              viewUnique: true
            }
          }
        }
      });
      return videosNotFolderId;
    });
  }
  create(data) {
    return __async(this, null, function* () {
      const video = yield prisma.video.create({
        data
      });
      return video;
    });
  }
  update(videoId, data) {
    return __async(this, null, function* () {
      const video = yield prisma.video.update({
        where: {
          id: videoId
        },
        data
      });
      return video;
    });
  }
  delete(id) {
    return __async(this, null, function* () {
      const video = yield prisma.video.delete({
        where: {
          id
        }
      });
      return video;
    });
  }
  deleteAll(userId) {
    return __async(this, null, function* () {
      const video = yield prisma.video.deleteMany({
        where: {
          userId
        }
      });
      return video;
    });
  }
  updateFolderId(videoId, folderId) {
    return __async(this, null, function* () {
      const video = yield prisma.video.update({
        where: {
          id: videoId
        },
        data: {
          folder: {
            connect: {
              id: folderId
            }
          }
        }
      });
      return video;
    });
  }
};

// src/lib/stripe.ts
var import_stripe = __toESM(require("stripe"));
var stripe = new import_stripe.default(env.STRIPE_SECRET_KEY);

// src/lib/mixpanel.ts
var import_mixpanel = __toESM(require("mixpanel"));
var mixpanel = import_mixpanel.default.init("5fbda77db1c3a9a99cc4b9d70c4b9cee");

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

// src/use-cases/factories/video/make-get-video-by-id.ts
function makeGetVideoByIdUseCase() {
  const videoRepository = new PrimasVideosRepository();
  const usersRepository = new PrimasUsersRepository();
  const signatureRepository = new PrismaSignaturesRepository();
  const getVideoByIdUseCase = new GetVideoByIdUseCase(
    usersRepository,
    videoRepository,
    signatureRepository
  );
  return getVideoByIdUseCase;
}

// src/http/controllers/video/get-video-by-id.ts
function getVideoById(request, reply) {
  return __async(this, null, function* () {
    const getVideoByIdParamsSchema = import_zod2.z.object({
      videoId: import_zod2.z.string()
    });
    const { videoId } = getVideoByIdParamsSchema.parse(request.params);
    try {
      const getVideoByIdUseCase = makeGetVideoByIdUseCase();
      const video = yield getVideoByIdUseCase.execute({
        videoId
      });
      console.log(video);
      return reply.status(200).send(video);
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getVideoById
});
