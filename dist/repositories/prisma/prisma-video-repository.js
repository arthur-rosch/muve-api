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

// src/repositories/prisma/prisma-video-repository.ts
var prisma_video_repository_exports = {};
__export(prisma_video_repository_exports, {
  PrimasVideosRepository: () => PrimasVideosRepository
});
module.exports = __toCommonJS(prisma_video_repository_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PrimasVideosRepository
});