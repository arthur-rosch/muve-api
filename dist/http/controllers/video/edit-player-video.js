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

// src/http/controllers/video/edit-player-video.ts
var edit_player_video_exports = {};
__export(edit_player_video_exports, {
  editPlayerVideo: () => editPlayerVideo
});
module.exports = __toCommonJS(edit_player_video_exports);
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
      const result = yield prisma.$transaction((prisma3) => __async(this, null, function* () {
        const videoButtons = yield prisma3.videoButtons.deleteMany({
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

// src/repositories/prisma/prisma-email-verification-repository.ts
var import_client2 = require("@prisma/client");
var prisma2 = new import_client2.PrismaClient();

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
    const buttonSchema = import_zod2.z.object({
      buttonType: import_zod2.z.enum(["below", "inside"]),
      buttonText: import_zod2.z.string().nonempty(),
      buttonSize: import_zod2.z.string().nonempty(),
      buttonLink: import_zod2.z.string().url().nonempty(),
      startTime: import_zod2.z.string().nonempty(),
      endTime: import_zod2.z.string().nonempty(),
      buttonAfterTheVideoEnds: import_zod2.z.boolean().optional(),
      backgroundColor: import_zod2.z.string().nonempty(),
      textColor: import_zod2.z.string().nonempty(),
      hoverBackgroundColor: import_zod2.z.string().nonempty(),
      hoverTextColor: import_zod2.z.string().nonempty(),
      buttonPosition: import_zod2.z.string().nullable().optional()
    });
    const chapterSchema = import_zod2.z.object({
      title: import_zod2.z.string().nonempty(),
      startTime: import_zod2.z.string().nonempty(),
      endTime: import_zod2.z.string().nonempty()
    });
    const editPlayerParamsSchema = import_zod2.z.object({
      videoId: import_zod2.z.string()
    });
    const editPlayerVideoBodySchema = import_zod2.z.object({
      name: import_zod2.z.string().optional(),
      format: import_zod2.z.enum(["9/16", "16/9"]).optional(),
      thumbnail: import_zod2.z.string().optional(),
      color: import_zod2.z.string().optional(),
      colorSmartPlayers: import_zod2.z.string().optional(),
      playAndPause: import_zod2.z.boolean().optional(),
      progressBar: import_zod2.z.boolean().optional(),
      timeTraveled: import_zod2.z.boolean().optional(),
      videoDuration: import_zod2.z.boolean().optional(),
      volumeButton: import_zod2.z.boolean().optional(),
      volumeBar: import_zod2.z.boolean().optional(),
      speed: import_zod2.z.boolean().optional(),
      fullscreen: import_zod2.z.boolean().optional(),
      smartAutoPlay: import_zod2.z.boolean().optional(),
      UrlCoverSmartAutoPlay: import_zod2.z.string().optional(),
      TextTopSmartAutoPlay: import_zod2.z.string().optional(),
      TextButtonSmartAutoPlay: import_zod2.z.string().optional(),
      continueWatching: import_zod2.z.boolean().optional(),
      watchingNow: import_zod2.z.boolean().optional(),
      watchingNowFontSize: import_zod2.z.string().optional(),
      watchingNowBgColor: import_zod2.z.string().optional(),
      watchingNowTextColor: import_zod2.z.string().optional(),
      ImageVideoPause: import_zod2.z.boolean().optional(),
      UrlCoverImageVideoPause: import_zod2.z.string().optional(),
      ImageOfFinished: import_zod2.z.boolean().optional(),
      UrlCoverImageOfFinished: import_zod2.z.string().optional(),
      chapterMenu: import_zod2.z.boolean().optional(),
      buttonsActive: import_zod2.z.boolean().optional(),
      Chapter: import_zod2.z.array(chapterSchema).optional(),
      VideoButtons: import_zod2.z.array(buttonSchema).optional(),
      fictitiousProgressHeight: import_zod2.z.string().optional(),
      fictitiousProgress: import_zod2.z.boolean().optional()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  editPlayerVideo
});
