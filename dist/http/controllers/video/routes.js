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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
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

// src/http/controllers/video/routes.ts
var routes_exports = {};
__export(routes_exports, {
  videosRoutes: () => videosRoutes
});
module.exports = __toCommonJS(routes_exports);

// src/http/middlewares/verify-jwt.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
function verifyJwt(request, reply) {
  return __async(this, null, function* () {
    var _a;
    try {
      const token = (_a = request.headers.authorization) == null ? void 0 : _a.split(" ")[1];
      console.log(token);
      if (!token) {
        return reply.status(401).send({ message: "Unauthorized" });
      }
      const decoded = import_jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
      request.user = { sub: decoded.sub, role: decoded.role };
    } catch (err) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
  });
}

// src/http/controllers/video/create.ts
var import_zod2 = require("zod");

// src/use-cases/erros/not-found-error.ts
var NotFoundErros = class extends Error {
  constructor(text) {
    super(`${text} not found`);
  }
};

// src/use-cases/erros/access-denied-error.ts
var AccessDeniedError = class extends Error {
  constructor(resource) {
    super(`Access denied to ${resource}`);
    this.name = "AccessDeniedError";
  }
};

// src/utils/getThumbnail.ts
var getVideoThumbnail = (url) => {
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (youtubeMatch && youtubeMatch[1]) {
    const videoId = youtubeMatch[1];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    const videoId = vimeoMatch[1];
    return `https://vumbnail.com/${videoId}.jpg`;
  }
  return null;
};

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

