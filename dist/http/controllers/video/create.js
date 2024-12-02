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

// src/http/controllers/video/create.ts
var create_exports = {};
__export(create_exports, {
  createVideo: () => createVideo
});
module.exports = __toCommonJS(create_exports);
var import_zod2 = require("zod");

// src/use-cases/erros/not-found-error.ts
var NotFoundErros = class extends Error {
  constructor(text) {
    super(`${text} not found`);
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
      const result = yield prisma.$transaction((prisma3) => __async(this, null, function* () {
        const chapter = yield prisma3.chapter.deleteMany({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createVideo
});
