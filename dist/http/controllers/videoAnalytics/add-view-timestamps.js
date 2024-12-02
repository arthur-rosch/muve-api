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

// src/http/controllers/videoAnalytics/add-view-timestamps.ts
var add_view_timestamps_exports = {};
__export(add_view_timestamps_exports, {
  addViewTimestamps: () => addViewTimestamps
});
module.exports = __toCommonJS(add_view_timestamps_exports);
var import_zod2 = require("zod");

// src/use-cases/erros/not-found-error.ts
var NotFoundErros = class extends Error {
  constructor(text) {
    super(`${text} not found`);
  }
};

// src/use-cases/cases/videoAnalytics/add-view-timestamps.ts
var AddViewTimestampsUseCase = class {
  constructor(usersRepository, videoRepository, videoAnalyticsRepository, viewTimestampRepository) {
    this.usersRepository = usersRepository;
    this.videoRepository = videoRepository;
    this.videoAnalyticsRepository = videoAnalyticsRepository;
    this.viewTimestampRepository = viewTimestampRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      userIp,
      videoId,
      endTimestamp,
      startTimestamp,
      deviceType,
      agent,
      country,
      region,
      city
    }) {
      const video = yield this.videoRepository.findById(videoId);
      if (!video) {
        throw new NotFoundErros("Video");
      }
      const analytics = yield this.videoAnalyticsRepository.findByVideoId(videoId);
      if (!analytics) {
        throw new NotFoundErros("Video Analytics");
      }
      const view = yield this.viewTimestampRepository.create({
        endTimestamp,
        startTimestamp,
        videoAnalytics: {
          connect: { id: analytics.id }
        },
        userIp,
        deviceType,
        agent,
        country,
        region,
        city
      });
      const updatedAnalytics = yield this.videoAnalyticsRepository.updateTotalPlays(
        analytics.id,
        analytics.totalPlays + 1
      );
      return {
        analytics: updatedAnalytics,
        view
      };
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

// src/repositories/prisma/prisma-view-timestamp-repository.ts
var PrimasViewTimestampRepository = class {
  findById(id) {
    return __async(this, null, function* () {
      const view = yield prisma.viewTimestamp.findUnique({
        where: {
          id
        }
      });
      if (!view) {
        return null;
      }
      return view;
    });
  }
  findManyByVideoAnalyticsId(videoAnalyticsId) {
    return __async(this, null, function* () {
      const views = yield prisma.viewTimestamp.findMany({
        where: {
          videoAnalyticsId
        }
      });
      return views;
    });
  }
  create(data) {
    return __async(this, null, function* () {
      const view = yield prisma.viewTimestamp.create({
        data
      });
      return view;
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

// src/use-cases/factories/videoAnalytics/make-add-view-timestamps-use-case.ts
function makeAddViewTimestampsUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const videoRepository = new PrimasVideosRepository();
  const viewTimestampRepository = new PrimasViewTimestampRepository();
  const videoAnalyticsRepository = new PrimasVideoAnalyticsRepository();
  const addViewTimestampsUseCase = new AddViewTimestampsUseCase(
    usersRepository,
    videoRepository,
    videoAnalyticsRepository,
    viewTimestampRepository
  );
  return addViewTimestampsUseCase;
}

// src/http/controllers/videoAnalytics/add-view-timestamps.ts
function addViewTimestamps(request, reply) {
  return __async(this, null, function* () {
    const addViewTimestampsBodySchema = import_zod2.z.object({
      videoId: import_zod2.z.string(),
      userIp: import_zod2.z.string(),
      // Adiciona userIp
      deviceType: import_zod2.z.string(),
      // Adiciona deviceType
      agent: import_zod2.z.string(),
      // Adiciona agent
      country: import_zod2.z.string(),
      // Adiciona country
      region: import_zod2.z.string(),
      // Adiciona region
      city: import_zod2.z.string(),
      // Adiciona city
      endTimestamp: import_zod2.z.number(),
      startTimestamp: import_zod2.z.number()
    });
    const {
      videoId,
      endTimestamp,
      startTimestamp,
      userIp,
      deviceType,
      agent,
      country,
      region,
      city
    } = addViewTimestampsBodySchema.parse(request.body);
    try {
      const addViewTimestampsUseCase = makeAddViewTimestampsUseCase();
      const videoAnalytics = yield addViewTimestampsUseCase.execute({
        videoId,
        endTimestamp,
        startTimestamp,
        userIp,
        deviceType,
        agent,
        country,
        region,
        city
      });
      return reply.status(201).send(videoAnalytics);
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
  addViewTimestamps
});