// src/use-cases/cases/video/create.ts
var CreateVideoUseCase = class {
  constructor(usersRepository, videoRepository, folderRepository, chaptersRepository, videoAnalyticsRepository) {
    this.usersRepository = usersRepository;
    this.videoRepository = videoRepository;
    this.folderRepository = folderRepository;
    this.chaptersRepository = chaptersRepository;
    this.videoAnalyticsRepository = videoAnalyticsRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      url,
      name,
      type,
      userId,
      format,
      folderId,
      duration,
      chapters,
      colorProgress,
      fictitiousProgress
    }) {
      let video;
      const user = yield this.usersRepository.findById(userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const thumbnail = getVideoThumbnail(url);
      if (folderId) {
        const folder = yield this.folderRepository.findById(folderId);
        if (!folder) {
          throw new NotFoundErros("Folder");
        }
        if (type === "Vsl") {
          video = yield this.videoRepository.create({
            url,
            name,
            type,
            duration,
            color: colorProgress,
            fictitiousProgress,
            format,
            thumbnail,
            tags: "Teste",
            folder: {
              connect: { id: folderId }
            },
            user: {
              connect: { id: userId }
            }
          });
        } else {
          video = yield this.videoRepository.create({
            url,
            name,
            type,
            duration,
            format,
            thumbnail,
            fullscreen: true,
            playAndPause: true,
            speed: true,
            timeTraveled: true,
            videoDuration: true,
            volumeBar: true,
            volumeButton: true,
            tags: "Teste",
            folder: {
              connect: { id: folderId }
            },
            user: {
              connect: { id: userId }
            }
          });
          const chaptersData = chapters.map((chapter) => ({
            title: chapter.title,
            startTime: chapter.startTime,
            endTime: chapter.endTime,
            videoId: video.id
          }));
          yield this.chaptersRepository.createMany(chaptersData);
        }
        yield this.videoAnalyticsRepository.create({
          video: {
            connect: { id: video.id }
          }
        });
        return {
          video
        };
      } else {
        if (type === "Vsl") {
          video = yield this.videoRepository.create({
            url,
            name,
            type,
            duration,
            thumbnail,
            color: colorProgress,
            fictitiousProgress,
            tags: "Teste",
            format,
            user: {
              connect: { id: userId }
            }
          });
        } else {
          video = yield this.videoRepository.create({
            url,
            name,
            type,
            duration,
            thumbnail,
            format,
            fullscreen: true,
            playAndPause: true,
            speed: true,
            timeTraveled: true,
            videoDuration: true,
            volumeBar: true,
            volumeButton: true,
            tags: "Teste",
            user: {
              connect: { id: userId }
            }
          });
          const chaptersData = chapters.map((chapter) => ({
            title: chapter.title,
            startTime: chapter.startTime,
            endTime: chapter.endTime,
            videoId: video.id
          }));
          yield this.chaptersRepository.createMany(chaptersData);
        }
        yield this.videoAnalyticsRepository.create({
          video: {
            connect: { id: video.id }
          }
        });
        return {
          video
        };
      }
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

// src/repositories/prisma/prisma-folder-repository.ts
var PrismaFoldersRepository = class {
  findById(id) {
    return __async(this, null, function* () {
      const folder = yield prisma.folder.findFirst({
        where: {
          id
        },
        include: {
          videos: true
        }
      });
      return folder;
    });
  }
  findByUserId(userId) {
    return __async(this, null, function* () {
      const folder = yield prisma.folder.findFirst({
        where: {
          userId
        },
        include: {
          videos: true
        }
      });
      return folder;
    });
  }
  findManyByUserId(userId) {
    return __async(this, null, function* () {
      const folders = yield prisma.folder.findMany({
        where: {
          userId
        },
        include: {
          videos: {
            include: {
              analytics: {
                include: {
                  viewTimestamps: true,
                  viewUnique: true
                }
              },
              VideoButtons: true,
              Chapter: true
            }
          }
        }
      });
      return folders;
    });
  }
  favoriteFolder(folderId, value) {
    return __async(this, null, function* () {
      const folder = yield prisma.folder.update({
        where: {
          id: folderId
        },
        data: {
          favorite: value
        }
      });
      return folder;
    });
  }
  create(data) {
    return __async(this, null, function* () {
      const folder = yield prisma.folder.create({
        data,
        include: {
          videos: true
        }
      });
      return folder;
    });
  }
  delete(id) {
    return __async(this, null, function* () {
      const folder = yield prisma.folder.delete({
        where: {
          id
        }
      });
      return folder;
    });
  }
};

// src/repositories/prisma/prisma-chapter-repository.ts
var PrismaChaptersRepository = class {
  findManyByVideoId(videoId) {
    return __async(this, null, function* () {
      const chapters = yield prisma.chapter.findMany({
        where: {
          videoId
        }
      });
      return chapters;
    });
  }
  deleteManyByVideoId(videoId) {
    return __async(this, null, function* () {
      const result = yield prisma.$transaction((prisma5) => __async(this, null, function* () {
        const chapter = yield prisma5.chapter.deleteMany({
          where: {
            videoId
          }
        });
        return chapter;
      }));
      return result;
    });
  }
  createMany(data) {
    return __async(this, null, function* () {
      const chapter = yield prisma.chapter.createMany({
        data
      });
      return chapter;
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

// src/repositories/prisma/prisma-video-buttons-repository.ts
var PrismaVideoButtonsRepository = class {
  findManyByVideoId(videoId) {
    return __async(this, null, function* () {
      const videoButtons = yield prisma.videoButtons.findMany({
        where: {
          videoId
        }
      });
      return videoButtons;
    });
  }
  deleteManyByVideoId(videoId) {
    return __async(this, null, function* () {
      const result = yield prisma.$transaction((prisma5) => __async(this, null, function* () {
        const videoButtons = yield prisma5.videoButtons.deleteMany({
          where: {
            videoId
          }
        });
        return videoButtons;
      }));
      return result;
    });
  }
  createMany(data) {
    return __async(this, null, function* () {
      const videoButtons = yield prisma.videoButtons.createMany({
        data
      });
      return videoButtons;
    });
  }
};

// src/repositories/prisma/prisma-video-analytics-repository.ts
var PrimasVideoAnalyticsRepository = class {
  findById(id) {
    return __async(this, null, function* () {
      const video = yield prisma.videoAnalytics.findUnique({
        where: {
          id
        }
      });
      if (!video) {
        return null;
      }
      return video;
    });
  }
  findByVideoId(videoId) {
    return __async(this, null, function* () {
      const video = yield prisma.videoAnalytics.findFirst({
        where: {
          videoId
        },
        include: {
          viewTimestamps: true,
          viewUnique: true
        }
      });
      if (!video) {
        return null;
      }
      return video;
    });
  }
  create(data) {
    return __async(this, null, function* () {
      const video = yield prisma.videoAnalytics.create({
        data
      });
      return video;
    });
  }
  updateTotalPlays(id, totalPlays) {
    return __async(this, null, function* () {
      return prisma.videoAnalytics.update({
        where: { id },
        data: { totalPlays }
      });
    });
  }
  updateTotalViews(id, totalViews) {
    return __async(this, null, function* () {
      return prisma.videoAnalytics.update({
        where: { id },
        data: { totalViews }
      });
    });
  }
};

// src/repositories/prisma/prisma-email-verification-repository.ts
var import_client2 = require("@prisma/client");
var prisma2 = new import_client2.PrismaClient();

// src/use-cases/factories/video/make-create-video-use-case.ts
function makeCreateVideoUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const videoRepository = new PrimasVideosRepository();
  const folderRepository = new PrismaFoldersRepository();
  const chaptersRepository = new PrismaChaptersRepository();
  const videoAnalyticsRepository = new PrimasVideoAnalyticsRepository();
  const createVideoUseCase = new CreateVideoUseCase(
    usersRepository,
    videoRepository,
    folderRepository,
    chaptersRepository,
    videoAnalyticsRepository
  );
  return createVideoUseCase;
}

// src/http/controllers/video/create.ts
function createVideo(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const chapterSchema = import_zod2.z.object({
      title: import_zod2.z.string().nonempty(),
      startTime: import_zod2.z.string().nonempty(),
      endTime: import_zod2.z.string().nonempty()
    });
    const createVideoBodySchema = import_zod2.z.object({
      url: import_zod2.z.string(),
      type: import_zod2.z.enum(["Vsl", "Curso"]),
      format: import_zod2.z.enum(["9/16", "16/9"]),
      name: import_zod2.z.string(),
      duration: import_zod2.z.string(),
      folderId: import_zod2.z.string().optional(),
      colorProgress: import_zod2.z.string().optional(),
      fictitiousProgress: import_zod2.z.boolean().optional(),
      chapters: import_zod2.z.array(chapterSchema).optional()
    });
    const {
      url,
      name,
      type,
      format,
      folderId,
      duration,
      chapters,
      colorProgress,
      fictitiousProgress
    } = createVideoBodySchema.parse(request.body);
    const userId = (_a = request.user) == null ? void 0 : _a.sub;
    if (!userId) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    try {
      const createVideoUseCase = makeCreateVideoUseCase();
      const video = yield createVideoUseCase.execute({
        url,
        name,
        type,
        userId,
        format,
        folderId,
        duration,
        chapters,
        colorProgress,
        fictitiousProgress
      });
      return reply.status(201).send(video);
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/http/controllers/video/delete.ts
var import_zod3 = require("zod");

// src/use-cases/cases/video/delete.ts
var DeleteVideoUseCase = class {
  constructor(usersRepository, videoRepository) {
    this.usersRepository = usersRepository;
    this.videoRepository = videoRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      userId,
      videoId
    }) {
      const user = yield this.usersRepository.findById(userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const video = yield this.videoRepository.findById(videoId);
      if (!video) {
        throw new NotFoundErros("Video");
      }
      if (video.userId !== user.id) {
        throw new AccessDeniedError("Folder");
      }
      const deletedVideo = yield this.videoRepository.delete(videoId);
      return {
        deletedVideo
      };
    });
  }
};

// src/use-cases/factories/video/make-delete-video-use-case.ts
function makeDeleteVideoUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const videoRepository = new PrimasVideosRepository();
  const deleteVideoUseCase = new DeleteVideoUseCase(
    usersRepository,
    videoRepository
  );
  return deleteVideoUseCase;
}

// src/http/controllers/video/delete.ts
function deleteVideo(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const deleteVideoParamsSchema = import_zod3.z.object({
      videoId: import_zod3.z.string()
    });
    const { videoId } = deleteVideoParamsSchema.parse(request.params);
    const userId = (_a = request.user) == null ? void 0 : _a.sub;
    if (!userId) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    try {
      const deleteVideoUseCase = makeDeleteVideoUseCase();
      const video = yield deleteVideoUseCase.execute({
        userId,
        videoId
      });
      return reply.status(200).send(video);
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/http/controllers/video/get-video-by-id.ts
var import_zod4 = require("zod");

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
    const getVideoByIdParamsSchema = import_zod4.z.object({
      videoId: import_zod4.z.string()
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

// src/http/controllers/video/edit-player-video.ts
var import_zod5 = require("zod");

// src/use-cases/cases/video/edit-player-video.ts
var EditPlayerVideo = class {
  constructor(usersRepository, videoRepository, chaptersRepository, videoButtonsRepository) {
    this.usersRepository = usersRepository;
    this.videoRepository = videoRepository;
    this.chaptersRepository = chaptersRepository;
    this.videoButtonsRepository = videoButtonsRepository;
  }
  execute(data) {
    return __async(this, null, function* () {
      const user = yield this.usersRepository.findById(data.userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const video = yield this.videoRepository.findById(data.videoId);
      if (!video) {
        throw new NotFoundErros("Video");
      }
      if (video.userId !== user.id) {
        throw new AccessDeniedError("Video");
      }
      let chaptersData;
      let buttonsData;
      const videoUpdated = yield this.videoRepository.update(
        data.videoId,
        data.dataEdit
      );
      if (video.type === "Curso" && data.Chapters) {
        chaptersData = data.Chapters.map((chapter) => ({
          title: chapter.title,
          startTime: chapter.startTime,
          endTime: chapter.endTime,
          videoId: video.id
        }));
      }
      if (video.type === "Vsl" && data.Buttons) {
        buttonsData = data.Buttons.map((button) => __spreadProps(__spreadValues({}, button), {
          videoId: video.id
        }));
      }
      if (video.type === "Curso" && chaptersData) {
        yield this.chaptersRepository.deleteManyByVideoId(video.id);
        yield this.chaptersRepository.createMany(chaptersData);
      }
      if (video.type === "Vsl" && buttonsData) {
        yield this.videoButtonsRepository.deleteManyByVideoId(video.id);
        yield this.videoButtonsRepository.createMany(buttonsData);
      }
      return {
        videoUpdated
      };
    });
  }
};

// src/use-cases/factories/video/make-edit-player-video-use-case.ts
function makeEditPlayerVideo() {
  const usersRepository = new PrimasUsersRepository();
  const videoRepository = new PrimasVideosRepository();
  const chaptersRepository = new PrismaChaptersRepository();
  const videoButtonsRepository = new PrismaVideoButtonsRepository();
  const editPlayerVideo2 = new EditPlayerVideo(
    usersRepository,
    videoRepository,
    chaptersRepository,
    videoButtonsRepository
  );
  return editPlayerVideo2;
}

// src/http/controllers/video/edit-player-video.ts
function editPlayerVideo(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const buttonSchema = import_zod5.z.object({
      buttonType: import_zod5.z.enum(["below", "inside"]),
      buttonText: import_zod5.z.string().nonempty(),
      buttonSize: import_zod5.z.string().nonempty(),
      buttonLink: import_zod5.z.string().url().nonempty(),
      startTime: import_zod5.z.string().nonempty(),
      endTime: import_zod5.z.string().nonempty(),
      buttonAfterTheVideoEnds: import_zod5.z.boolean().optional(),
      backgroundColor: import_zod5.z.string().nonempty(),
      textColor: import_zod5.z.string().nonempty(),
      hoverBackgroundColor: import_zod5.z.string().nonempty(),
      hoverTextColor: import_zod5.z.string().nonempty(),
      buttonPosition: import_zod5.z.string().nullable().optional()
    });
    const chapterSchema = import_zod5.z.object({
      title: import_zod5.z.string().nonempty(),
      startTime: import_zod5.z.string().nonempty(),
      endTime: import_zod5.z.string().nonempty()
    });
    const editPlayerParamsSchema = import_zod5.z.object({
      videoId: import_zod5.z.string()
    });
    const editPlayerVideoBodySchema = import_zod5.z.object({
      name: import_zod5.z.string().optional(),
      format: import_zod5.z.enum(["9/16", "16/9"]).optional(),
      thumbnail: import_zod5.z.string().optional(),
      color: import_zod5.z.string().optional(),
      colorSmartPlayers: import_zod5.z.string().optional(),
      playAndPause: import_zod5.z.boolean().optional(),
      progressBar: import_zod5.z.boolean().optional(),
      timeTraveled: import_zod5.z.boolean().optional(),
      videoDuration: import_zod5.z.boolean().optional(),
      volumeButton: import_zod5.z.boolean().optional(),
      volumeBar: import_zod5.z.boolean().optional(),
      speed: import_zod5.z.boolean().optional(),
      fullscreen: import_zod5.z.boolean().optional(),
      smartAutoPlay: import_zod5.z.boolean().optional(),
      UrlCoverSmartAutoPlay: import_zod5.z.string().optional(),
      TextTopSmartAutoPlay: import_zod5.z.string().optional(),
      TextButtonSmartAutoPlay: import_zod5.z.string().optional(),
      continueWatching: import_zod5.z.boolean().optional(),
      watchingNow: import_zod5.z.boolean().optional(),
      watchingNowFontSize: import_zod5.z.string().optional(),
      watchingNowBgColor: import_zod5.z.string().optional(),
      watchingNowTextColor: import_zod5.z.string().optional(),
      ImageVideoPause: import_zod5.z.boolean().optional(),
      UrlCoverImageVideoPause: import_zod5.z.string().optional(),
      ImageOfFinished: import_zod5.z.boolean().optional(),
      UrlCoverImageOfFinished: import_zod5.z.string().optional(),
      chapterMenu: import_zod5.z.boolean().optional(),
      buttonsActive: import_zod5.z.boolean().optional(),
      Chapter: import_zod5.z.array(chapterSchema).optional(),
      VideoButtons: import_zod5.z.array(buttonSchema).optional(),
      fictitiousProgressHeight: import_zod5.z.string().optional(),
      fictitiousProgress: import_zod5.z.boolean().optional()
    });
    const data = editPlayerVideoBodySchema.parse(request.body);
    const { videoId } = editPlayerParamsSchema.parse(request.params);
    const userId = (_a = request.user) == null ? void 0 : _a.sub;
    if (!userId) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    try {
      const editPlayerVideoUseCase = makeEditPlayerVideo();
      const _b = data, { Chapter, VideoButtons } = _b, dataEdit = __objRest(_b, ["Chapter", "VideoButtons"]);
      const video = yield editPlayerVideoUseCase.execute({
        videoId,
        userId,
        dataEdit,
        Chapters: Chapter,
        Buttons: VideoButtons
      });
      return reply.status(200).send(video);
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      if (err instanceof AccessDeniedError) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/use-cases/cases/video/get-many-videos-by-user-id.ts
var GetManyVideoByUserIdUseCase = class {
  constructor(usersRepository, videoRepository) {
    this.usersRepository = usersRepository;
    this.videoRepository = videoRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      userId
    }) {
      const user = yield this.usersRepository.findById(userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const videos = yield this.videoRepository.findManyByUserId(userId);
      return {
        videos
      };
    });
  }
};

// src/use-cases/factories/video/make-get-many-videos-by-user-id.ts
function makeGetManyVideoByUserIdUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const videoRepository = new PrimasVideosRepository();
  const getManyVideoByUserIdUseCase = new GetManyVideoByUserIdUseCase(
    usersRepository,
    videoRepository
  );
  return getManyVideoByUserIdUseCase;
}

// src/http/controllers/video/get-many-videos-by-user-id.ts
function getManyVideoByUserId(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const userId = (_a = request.user) == null ? void 0 : _a.sub;
    if (!userId) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    try {
      const getManyVideoByUserIdUseCase = makeGetManyVideoByUserIdUseCase();
      const videos = yield getManyVideoByUserIdUseCase.execute({
        userId
      });
      return reply.status(200).send(videos);
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/use-cases/cases/video/get-many-videos-not-folder-id.ts
var GetManyVideoNotFolderIdUseCase = class {
  constructor(usersRepository, videoRepository) {
    this.usersRepository = usersRepository;
    this.videoRepository = videoRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      userId
    }) {
      const user = yield this.usersRepository.findById(userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const videos = yield this.videoRepository.findManyByNotFolderId(userId);
      return {
        videos
      };
    });
  }
};

// src/use-cases/factories/video/make-get-many-videos-not-folder-id-use-case.ts
function makeGetManyVideoNotFolderIdUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const videoRepository = new PrimasVideosRepository();
  const getManyVideoNotFolderIdUseCase = new GetManyVideoNotFolderIdUseCase(
    usersRepository,
    videoRepository
  );
  return getManyVideoNotFolderIdUseCase;
}

// src/http/controllers/video/get-many-videos-not-folder-id.ts
function getManyVideoNotFolderId(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const userId = (_a = request.user) == null ? void 0 : _a.sub;
    if (!userId) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    try {
      const getManyVideoNotFolderIdUseCase = makeGetManyVideoNotFolderIdUseCase();
      const videos = yield getManyVideoNotFolderIdUseCase.execute({
        userId
      });
      return reply.status(200).send(videos);
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
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
var verify_signature_default = checkSignatureMiddleware;

// src/http/middlewares/verify-limit.ts
var import_client4 = require("@prisma/client");
var prisma4 = new import_client4.PrismaClient();
var checkVideoLimitMiddleware = (request, reply) => __async(void 0, null, function* () {
  var _a;
  const userId = (_a = request.user) == null ? void 0 : _a.sub;
  if (!userId) {
    return reply.status(401).send({ message: "Usu\xE1rio n\xE3o autenticado." });
  }
  try {
    const signature = yield prisma4.signature.findFirst({
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
    const videoCount = yield prisma4.video.count({
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

// src/http/controllers/video/edit-folderId-video.ts
var import_zod6 = require("zod");

// src/use-cases/cases/video/edit-folderId-video.ts
var EditFolderIdVideoUseCase = class {
  constructor(userRepository, videoRepository, folderRepository) {
    this.userRepository = userRepository;
    this.videoRepository = videoRepository;
    this.folderRepository = folderRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      videoId,
      folderId,
      userId
    }) {
      const user = yield this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const folder = yield this.folderRepository.findById(folderId);
      if (!folder) {
        throw new NotFoundErros("Folder");
      }
      const video = yield this.videoRepository.findById(videoId);
      if (!video) {
        throw new NotFoundErros("Video");
      }
      if (video.userId !== user.id && folder.userId !== user.id) {
        throw new AccessDeniedError("Folder");
      }
      if (video.userId !== user.id) {
        throw new AccessDeniedError("Video");
      }
      const newVideo = yield this.videoRepository.updateFolderId(
        videoId,
        folderId
      );
      return { video: newVideo };
    });
  }
};

// src/use-cases/factories/video/make-edit-folderId-vide-use-case.ts
function makeEditFolderIdVideoUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const videoRepository = new PrimasVideosRepository();
  const folderRepository = new PrismaFoldersRepository();
  const editFolderIdVideoUseCase = new EditFolderIdVideoUseCase(
    usersRepository,
    videoRepository,
    folderRepository
  );
  return editFolderIdVideoUseCase;
}

// src/http/controllers/video/edit-folderId-video.ts
function editFolderIdVideo(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const editFolderIdVideoBodySchema = import_zod6.z.object({
      videoId: import_zod6.z.string(),
      folderId: import_zod6.z.string()
    });
    const { videoId, folderId } = editFolderIdVideoBodySchema.parse(request.body);
    const userId = (_a = request.user) == null ? void 0 : _a.sub;
    if (!userId) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    try {
      const editFolderIdVideoUseCase = makeEditFolderIdVideoUseCase();
      const { video } = yield editFolderIdVideoUseCase.execute({
        userId,
        videoId,
        folderId
      });
      return reply.status(200).send(video);
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      if (err instanceof AccessDeniedError) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/http/controllers/video/routes.ts
function videosRoutes(app) {
  return __async(this, null, function* () {
    app.get("/video/:videoId", getVideoById);
    app.post(
      "/video",
      {
        onRequest: [
          verifyJwt,
          verify_signature_default,
          verify_limit_default
        ]
      },
      createVideo
    );
    app.post(
      "/edit/player/video/:videoId",
      {
        onRequest: [verifyJwt, verify_signature_default]
      },
      editPlayerVideo
    );
    app.get(
      "/video/not/folder",
      { onRequest: [verifyJwt, verify_signature_default] },
      getManyVideoNotFolderId
    );
    app.delete(
      "/video/:videoId",
      { onRequest: [verifyJwt, verify_signature_default] },
      deleteVideo
    );
    app.post(
      "/edit/folder/video",
      { onRequest: [verifyJwt, verify_signature_default] },
      editFolderIdVideo
    );
    app.get(
      "/video/all",
      { onRequest: [verifyJwt, verify_signature_default] },
      getManyVideoByUserId
    );
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  videosRoutes
});
