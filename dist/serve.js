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
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/env/index.ts
var import_config, import_zod, envSchema, _env, env;
var init_env = __esm({
  "src/env/index.ts"() {
    import_config = require("dotenv/config");
    import_zod = require("zod");
    envSchema = import_zod.z.object({
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
    _env = envSchema.safeParse(process.env);
    if (_env.success === false) {
      console.error("\u274C Invalid environment variables", _env.error.format());
      throw new Error("\u274C Invalid environment variables.");
    }
    env = _env.data;
  }
});

// src/lib/prisma.ts
var import_client, prisma;
var init_prisma = __esm({
  "src/lib/prisma.ts"() {
    init_env();
    import_client = require("@prisma/client");
    prisma = new import_client.PrismaClient({
      log: env.NODE_ENV === "dev" ? ["query"] : []
    });
  }
});

// src/repositories/prisma/prisma-lead-repository.ts
var PrismaLeadsRepository;
var init_prisma_lead_repository = __esm({
  "src/repositories/prisma/prisma-lead-repository.ts"() {
    init_prisma();
    PrismaLeadsRepository = class {
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
  }
});

// src/repositories/prisma/prisma-user-repository.ts
var PrimasUsersRepository;
var init_prisma_user_repository = __esm({
  "src/repositories/prisma/prisma-user-repository.ts"() {
    init_prisma();
    PrimasUsersRepository = class {
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
  }
});

// src/repositories/prisma/prisma-video-repository.ts
var PrimasVideosRepository;
var init_prisma_video_repository = __esm({
  "src/repositories/prisma/prisma-video-repository.ts"() {
    init_prisma();
    PrimasVideosRepository = class {
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
  }
});

// src/repositories/prisma/prisma-folder-repository.ts
var PrismaFoldersRepository;
var init_prisma_folder_repository = __esm({
  "src/repositories/prisma/prisma-folder-repository.ts"() {
    init_prisma();
    PrismaFoldersRepository = class {
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
  }
});

// src/repositories/prisma/prisma-chapter-repository.ts
var PrismaChaptersRepository;
var init_prisma_chapter_repository = __esm({
  "src/repositories/prisma/prisma-chapter-repository.ts"() {
    init_prisma();
    PrismaChaptersRepository = class {
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
  }
});

// src/lib/stripe.ts
var import_stripe, stripe;
var init_stripe = __esm({
  "src/lib/stripe.ts"() {
    init_env();
    import_stripe = __toESM(require("stripe"));
    stripe = new import_stripe.default(env.STRIPE_SECRET_KEY);
  }
});

// src/lib/mixpanel.ts
var import_mixpanel, mixpanel;
var init_mixpanel = __esm({
  "src/lib/mixpanel.ts"() {
    import_mixpanel = __toESM(require("mixpanel"));
    mixpanel = import_mixpanel.default.init("5fbda77db1c3a9a99cc4b9d70c4b9cee");
  }
});

// src/lib/index.ts
var init_lib = __esm({
  "src/lib/index.ts"() {
    init_stripe();
    init_prisma();
    init_mixpanel();
  }
});

// src/repositories/prisma/prisma-signature-repository.ts
var PrismaSignaturesRepository;
var init_prisma_signature_repository = __esm({
  "src/repositories/prisma/prisma-signature-repository.ts"() {
    init_lib();
    PrismaSignaturesRepository = class {
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
  }
});

// src/repositories/prisma/prisma-view-unique-repository.ts
var PrimasViewUniqueRepository;
var init_prisma_view_unique_repository = __esm({
  "src/repositories/prisma/prisma-view-unique-repository.ts"() {
    init_prisma();
    PrimasViewUniqueRepository = class {
      findById(id) {
        return __async(this, null, function* () {
          const view = yield prisma.viewUnique.findUnique({
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
          const views = yield prisma.viewUnique.findMany({
            where: {
              videoAnalyticsId
            }
          });
          return views;
        });
      }
      create(data) {
        return __async(this, null, function* () {
          const view = yield prisma.viewUnique.create({
            data
          });
          return view;
        });
      }
    };
  }
});

// src/repositories/prisma/prisma-token-player-repository.ts
var PrismaTokenPlayerRepository;
var init_prisma_token_player_repository = __esm({
  "src/repositories/prisma/prisma-token-player-repository.ts"() {
    init_prisma();
    PrismaTokenPlayerRepository = class {
      createToken(token, videoPlayerId) {
        return __async(this, null, function* () {
          yield prisma.token.create({
            data: {
              token,
              videoPlayerId,
              isValid: true
            }
          });
        });
      }
      invalidateToken(token) {
        return __async(this, null, function* () {
          yield prisma.token.updateMany({
            where: { token },
            data: { isValid: false }
          });
        });
      }
      isTokenValid(token) {
        return __async(this, null, function* () {
          const tokenRecord = yield prisma.token.findUnique({
            where: { token }
          });
          return !!tokenRecord && tokenRecord.isValid;
        });
      }
    };
  }
});

// src/repositories/prisma/prisma-video-buttons-repository.ts
var PrismaVideoButtonsRepository;
var init_prisma_video_buttons_repository = __esm({
  "src/repositories/prisma/prisma-video-buttons-repository.ts"() {
    init_prisma();
    PrismaVideoButtonsRepository = class {
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
  }
});

// src/repositories/prisma/prisma-view-timestamp-repository.ts
var PrimasViewTimestampRepository;
var init_prisma_view_timestamp_repository = __esm({
  "src/repositories/prisma/prisma-view-timestamp-repository.ts"() {
    init_prisma();
    PrimasViewTimestampRepository = class {
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
  }
});

// src/repositories/prisma/prisma-video-analytics-repository.ts
var PrimasVideoAnalyticsRepository;
var init_prisma_video_analytics_repository = __esm({
  "src/repositories/prisma/prisma-video-analytics-repository.ts"() {
    init_prisma();
    PrimasVideoAnalyticsRepository = class {
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
  }
});

// src/repositories/prisma/prisma-email-verification-repository.ts
var import_client2, prisma2, PrismaEmailVerificationRepository;
var init_prisma_email_verification_repository = __esm({
  "src/repositories/prisma/prisma-email-verification-repository.ts"() {
    import_client2 = require("@prisma/client");
    prisma2 = new import_client2.PrismaClient();
    PrismaEmailVerificationRepository = class {
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
  }
});

// src/repositories/prisma/index.ts
var init_prisma2 = __esm({
  "src/repositories/prisma/index.ts"() {
    init_prisma_lead_repository();
    init_prisma_user_repository();
    init_prisma_video_repository();
    init_prisma_folder_repository();
    init_prisma_chapter_repository();
    init_prisma_signature_repository();
    init_prisma_view_unique_repository();
    init_prisma_token_player_repository();
    init_prisma_video_buttons_repository();
    init_prisma_view_timestamp_repository();
    init_prisma_video_analytics_repository();
    init_prisma_email_verification_repository();
  }
});

// src/services/send-email.ts
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
var import_nodemailer;
var init_send_email = __esm({
  "src/services/send-email.ts"() {
    init_env();
    import_nodemailer = __toESM(require("nodemailer"));
  }
});

// src/services/get-url-youtube.ts
var ytdl;
var init_get_url_youtube = __esm({
  "src/services/get-url-youtube.ts"() {
    ytdl = require("@distube/ytdl-core");
  }
});

// src/services/stripe/checkout-sessions.ts
var createStripeCheckout;
var init_checkout_sessions = __esm({
  "src/services/stripe/checkout-sessions.ts"() {
    init_lib();
    createStripeCheckout = (_0) => __async(void 0, [_0], function* ({
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
  }
});

// src/services/index.ts
var init_services = __esm({
  "src/services/index.ts"() {
    init_send_email();
    init_get_url_youtube();
    init_checkout_sessions();
  }
});

// src/templates/images/images.ts
var muveAzul64, logoMuve64, FbIcon, IgIcon;
var init_images = __esm({
  "src/templates/images/images.ts"() {
    muveAzul64 = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8IS0tIENyZWF0b3I6IENvcmVsRFJBVyAtLT4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNjM0cHgiIGhlaWdodD0iMTQ0cHgiIHZlcnNpb249IjEuMSIgc3R5bGU9InNoYXBlLXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247IHRleHQtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjsgaW1hZ2UtcmVuZGVyaW5nOm9wdGltaXplUXVhbGl0eTsgZmlsbC1ydWxlOmV2ZW5vZGQ7IGNsaXAtcnVsZTpldmVub2RkIg0Kdmlld0JveD0iMCAwIDI0NC41IDU1LjQzIg0KIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIg0KIHhtbG5zOnhvZG09Imh0dHA6Ly93d3cuY29yZWwuY29tL2NvcmVsZHJhdy9vZG0vMjAwMyI+DQogPGRlZnM+DQogIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQogICA8IVtDREFUQVsNCiAgICAuZmlsMSB7ZmlsbDojMTU1RUM0fQ0KICAgIC5maWwwIHtmaWxsOiMxNTVFQzQ7ZmlsbC1ydWxlOm5vbnplcm99DQogICBdXT4NCiAgPC9zdHlsZT4NCiA8L2RlZnM+DQogPGcgaWQ9IkNhbWFkYV94MDAyMF8xIj4NCiAgPG1ldGFkYXRhIGlkPSJDb3JlbENvcnBJRF8wQ29yZWwtTGF5ZXIiLz4NCiAgPGcgaWQ9Il8yNzE0NTM3MTM4MDY0Ij4NCiAgIDxnPg0KICAgIDxwYXRoIGNsYXNzPSJmaWwwIiBkPSJNMTI1Ljg4IDE0LjA0Yy0yLjM4LDAgLTQuNDgsMC40IC02LjMsMS4xOCAtMS44MSwwLjc5IC0zLjM1LDEuODMgLTQuNjEsMy4xMyAtMS4wMywtMS42NiAtMi4yOCwtMi43OSAtMy43NiwtMy40IC0xLjQ4LC0wLjYgLTIuOTYsLTAuOTEgLTQuNDQsLTAuOTEgLTIuOTIsMCAtNS44OCwwLjk5IC04Ljg5LDIuOTdsMCAtMi40MyAtOC43NCAwIDAgMzMuNjUgOS4wOCAwIDAgLTI0LjM2YzAuOSwtMC43NiAxLjgzLC0xLjM1IDIuNzksLTEuNzUgMC45NywtMC40IDIuMSwtMC42MSAzLjQsLTAuNjEgMS43MSwwIDIuOTUsMC41MSAzLjc0LDEuNTIgMC43OCwxLjAxIDEuMTcsMi41NyAxLjE3LDQuNjdsMCAyMC41MyA5LjA5IDAgMCAtMjAuMzJjMCwtMS44NCAwLjU2LC0zLjM2IDEuNjgsLTQuNTUgMS4xMiwtMS4xOSAyLjY3LC0xLjc4IDQuNjQsLTEuNzggMS43MSwwIDIuOTMsMC41MSAzLjY3LDEuNTEgMC43NCwxLjAxIDEuMTEsMi41NSAxLjExLDQuNjFsMCAyMC41MyA5LjA4IDAgMCAtMjAuOTNjMCwtMi42OSAtMC4zOSwtNC44OSAtMS4xOCwtNi41OSAtMC43OCwtMS43MSAtMS43OCwtMy4wNSAtMi45OSwtNC4wNCAtMS4yMSwtMC45OSAtMi41NywtMS42NyAtNC4wNywtMi4wNSAtMS41LC0wLjM4IC0yLjk5LC0wLjU4IC00LjQ3LC0wLjU4eiIvPg0KICAgIDxwYXRoIGNsYXNzPSJmaWwwIiBkPSJNMTU2LjggNDguNzZjNC43NiwwIDguNDYsLTEuMTggMTEuMTEsLTMuNTYgMi42NCwtMi4zOCAzLjk3LC01Ljg2IDMuOTcsLTEwLjQzbDAgLTIwLjE5IC05LjA5IDAgMCAyMC4xOWMwLDIuMzMgLTAuNTIsNC4wMSAtMS41OCw1LjA0IC0xLjA1LDEuMDQgLTIuNTIsMS41NSAtNC40MSwxLjU1IC0xLjg4LDAgLTMuMzUsLTAuNTEgLTQuNCwtMS41NSAtMS4wNiwtMS4wMyAtMS41OCwtMi43MSAtMS41OCwtNS4wNGwwIC0yMC4xOSAtOS4wOSAwIDAgMjAuMTljMCw0LjU3IDEuMzMsOC4wNSAzLjk3LDEwLjQzIDIuNjUsMi4zOCA2LjM1LDMuNTYgMTEuMSwzLjU2eiIvPg0KICAgIDxwb2x5Z29uIGNsYXNzPSJmaWwwIiBwb2ludHM9IjE3NS4wMiwxNC41OCAxODUuNDQsNDguMjMgMTk5LjkxLDQ4LjIzIDIxMC4zNCwxNC41OCAyMDAuODUsMTQuNTggMTkzLjc5LDQwLjQyIDE5MS45LDQwLjQyIDE4NC41LDE0LjU4ICIvPg0KICAgIDxwYXRoIGNsYXNzPSJmaWwwIiBkPSJNMjEzLjQ4IDMxYzAsNS41NiAxLjQ1LDkuOTEgNC4zNCwxMy4wNSAyLjg5LDMuMTQgNi45Miw0LjcxIDEyLjA4LDQuNzEgMy43MiwwIDYuNzgsLTAuNzEgOS4xOCwtMi4xNSAyLjQsLTEuNDMgNC4xMiwtMy41IDUuMTUsLTYuMTlsLTcuMjcgLTIuOTZjLTAuNDksMS4xNyAtMS4yMywyLjEyIC0yLjIyLDIuODYgLTAuOTgsMC43NCAtMi40OSwxLjExIC00LjUxLDEuMTEgLTAuOCwwIC0xLjYxLC0wLjExIC0yLjQyLC0wLjM0IC0wLjgxLC0wLjIyIC0xLjU3LC0wLjYyIC0yLjI5LC0xLjIxIC0wLjcxLC0wLjU4IC0xLjMyLC0xLjM4IC0xLjgxLC0yLjM5IC0wLjUsLTEuMDEgLTAuODUsLTIuMyAtMS4wOCwtMy44N2wyMS44NyAwIDAgLTMuNzZjMCwtMi4yNSAtMC4zNCwtNC4zMiAtMS4wMSwtNi4yMyAtMC42NywtMS45IC0xLjY1LC0zLjU3IC0yLjkzLC01LjAxIC0xLjI4LC0xLjQzIC0yLjgzLC0yLjU2IC00LjY3LC0zLjM2IC0xLjg0LC0wLjgxIC0zLjkzLC0xLjIyIC02LjI2LC0xLjIyIC0yLjYsMCAtNC45MSwwLjQ0IC02LjkzLDEuMzIgLTIuMDIsMC44NyAtMy43MSwyLjA3IC01LjA4LDMuNiAtMS4zNywxLjUyIC0yLjQsMy4zMiAtMy4xLDUuMzggLTAuNjksMi4wNiAtMS4wNCw0LjI4IC0xLjA0LDYuNjZ6bTE2LjQyIC05Ljc2YzEuOTMsMCAzLjQ2LDAuNjEgNC42MSwxLjgyIDEuMTQsMS4yMSAxLjc2LDIuNzYgMS44NSw0LjY0bC0xMy41OSAwYzAuMzUsLTIuMDEgMS4xMywtMy42IDIuMzIsLTQuNzQgMS4xOSwtMS4xNCAyLjc5LC0xLjcyIDQuODEsLTEuNzJ6Ii8+DQogICA8L2c+DQogICA8Zz4NCiAgICA8cGF0aCBjbGFzcz0iZmlsMSIgZD0iTTMzLjA5IDAuMTZsMTIuMzQgMTIuMzUgMy4zNiAwIDkuNTcgLTkuNTdjMC4yMiwtMC4yMiAwLjU4LC0wLjIyIDAuNzksMGwxOS4zMyAxOS4zMmMwLjIyLDAuMjIgMC4yMiwwLjU4IDAsMC44bC0xMC4xMiAxMC4xMWMtMC4yMSwwLjIyIC0wLjU3LDAuMjIgLTAuNzksMGwtMTguOSAtMTguODkgLTMuMDkgMCAtMTMuODYgMTMuODZjLTAuMjIsMC4yMiAtMC41OCwwLjIyIC0wLjgsMGwtMTIuOSAtMTIuOWMtMC4yMiwtMC4yMiAtMC4yMiwtMC41OCAwLC0wLjhsMTQuMjcgLTE0LjI4YzAuMjIsLTAuMjIgMC41OCwtMC4yMiAwLjgsMHoiLz4NCiAgICA8cGF0aCBjbGFzcz0iZmlsMSIgZD0iTTExLjMxIDIxLjk1bDE4LjgyIDE4LjgyIDMuNTEgMCAxMy40OSAtMTMuNWMwLjIyLC0wLjIyIDAuNTgsLTAuMjIgMC44LDBsMTIuOTkgMTIuOTljMC4yMiwwLjIyIDAuMjIsMC41OCAwLDAuOGwtMTQuMjEgMTQuMjFjLTAuMjIsMC4yMiAtMC41OCwwLjIyIC0wLjgsMGwtMTIuNzQgLTEyLjc0IC0yLjkzIDAgLTkuOTIgOS45MmMtMC4yMiwwLjIyIC0wLjU4LDAuMjIgLTAuOCwwbC0xOS4zNiAtMTkuMzZjLTAuMjIsLTAuMjIgLTAuMjIsLTAuNTggMCwtMC44bDEwLjM1IC0xMC4zNGMwLjIyLC0wLjIyIDAuNTgsLTAuMjIgMC44LDB6Ii8+DQogICA8L2c+DQogIDwvZz4NCiA8L2c+DQo8L3N2Zz4NCg==";
    logoMuve64 = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8IS0tIENyZWF0b3I6IENvcmVsRFJBVyAtLT4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNjM0cHgiIGhlaWdodD0iMTQ0cHgiIHZlcnNpb249IjEuMSIgc3R5bGU9InNoYXBlLXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247IHRleHQtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjsgaW1hZ2UtcmVuZGVyaW5nOm9wdGltaXplUXVhbGl0eTsgZmlsbC1ydWxlOmV2ZW5vZGQ7IGNsaXAtcnVsZTpldmVub2RkIg0Kdmlld0JveD0iMCAwIDI0NC41IDU1LjQzIg0KIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIg0KIHhtbG5zOnhvZG09Imh0dHA6Ly93d3cuY29yZWwuY29tL2NvcmVsZHJhdy9vZG0vMjAwMyI+DQogPGRlZnM+DQogIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQogICA8IVtDREFUQVsNCiAgICAuZmlsMSB7ZmlsbDojMTU1RUM0fQ0KICAgIC5maWwwIHtmaWxsOiMxNTVFQzQ7ZmlsbC1ydWxlOm5vbnplcm99DQogICBdXT4NCiAgPC9zdHlsZT4NCiA8L2RlZnM+DQogPGcgaWQ9IkNhbWFkYV94MDAyMF8xIj4NCiAgPG1ldGFkYXRhIGlkPSJDb3JlbENvcnBJRF8wQ29yZWwtTGF5ZXIiLz4NCiAgPGcgaWQ9Il8yNzE0NTM3MTM4MDY0Ij4NCiAgIDxnPg0KICAgIDxwYXRoIGNsYXNzPSJmaWwwIiBkPSJNMTI1Ljg4IDE0LjA0Yy0yLjM4LDAgLTQuNDgsMC40IC02LjMsMS4xOCAtMS44MSwwLjc5IC0zLjM1LDEuODMgLTQuNjEsMy4xMyAtMS4wMywtMS42NiAtMi4yOCwtMi43OSAtMy43NiwtMy40IC0xLjQ4LC0wLjYgLTIuOTYsLTAuOTEgLTQuNDQsLTAuOTEgLTIuOTIsMCAtNS44OCwwLjk5IC04Ljg5LDIuOTdsMCAtMi40MyAtOC43NCAwIDAgMzMuNjUgOS4wOCAwIDAgLTI0LjM2YzAuOSwtMC43NiAxLjgzLC0xLjM1IDIuNzksLTEuNzUgMC45NywtMC40IDIuMSwtMC42MSAzLjQsLTAuNjEgMS43MSwwIDIuOTUsMC41MSAzLjc0LDEuNTIgMC43OCwxLjAxIDEuMTcsMi41NyAxLjE3LDQuNjdsMCAyMC41MyA5LjA5IDAgMCAtMjAuMzJjMCwtMS44NCAwLjU2LC0zLjM2IDEuNjgsLTQuNTUgMS4xMiwtMS4xOSAyLjY3LC0xLjc4IDQuNjQsLTEuNzggMS43MSwwIDIuOTMsMC41MSAzLjY3LDEuNTEgMC43NCwxLjAxIDEuMTEsMi41NSAxLjExLDQuNjFsMCAyMC41MyA5LjA4IDAgMCAtMjAuOTNjMCwtMi42OSAtMC4zOSwtNC44OSAtMS4xOCwtNi41OSAtMC43OCwtMS43MSAtMS43OCwtMy4wNSAtMi45OSwtNC4wNCAtMS4yMSwtMC45OSAtMi41NywtMS42NyAtNC4wNywtMi4wNSAtMS41LC0wLjM4IC0yLjk5LC0wLjU4IC00LjQ3LC0wLjU4eiIvPg0KICAgIDxwYXRoIGNsYXNzPSJmaWwwIiBkPSJNMTU2LjggNDguNzZjNC43NiwwIDguNDYsLTEuMTggMTEuMTEsLTMuNTYgMi42NCwtMi4zOCAzLjk3LC01Ljg2IDMuOTcsLTEwLjQzbDAgLTIwLjE5IC05LjA5IDAgMCAyMC4xOWMwLDIuMzMgLTAuNTIsNC4wMSAtMS41OCw1LjA0IC0xLjA1LDEuMDQgLTIuNTIsMS41NSAtNC40MSwxLjU1IC0xLjg4LDAgLTMuMzUsLTAuNTEgLTQuNCwtMS41NSAtMS4wNiwtMS4wMyAtMS41OCwtMi43MSAtMS41OCwtNS4wNGwwIC0yMC4xOSAtOS4wOSAwIDAgMjAuMTljMCw0LjU3IDEuMzMsOC4wNSAzLjk3LDEwLjQzIDIuNjUsMi4zOCA2LjM1LDMuNTYgMTEuMSwzLjU2eiIvPg0KICAgIDxwb2x5Z29uIGNsYXNzPSJmaWwwIiBwb2ludHM9IjE3NS4wMiwxNC41OCAxODUuNDQsNDguMjMgMTk5LjkxLDQ4LjIzIDIxMC4zNCwxNC41OCAyMDAuODUsMTQuNTggMTkzLjc5LDQwLjQyIDE5MS45LDQwLjQyIDE4NC41LDE0LjU4ICIvPg0KICAgIDxwYXRoIGNsYXNzPSJmaWwwIiBkPSJNMjEzLjQ4IDMxYzAsNS41NiAxLjQ1LDkuOTEgNC4zNCwxMy4wNSAyLjg5LDMuMTQgNi45Miw0LjcxIDEyLjA4LDQuNzEgMy43MiwwIDYuNzgsLTAuNzEgOS4xOCwtMi4xNSAyLjQsLTEuNDMgNC4xMiwtMy41IDUuMTUsLTYuMTlsLTcuMjcgLTIuOTZjLTAuNDksMS4xNyAtMS4yMywyLjEyIC0yLjIyLDIuODYgLTAuOTgsMC43NCAtMi40OSwxLjExIC00LjUxLDEuMTEgLTAuOCwwIC0xLjYxLC0wLjExIC0yLjQyLC0wLjM0IC0wLjgxLC0wLjIyIC0xLjU3LC0wLjYyIC0yLjI5LC0xLjIxIC0wLjcxLC0wLjU4IC0xLjMyLC0xLjM4IC0xLjgxLC0yLjM5IC0wLjUsLTEuMDEgLTAuODUsLTIuMyAtMS4wOCwtMy44N2wyMS44NyAwIDAgLTMuNzZjMCwtMi4yNSAtMC4zNCwtNC4zMiAtMS4wMSwtNi4yMyAtMC42NywtMS45IC0xLjY1LC0zLjU3IC0yLjkzLC01LjAxIC0xLjI4LC0xLjQzIC0yLjgzLC0yLjU2IC00LjY3LC0zLjM2IC0xLjg0LC0wLjgxIC0zLjkzLC0xLjIyIC02LjI2LC0xLjIyIC0yLjYsMCAtNC45MSwwLjQ0IC02LjkzLDEuMzIgLTIuMDIsMC44NyAtMy43MSwyLjA3IC01LjA4LDMuNiAtMS4zNywxLjUyIC0yLjQsMy4zMiAtMy4xLDUuMzggLTAuNjksMi4wNiAtMS4wNCw0LjI4IC0xLjA0LDYuNjZ6bTE2LjQyIC05Ljc2YzEuOTMsMCAzLjQ2LDAuNjEgNC42MSwxLjgyIDEuMTQsMS4yMSAxLjc2LDIuNzYgMS44NSw0LjY0bC0xMy41OSAwYzAuMzUsLTIuMDEgMS4xMywtMy42IDIuMzIsLTQuNzQgMS4xOSwtMS4xNCAyLjc5LC0xLjcyIDQuODEsLTEuNzJ6Ii8+DQogICA8L2c+DQogICA8Zz4NCiAgICA8cGF0aCBjbGFzcz0iZmlsMSIgZD0iTTMzLjA5IDAuMTZsMTIuMzQgMTIuMzUgMy4zNiAwIDkuNTcgLTkuNTdjMC4yMiwtMC4yMiAwLjU4LC0wLjIyIDAuNzksMGwxOS4zMyAxOS4zMmMwLjIyLDAuMjIgMC4yMiwwLjU4IDAsMC44bC0xMC4xMiAxMC4xMWMtMC4yMSwwLjIyIC0wLjU3LDAuMjIgLTAuNzksMGwtMTguOSAtMTguODkgLTMuMDkgMCAtMTMuODYgMTMuODZjLTAuMjIsMC4yMiAtMC41OCwwLjIyIC0wLjgsMGwtMTIuOSAtMTIuOWMtMC4yMiwtMC4yMiAtMC4yMiwtMC41OCAwLC0wLjhsMTQuMjcgLTE0LjI4YzAuMjIsLTAuMjIgMC41OCwtMC4yMiAwLjgsMHoiLz4NCiAgICA8cGF0aCBjbGFzcz0iZmlsMSIgZD0iTTExLjMxIDIxLjk1bDE4LjgyIDE4LjgyIDMuNTEgMCAxMy40OSAtMTMuNWMwLjIyLC0wLjIyIDAuNTgsLTAuMjIgMC44LDBsMTIuOTkgMTIuOTljMC4yMiwwLjIyIDAuMjIsMC41OCAwLDAuOGwtMTQuMjEgMTQuMjFjLTAuMjIsMC4yMiAtMC41OCwwLjIyIC0wLjgsMGwtMTIuNzQgLTEyLjc0IC0yLjkzIDAgLTkuOTIgOS45MmMtMC4yMiwwLjIyIC0wLjU4LDAuMjIgLTAuOCwwbC0xOS4zNiAtMTkuMzZjLTAuMjIsLTAuMjIgLTAuMjIsLTAuNTggMCwtMC44bDEwLjM1IC0xMC4zNGMwLjIyLC0wLjIyIDAuNTgsLTAuMjIgMC44LDB6Ii8+DQogICA8L2c+DQogIDwvZz4NCiA8L2c+DQo8L3N2Zz4NCg==";
    FbIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8IS0tIENyZWF0b3I6IENvcmVsRFJBVyAtLT4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNjM0cHgiIGhlaWdodD0iMTQ0cHgiIHZlcnNpb249IjEuMSIgc3R5bGU9InNoYXBlLXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247IHRleHQtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjsgaW1hZ2UtcmVuZGVyaW5nOm9wdGltaXplUXVhbGl0eTsgZmlsbC1ydWxlOmV2ZW5vZGQ7IGNsaXAtcnVsZTpldmVub2RkIg0Kdmlld0JveD0iMCAwIDI0NC41IDU1LjQzIg0KIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIg0KIHhtbG5zOnhvZG09Imh0dHA6Ly93d3cuY29yZWwuY29tL2NvcmVsZHJhdy9vZG0vMjAwMyI+DQogPGRlZnM+DQogIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQogICA8IVtDREFUQVsNCiAgICAuZmlsMSB7ZmlsbDojMTU1RUM0fQ0KICAgIC5maWwwIHtmaWxsOiMxNTVFQzQ7ZmlsbC1ydWxlOm5vbnplcm99DQogICBdXT4NCiAgPC9zdHlsZT4NCiA8L2RlZnM+DQogPGcgaWQ9IkNhbWFkYV94MDAyMF8xIj4NCiAgPG1ldGFkYXRhIGlkPSJDb3JlbENvcnBJRF8wQ29yZWwtTGF5ZXIiLz4NCiAgPGcgaWQ9Il8yNzE0NTM3MTM4MDY0Ij4NCiAgIDxnPg0KICAgIDxwYXRoIGNsYXNzPSJmaWwwIiBkPSJNMTI1Ljg4IDE0LjA0Yy0yLjM4LDAgLTQuNDgsMC40IC02LjMsMS4xOCAtMS44MSwwLjc5IC0zLjM1LDEuODMgLTQuNjEsMy4xMyAtMS4wMywtMS42NiAtMi4yOCwtMi43OSAtMy43NiwtMy40IC0xLjQ4LC0wLjYgLTIuOTYsLTAuOTEgLTQuNDQsLTAuOTEgLTIuOTIsMCAtNS44OCwwLjk5IC04Ljg5LDIuOTdsMCAtMi40MyAtOC43NCAwIDAgMzMuNjUgOS4wOCAwIDAgLTI0LjM2YzAuOSwtMC43NiAxLjgzLC0xLjM1IDIuNzksLTEuNzUgMC45NywtMC40IDIuMSwtMC42MSAzLjQsLTAuNjEgMS43MSwwIDIuOTUsMC41MSAzLjc0LDEuNTIgMC43OCwxLjAxIDEuMTcsMi41NyAxLjE3LDQuNjdsMCAyMC41MyA5LjA5IDAgMCAtMjAuMzJjMCwtMS44NCAwLjU2LC0zLjM2IDEuNjgsLTQuNTUgMS4xMiwtMS4xOSAyLjY3LC0xLjc4IDQuNjQsLTEuNzggMS43MSwwIDIuOTMsMC41MSAzLjY3LDEuNTEgMC43NCwxLjAxIDEuMTEsMi41NSAxLjExLDQuNjFsMCAyMC41MyA5LjA4IDAgMCAtMjAuOTNjMCwtMi42OSAtMC4zOSwtNC44OSAtMS4xOCwtNi41OSAtMC43OCwtMS43MSAtMS43OCwtMy4wNSAtMi45OSwtNC4wNCAtMS4yMSwtMC45OSAtMi41NywtMS42NyAtNC4wNywtMi4wNSAtMS41LC0wLjM4IC0yLjk5LC0wLjU4IC00LjQ3LC0wLjU4eiIvPg0KICAgIDxwYXRoIGNsYXNzPSJmaWwwIiBkPSJNMTU2LjggNDguNzZjNC43NiwwIDguNDYsLTEuMTggMTEuMTEsLTMuNTYgMi42NCwtMi4zOCAzLjk3LC01Ljg2IDMuOTcsLTEwLjQzbDAgLTIwLjE5IC05LjA5IDAgMCAyMC4xOWMwLDIuMzMgLTAuNTIsNC4wMSAtMS41OCw1LjA0IC0xLjA1LDEuMDQgLTIuNTIsMS41NSAtNC40MSwxLjU1IC0xLjg4LDAgLTMuMzUsLTAuNTEgLTQuNCwtMS41NSAtMS4wNiwtMS4wMyAtMS41OCwtMi43MSAtMS41OCwtNS4wNGwwIC0yMC4xOSAtOS4wOSAwIDAgMjAuMTljMCw0LjU3IDEuMzMsOC4wNSAzLjk3LDEwLjQzIDIuNjUsMi4zOCA2LjM1LDMuNTYgMTEuMSwzLjU2eiIvPg0KICAgIDxwb2x5Z29uIGNsYXNzPSJmaWwwIiBwb2ludHM9IjE3NS4wMiwxNC41OCAxODUuNDQsNDguMjMgMTk5LjkxLDQ4LjIzIDIxMC4zNCwxNC41OCAyMDAuODUsMTQuNTggMTkzLjc5LDQwLjQyIDE5MS45LDQwLjQyIDE4NC41LDE0LjU4ICIvPg0KICAgIDxwYXRoIGNsYXNzPSJmaWwwIiBkPSJNMjEzLjQ4IDMxYzAsNS41NiAxLjQ1LDkuOTEgNC4zNCwxMy4wNSAyLjg5LDMuMTQgNi45Miw0LjcxIDEyLjA4LDQuNzEgMy43MiwwIDYuNzgsLTAuNzEgOS4xOCwtMi4xNSAyLjQsLTEuNDMgNC4xMiwtMy41IDUuMTUsLTYuMTlsLTcuMjcgLTIuOTZjLTAuNDksMS4xNyAtMS4yMywyLjEyIC0yLjIyLDIuODYgLTAuOTgsMC43NCAtMi40OSwxLjExIC00LjUxLDEuMTEgLTAuOCwwIC0xLjYxLC0wLjExIC0yLjQyLC0wLjM0IC0wLjgxLC0wLjIyIC0xLjU3LC0wLjYyIC0yLjI5LC0xLjIxIC0wLjcxLC0wLjU4IC0xLjMyLC0xLjM4IC0xLjgxLC0yLjM5IC0wLjUsLTEuMDEgLTAuODUsLTIuMyAtMS4wOCwtMy44N2wyMS44NyAwIDAgLTMuNzZjMCwtMi4yNSAtMC4zNCwtNC4zMiAtMS4wMSwtNi4yMyAtMC42NywtMS45IC0xLjY1LC0zLjU3IC0yLjkzLC01LjAxIC0xLjI4LC0xLjQzIC0yLjgzLC0yLjU2IC00LjY3LC0zLjM2IC0xLjg0LC0wLjgxIC0zLjkzLC0xLjIyIC02LjI2LC0xLjIyIC0yLjYsMCAtNC45MSwwLjQ0IC02LjkzLDEuMzIgLTIuMDIsMC44NyAtMy43MSwyLjA3IC01LjA4LDMuNiAtMS4zNywxLjUyIC0yLjQsMy4zMiAtMy4xLDUuMzggLTAuNjksMi4wNiAtMS4wNCw0LjI4IC0xLjA0LDYuNjZ6bTE2LjQyIC05Ljc2YzEuOTMsMCAzLjQ2LDAuNjEgNC42MSwxLjgyIDEuMTQsMS4yMSAxLjc2LDIuNzYgMS44NSw0LjY0bC0xMy41OSAwYzAuMzUsLTIuMDEgMS4xMywtMy42IDIuMzIsLTQuNzQgMS4xOSwtMS4xNCAyLjc5LC0xLjcyIDQuODEsLTEuNzJ6Ii8+DQogICA8L2c+DQogICA8Zz4NCiAgICA8cGF0aCBjbGFzcz0iZmlsMSIgZD0iTTMzLjA5IDAuMTZsMTIuMzQgMTIuMzUgMy4zNiAwIDkuNTcgLTkuNTdjMC4yMiwtMC4yMiAwLjU4LC0wLjIyIDAuNzksMGwxOS4zMyAxOS4zMmMwLjIyLDAuMjIgMC4yMiwwLjU4IDAsMC44bC0xMC4xMiAxMC4xMWMtMC4yMSwwLjIyIC0wLjU3LDAuMjIgLTAuNzksMGwtMTguOSAtMTguODkgLTMuMDkgMCAtMTMuODYgMTMuODZjLTAuMjIsMC4yMiAtMC41OCwwLjIyIC0wLjgsMGwtMTIuOSAtMTIuOWMtMC4yMiwtMC4yMiAtMC4yMiwtMC41OCAwLC0wLjhsMTQuMjcgLTE0LjI4YzAuMjIsLTAuMjIgMC41OCwtMC4yMiAwLjgsMHoiLz4NCiAgICA8cGF0aCBjbGFzcz0iZmlsMSIgZD0iTTExLjMxIDIxLjk1bDE4LjgyIDE4LjgyIDMuNTEgMCAxMy40OSAtMTMuNWMwLjIyLC0wLjIyIDAuNTgsLTAuMjIgMC44LDBsMTIuOTkgMTIuOTljMC4yMiwwLjIyIDAuMjIsMC41OCAwLDAuOGwtMTQuMjEgMTQuMjFjLTAuMjIsMC4yMiAtMC41OCwwLjIyIC0wLjgsMGwtMTIuNzQgLTEyLjc0IC0yLjkzIDAgLTkuOTIgOS45MmMtMC4yMiwwLjIyIC0wLjU4LDAuMjIgLTAuOCwwbC0xOS4zNiAtMTkuMzZjLTAuMjIsLTAuMjIgLTAuMjIsLTAuNTggMCwtMC44bDEwLjM1IC0xMC4zNGMwLjIyLC0wLjIyIDAuNTgsLTAuMjIgMC44LDB6Ii8+DQogICA8L2c+DQogIDwvZz4NCiA8L2c+DQo8L3N2Zz4NCg==";
    IgIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABGdBTUEAALGPC/xhBQAACkdJREFUeAHlm2usXFUVx1vLS2oRSiuN0hqqLUjRGOujTUtVxECwH5REkxJjaWMwRlSwEp8f+sEHgZoGY2KCiCEmYIxfqGIMSilYI1rxAVRtMVbkVdqKNBUstfT6+80967LmzJk5Z+bOvZSwkv/dr/Xae/bZe+19zp06ZYJpZGRkNiZWgEXgTLAQzAIzCpBMOVBgH+lOsANsB3dPnTp1L+mLi+j0YvANcB84AgYlZdWhrsUTMQpTh6UUB/1FLwNrwdlJ7zPkt4J7gb+s2A3iVyc7NhvmkHeWCDu8HJwIgv5M5kZwPTND+Ree6PgpYD14EgTtJrMRnAuOG9RLZQsd6noCBGlLmycPqnvcchifCtaAvSBoC5mV4JhxGygpUGehWxtB2taHoc3kktnqIgbnga0gaDMZp+ukkLaANoP0Zd5kGV+GsZiOj5FfNSmGK4xoG+iDpE/LKtiGV4WBteBZIP0UvHJ42gfTpA+FLyQt31yEh0songZciII2kHnZcK0Mrk1fgD4F6eu0wTUmSRWBWwvNB0lXp+ajKqtvQB8lfR7/IKAkfvk95JceVT2ucEYfgb5KGytYmlehwGdeclSP+s5Hz/S18JlkZLA1AUFX+1jwjtppH50up/i+Gkj2oevuUBlAIOCeug28Cmwg7LyqbKCqjJz6DGGXgAVAeXcKw1kjQp9JF0/5yrZHqBNHwHPgEDCM3g/2AA9J9+CLIXUjwp9rYfwsUP5tyP6zVtBOgAhybiNfu9rDcyz4JHgITDT9AwOXg9poEx53B/sg2afyoHeOB0yGlpIBRu0+D89csA1MNv0Wg6d39qC9Bh7jhAiW1rS3lqYhjKfA4FTzvH4JU+aWskAuw++j4klvbq4n7xT+C/g7eBL8BzwLDgPbnOpV5C/kY+KvewKYDk4F88EbQHk2PkTdcvx8hLQr4afR6s3A+4YF8D9VyQyjJyxpcyVDqoTnOPB7mRN5Cvw0cCCHSuoEV4AIw8m26Hf8PbbOGDxxdlhfyQvDDBBH2tqDDbxXgUxOydMqlQ+xEhtzgJ3OdGWdCZg9QEn20buLdqJyna3QlvaWzhI8LnqPy1zQw6RefU0IofscYAdaCx/paeBREGS+1dbLAXjiKL2ug4/G7YW2lR2NpQr4Lih4I/loiWVoRQx8LYyQupK3pjvpx1K92fPrjMKzspDxvvF5otI7PMlnuMlIXtPiHv3zNIkL1tAJvSeBI6Nmxv6+X0OUTgT/HasdGflqnQPwHgPso2S80lptTS/xD3QLK6QrdR2dkxi2IXMwlXtmMewv+C7wdvBqID0GfgPuQtf/rCjIoEjkQ427yBT4nkGXQVFEedknWToImcPIuLNdAezzaFBFpTev0rkdUhUV8AW/MjdUsHRUwecv9mXwb9CNXKC+CF4eCsh/CcQsuJ382Awl/z0Q1ChChNl7Sum+lg0ys4EGnMqNLjDhewQEXR3OdkthPAs8GAIN0h3weDPcIvJngDeDtkiO8gYQtCv4e6Uwu33bV/s828BiBVDxVqbIoV7Cqc0AJejpyFSlGFlE/T3g9aV2A6MHwd+A+UwLKfwaWYMfp/su8EdQDqAMsIKyT1HXkRZ93EqDfV7hAOig1GgKjbK2orQiO6Xr808HDKU3gRxS76X8ETATZxaCBebBpcBILchgahM6ToqKijTb7mchjr4ucgBiqu2oMNCtauw5hCEvWmX+L1AxP1XeTn4Rnf4+8KTXIvPgJgouZL8YrW39ddZ8LpXL2Ww7+1TmK5ejr2e6nURU5RG2ESETixLZkU9VCVHvIcSVOshgpfZFBjwzQRxelPV5ndHFxpUyFJRnQxX7WB38SwqZbc4ADxvS7tGk0d+8GLlNVdFFVI6t5uQ/zq9cfQhJ0vB4ePpEqvIu4cJUztm8JtiXphR9naVQjO6BptIN+fKWqsEfN5ST7VbgWhHkQl1FeQCq2rvVRV9nTOQAvCZZv59ftrGz8Dqr7k/yWVeqHjjbNgADa6kRPCG1N34+k0zeGrOuxDL+rDNgbDTGr65Nw+OpdEbKN81mmayrqXwvvrHHfiIHIE9hj7Ov6+VRboPXQOisVDcatqaKcWbbBiCCjzl9KM3Pc94RsgoXskzfzoVueTqvvjKvwVQVZdvZpyreXBd93ecM2Fm0RECUGbvl89anjg5iITPE/VlqeC+d+0wqd8t6jX1eavwJunalcs5m29mnzFOVj77uVMHzUVEVa3Vd60haNPWKwIzicrTmtz4/BF66thF1Hsp+ROU1qcGzyedTuZzNtg+XG3uUYwB2qCBuRxb3ECg3uULHyfH4cmOU+eU8NhvUXB91pB8EF1JvWPzXot7n/QLwiqIcicFT+Bd1Oc22Haym9NaCcbuhsCPf73E4blUQHflKnVV4vCn2MqIpyXt5A71fTwofruO3Hf724zAjbMT1ADDkfAdoQvsTk6e2noSN62B4D/hTT8bRxj+QvBuZbzXgzbb3N+CXxT7a1wfseywiP7cFung0qf37ROKYm/Jdsxi7i8a3gPeB7wK3yX8VMH8DuAgshveXpE0o284+9ZKNPkafW9Oi30vR76Sp92gvaxPZhg/5USxvnR2m4e+4FB1jonF70amVY5VdMvBdWvBGsrwL64RVY/idYbxIP1xnDL7qa3EFaeznxcgs+A8Vhk3uADkoqfNlXO3aAltAkN8AzKxTCk/IrOvgpbHfV2M3hfUivbpD6QRVYO/aku0b60zBv7yQqX41pgIY1hdMmxsonAfv/oI/kh+QmVcnO2g7ul8LDKQyPUXh9Dqd8NxZCK3PvG3TFga3lZ3ASK3J6/EPwGf0FrsJ2Vbkdwfpr4AhrCu9N8cHwWFgyGrcXo7d9UWoywDNI/B0cCqYD5aB84AvVoKeI3Mxu8amqKhK6dcq6m8G+0D31+MKw9zvBxKrkPEjqskmX4t9SJ97ETzeTcYd45pevK02mF1gfAkp+TVo/nUr5eF5EwgZshNOd2PhjZXOpEp4/ETGPkj61zbjE2t7Fkaf7/gQYUN7a/cSMkvBN4FngLxLUBwXqUud14El3T1ob4E33hzZl/7WJgTG9Zkc8s6k48F04Fvek4FfecysgTzyKqOsOpr9cqn/yKwGkluk60f/hOBL90PJGC4GYSOQ9oClUX+0pvpY+Eoyzk9l7SRKXtofS6dBiJngyBqJ1e4OkzVL9KXwiaRF+jpt6PZR6prgoiLdBvJb36Hba6JQH0Bsdfq2toncwDwYcHeILdIAwyjrBSFtgwhy9Gmw1b5f7zFknJADn82UJ+1IrC1wJwjSl/72+X47XebHoPu8YfNeELSFjGfufFtbFh2orM5CtzaCtK0PfccJAzlRJYRxA5f1wGNmkDc1LkR+kBS3x1XiPeuULXSoK9/+aEubtd8b9DRA49BGDmd83XQZcBE6GwT5JchWcC/YUWA36YECJC/if53V+zIxGN4x+hLE+P0IGJSUVYe6FpftDKM8tBnQzRkcn03bCrAI+EZmIfC+wRkjpJgNnte9j3Cm+EJkwv99/v9xyby4c70RSAAAAABJRU5ErkJggg==";
  }
});

// src/templates/onboarding.ts
var OnboardingEmail;
var init_onboarding = __esm({
  "src/templates/onboarding.ts"() {
    init_images();
    OnboardingEmail = ({ name }) => {
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
			font-size: 75%;
			line-height: 0;
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
<body class="body" style="background-color: #f9f9f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9f9;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #155ec3;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #155ec3; color: #000000; width: 480px; margin: 0 auto;" width="480">
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
<div align="left" class="alignment" style="line-height:10px">
<div style="max-width: 96px;"><img alt="I'm an image" height="auto" src="${muveAzul64}" style="display: block; height: auto; border: 0; width: 100%;" title="I'm an image" width="96"/></div>
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
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:20px;line-height:120%;text-align:left;mso-line-height-alt:24px;">
<p style="margin: 0;"><strong>J\xE1 deu uma olhada em todas as ferramentas que tem dispon\xEDvel para voc\xEA?</strong></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">Ol\xE1, ${name}!</p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">Como est\xE1 a experi\xEAncia at\xE9 agora? \u{1F604} No Muve, nossa miss\xE3o \xE9 facilitar o caminho para suas VSLs e cursos se destacarem e converterem ainda mais. Aqui v\xE3o algumas funcionalidades para voc\xEA testar e come\xE7ar a ver o impacto:</p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">\u{1F50D} <strong>Acompanhe a Reten\xE7\xE3o em Tempo Real</strong><br/>Veja como seu p\xFAblico est\xE1 engajado com cada segundo do v\xEDdeo. Identifique os pontos fortes e fa\xE7a ajustes estrat\xE9gicos.</p>
<p style="margin: 0;">\u{1F3AC} <strong>Smart Autoplay</strong><br/>O v\xEDdeo come\xE7a assim que a p\xE1gina carrega, criando uma sensa\xE7\xE3o de urg\xEAncia. Experimente e veja como o engajamento aumenta!</p>
<p style="margin: 0;">\u{1F4C8} <strong>Bot\xF5es de A\xE7\xE3o e Cap\xEDtulos</strong><br/>Direcione seu p\xFAblico para a a\xE7\xE3o com bot\xF5es customizados e permita que ele navegue pelo conte\xFAdo com cap\xEDtulos f\xE1ceis de acessar.</p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">\u{1F449} <strong>Acesse agora e explore seu Dashboard completo:</strong> https://web.muveplayer.com/login</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;">Nosso objetivo \xE9 que voc\xEA veja resultados desde o in\xEDcio. Fique de olho no seu e-mail \u2014 em breve, vamos enviar mais dicas e funcionalidades para voc\xEA explorar. E lembre-se, estamos aqui para ajudar sempre que precisar.</p>
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
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9; color: #000000; width: 480px; margin: 0 auto;" width="480">
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
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #155ec3; color: #000000; width: 480px; margin: 0 auto;" width="480">
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
<div style="max-width: 96px;"><img alt="Alternate text" height="auto" src="${logoMuve64}" style="display: block; height: auto; border: 0; width: 100%;" title="Alternate text" width="96"/></div>
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
<td style="padding:0 10px 0 10px;"><a href="https://www.facebook.com/people/Muve/61566478731090/" target="_blank"><img alt="Facebook" height="auto" src="${FbIcon}" style="display: block; height: auto; border: 0;" title="Facebook" width="32"/></a></td>
<td style="padding:0 10px 0 10px;"><a href="https://www.instagram.com/muveplayer/" target="_blank"><img alt="Instagram" height="auto" src="${IgIcon}" style="display: block; height: auto; border: 0;" title="Instagram" width="32"/></a></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:15px;">
<div style="color:#ffffff;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:12px;line-height:150%;text-align:left;mso-line-height-alt:18px;">
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
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #ffffff;"><span style="word-break: break-word;">\u200A</span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:40px;padding-right:40px;padding-top:20px;">
<div style="color:#ffffff;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:12px;line-height:120%;text-align:left;mso-line-height-alt:14.399999999999999px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;">Muve Copyright \xA9 2024</span></p>
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
  }
});

// src/templates/purchase.email.ts
var PurchaseEmail;
var init_purchase_email = __esm({
  "src/templates/purchase.email.ts"() {
    init_images();
    PurchaseEmail = ({
      login,
      name,
      password
    }) => {
      return `
		<!DOCTYPE html>
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
			<div style="max-width: 144px;"><img alt="I'm an image" height="auto" src="${muveAzul64}" style="display: block; height: auto; border: 0; width: 100%;" title="I'm an image" width="144"/></div>
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
			<p style="margin: 0;"><strong>Tudo pronto para come\xE7ar!</strong></p>
			</div>
			</td>
			</tr>
			</table>
			<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
			<tr>
			<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
			<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
			<p style="margin: 0;">Ol\xE1, ${name}!</p>
			<p style="margin: 0;">\xA0</p>
			<p style="margin: 0;">Parab\xE9ns! Sua compra foi aprovada e agora voc\xEA faz parte da nossa comunidade no Muve. Prepare-se para transformar a forma como voc\xEA utiliza v\xEDdeos, sem limites e com controle total sobre suas personaliza\xE7\xF5es e an\xE1lises.</p>
			<p style="margin: 0;">\xA0</p>
			<p style="margin: 0;">\xA0</p>
			<p style="margin: 0;"><strong>Aqui est\xE3o os dados de acesso para come\xE7ar:</strong></p>
			<p style="margin: 0;"><strong>Link de acesso</strong>: https://web.muveplayer.com/login</p>
			<p style="margin: 0;"><strong>Usu\xE1rio</strong>: ${login}</p>
			<p style="margin: 0;"><strong>Senha</strong>: ${password}</p>
			</div>
			</td>
			</tr>
			</table>
			<table border="0" cellpadding="0" cellspacing="0" class="button_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
			<tr>
			<td class="pad" style="padding-left:10px;padding-right:10px;padding-top:15px;text-align:center;">
			<div align="center" class="alignment"><!--[if mso]>
			<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://web.muveplayer.com/login" style="height:62px;width:221px;v-text-anchor:middle;" arcsize="97%" stroke="false" fillcolor="#155ec3">
			<w:anchorlock/>
			<v:textbox inset="0px,0px,0px,0px">
			<center dir="false" style="color:#ffffff;font-family:Tahoma, sans-serif;font-size:16px">
			<![endif]--><a href="https://web.muveplayer.com/login" style="background-color:#155ec3;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:60px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:16px;font-weight:undefined;mso-border-alt:none;padding-bottom:15px;padding-top:15px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;" target="_blank"><span style="word-break: break-word; padding-left: 30px; padding-right: 30px; font-size: 16px; display: inline-block; letter-spacing: normal;"><span style="margin: 0; word-break: break-word; line-height: 32px;"><strong>Acessar Dashboard</strong></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
			</td>
			</tr>
			</table>
			<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
			<tr>
			<td class="pad" style="padding-bottom:12px;padding-top:60px;">
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
			<table border="0" cellpadding="20" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
			<tr>
			<td class="pad">
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
			<div style="max-width: 96px;"><img alt="Alternate text" height="auto" src="${logoMuve64}" style="display: block; height: auto; border: 0; width: 100%;" title="Alternate text" width="96"/></div>
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
			<td style="padding:0 10px 0 10px;"><a href="https://www.facebook.com/people/Muve/61566478731090/" target="_blank"><img alt="Facebook" height="auto" src="${FbIcon}" style="display: block; height: auto; border: 0;" title="Facebook" width="32"/></a></td>
			<td style="padding:0 10px 0 10px;"><a href="https://www.instagram.com/muveplayer/" target="_blank"><img alt="Instagram" height="auto" src="${IgIcon}" style="display: block; height: auto; border: 0;" title="Instagram" width="32"/></a></td>
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
		</html>
		`;
    };
  }
});

// src/templates/unsubscribe-email.ts
var UnsubscribeEmail;
var init_unsubscribe_email = __esm({
  "src/templates/unsubscribe-email.ts"() {
    UnsubscribeEmail = ({ name }) => {
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
<p style="margin: 0;"><strong>Cancelamento Confirmado! J\xE1 estamos com saudades... \u{1F622}</strong></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">Ol\xE1, ${name}!</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;">Confirmamos que sua assinatura no Muve foi cancelada. Bem, n\xE3o vamos mentir\u2026 j\xE1 estamos aqui sentindo aquele vazio no cora\xE7\xE3o. Mas sabemos que \xE0s vezes uma pausa \xE9 necess\xE1ria.</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;">Se, por acaso, voc\xEA sentir falta de v\xEDdeos sem logotipos, analytics poderosos ou daquela personaliza\xE7\xE3o incr\xEDvel, estaremos aqui, de bra\xE7os abertos (e sem julgamentos, prometemos!).</p>
<p style="margin: 0;">Qualquer d\xFAvida ou se mudar de ideia, \xE9 s\xF3 nos avisar!</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;">At\xE9 logo (ou quem sabe, at\xE9 breve?),</p>
<p style="margin: 0;">Equipe Muve<br/><em>Seu lugar para v\xEDdeos sem limites.</em></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment" style="line-height:10px">
<div style="max-width: 336px;"><img height="auto" src="https://media2.giphy.com/media/s8lohqu0U5ZWE/giphy.gif?cid=20eb4e9dcm0zq02c5hpvraq7susc356c19wsfjx0pvxc6og0&ep=v1_gifs_search&rid=giphy.gif&ct=g" style="display: block; height: auto; border: 0; width: 100%;" width="336"/></div>
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
  }
});

// src/templates/half-journey-email.ts
var HalfJourneyEmail;
var init_half_journey_email = __esm({
  "src/templates/half-journey-email.ts"() {
    init_images();
    HalfJourneyEmail = () => {
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
			font-size: 75%;
			line-height: 0;
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
<body class="body" style="background-color: #f9f9f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9f9;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #155ec3;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #155ec3; color: #000000; width: 480px; margin: 0 auto;" width="480">
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
<div align="left" class="alignment" style="line-height:10px">
<div style="max-width: 96px;"><img alt="I'm an image" height="auto" src="${muveAzul64}}" style="display: block; height: auto; border: 0; width: 100%;" title="I'm an image" width="96"/></div>
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
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:20px;line-height:120%;text-align:left;mso-line-height-alt:24px;">
<p style="margin: 0;"><strong>Eu espero que voc\xEA esteja aproveitando ao m\xE1ximo...</strong></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">Ol\xE1, [Nome do Usu\xE1rio]!</p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">Eu espero que voc\xEA esteja aproveitando o Muve! \u{1F3AC} J\xE1 experimentou todas as funcionalidades que podem transformar o desempenho dos seus v\xEDdeos?</p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">Aqui est\xE3o algumas dicas para maximizar seus resultados enquanto est\xE1 no trial:</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;">\u{1F4CA} <strong>Explore os Analytics Detalhados</strong><br/>Veja onde sua audi\xEAncia est\xE1 engajando e onde est\xE1 saindo. Esses insights ajudam a entender o que funciona e o que precisa de ajustes.</p>
<p style="margin: 0;">\u2699\uFE0F <strong>Personalize o Player do seu Jeito</strong><br/>D\xEA seu toque \xFAnico: teste bot\xF5es de a\xE7\xE3o, smart autoplay e at\xE9 cap\xEDtulos para guiar sua audi\xEAncia. Cada detalhe pode fazer a diferen\xE7a!</p>
<p style="margin: 0;">\u{1F4A1} <strong>Sem Surpresas no Final do M\xEAs</strong><br/>Lembre-se: com o Muve, voc\xEA tem um pre\xE7o fixo, sem custo extra por banda ou visualiza\xE7\xF5es. Rode quantas VSLs quiser, sem preocupa\xE7\xE3o.</p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">Qualquer d\xFAvida ou se precisar de alguma dica extra, estamos a um e-mail de dist\xE2ncia. Aproveite essa chance para ver o verdadeiro poder dos seus v\xEDdeos com o Muve!</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;">Sucesso nas convers\xF5es!</p>
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
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9; color: #000000; width: 480px; margin: 0 auto;" width="480">
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
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #155ec3; color: #000000; width: 480px; margin: 0 auto;" width="480">
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
<div style="max-width: 96px;"><img alt="Alternate text" height="auto" src="${logoMuve64}" style="display: block; height: auto; border: 0; width: 100%;" title="Alternate text" width="96"/></div>
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
<td style="padding:0 10px 0 10px;"><a href="https://www.facebook.com/people/Muve/61566478731090/" target="_blank"><img alt="Facebook" height="auto" src="${FbIcon}" style="display: block; height: auto; border: 0;" title="Facebook" width="32"/></a></td>
<td style="padding:0 10px 0 10px;"><a href="https://www.instagram.com/muveplayer/" target="_blank"><img alt="Instagram" height="auto" src="${IgIcon}" style="display: block; height: auto; border: 0;" title="Instagram" width="32"/></a></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:15px;">
<div style="color:#ffffff;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:12px;line-height:150%;text-align:left;mso-line-height-alt:18px;">
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
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #ffffff;"><span style="word-break: break-word;">\u200A</span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:40px;padding-right:40px;padding-top:20px;">
<div style="color:#ffffff;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:12px;line-height:120%;text-align:left;mso-line-height-alt:14.399999999999999px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;">Muve Copyright \xA9 2024</span></p>
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
  }
});

// src/templates/lateSignature-email.ts
var LateSignatureEmail;
var init_lateSignature_email = __esm({
  "src/templates/lateSignature-email.ts"() {
    LateSignatureEmail = ({
      expirationDate,
      name,
      paymentLink,
      value
    }) => {
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
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment" style="line-height:10px">
<div style="max-width: 96px;"><img height="auto" src="images/fatura.png" style="display: block; height: auto; border: 0; width: 100%;" width="96"/></div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:30px;line-height:120%;text-align:left;mso-line-height-alt:36px;">
<p style="margin: 0;"><strong>Sua fatura est\xE1 atrasada \u{1F62C} \u2014 Estamos aqui para ajudar!</strong></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">Ol\xE1, ${name}!</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;">Parece que sua \xFAltima fatura no Muve est\xE1 um pouco atrasada. Mas sem estresse, sabemos que a correria do dia a dia pode acabar fazendo essas coisas escaparem.</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;">Para que voc\xEA continue aproveitando todos os recursos incr\xEDveis do Muve \u2014 v\xEDdeos sem logotipos, Analytics detalhados e total personaliza\xE7\xE3o \u2014 basta regularizar o pagamento o quanto antes.</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;"><strong>Aqui est\xE3o os detalhes da sua fatura:</strong></p>
<p style="margin: 0;">Valor: ${value}</p>
<p style="margin: 0;">Data de vencimento: ${expirationDate}</p>
<p style="margin: 0;">Link para pagamento: ${paymentLink}</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;">Se precisar de qualquer ajuda ou tiver alguma d\xFAvida, estamos aqui! Queremos garantir que voc\xEA continue aproveitando ao m\xE1ximo o Muve sem interrup\xE7\xF5es.</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;">Atenciosamente,<br/>Equipe Muve<br/>Sempre sem limites, inclusive no suporte.</p>
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
  }
});

// src/templates/resetPassword-email.ts
var ResetPasswordEmail;
var init_resetPassword_email = __esm({
  "src/templates/resetPassword-email.ts"() {
    ResetPasswordEmail = ({ link, name }) => {
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
  }
});

// src/templates/stripe/checkout-expired.ts
var CheckoutExpired;
var init_checkout_expired = __esm({
  "src/templates/stripe/checkout-expired.ts"() {
    init_images();
    CheckoutExpired = ({ name, url }) => {
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
			font-size: 75%;
			line-height: 0;
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
<body class="body" style="background-color: #f9f9f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9f9;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #155ec3;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #155ec3; color: #000000; width: 480px; margin: 0 auto;" width="480">
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
<div align="left" class="alignment" style="line-height:10px">
<div style="max-width: 96px;"><img alt="I'm an image" height="auto" src="${muveAzul64}" style="display: block; height: auto; border: 0; width: 100%;" title="I'm an image" width="96"/></div>
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
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:20px;line-height:120%;text-align:left;mso-line-height-alt:24px;">
<p style="margin: 0;"><strong>Voc\xEA est\xE1 apenas a um passo de ter acesso a melhor ferramenta de v\xEDdeo do mercado...</strong></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">Opa, ${name}!</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;">Notamos que voc\xEA come\xE7ou seu cadastro no Muve, mas ainda falta s\xF3 um passo para liberar o seu teste gratuito.</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;">Com o Muve, voc\xEA tem acesso a ferramentas poderosas para otimizar seus v\xEDdeos de vendas e cursos, como an\xE1lises detalhadas de reten\xE7\xE3o e personaliza\xE7\xE3o total do player. E o melhor: voc\xEA pode testar tudo isso sem custo por 7 dias!</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;">\u{1F449} <strong>Complete seu cadastro e descubra o que o Muve pode fazer pelo seu neg\xF3cio!</strong></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="button_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:10px;padding-right:10px;padding-top:15px;text-align:center;">
<div align="center" class="alignment"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:62px;width:331px;v-text-anchor:middle;" arcsize="97%" stroke="false" fillcolor="#155ec3">
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:Tahoma, sans-serif;font-size:16px">
<![endif]-->
<a href="${url}" style="background-color:#155ec3;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:60px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:16px;font-weight:400;mso-border-alt:none;padding-bottom:15px;padding-top:15px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;"><span style="word-break: break-word; padding-left: 30px; padding-right: 30px; font-size: 16px; display: inline-block; letter-spacing: normal;"><span style="word-break: break-word; line-height: 32px;"><strong>Finalizar Cadastro Agora Mesmo</strong></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">Qualquer d\xFAvida, estamos por aqui para ajudar! \u{1F60A}</p>
<p style="margin: 0;">N\xE3o perde tempo</p>
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
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9; color: #000000; width: 480px; margin: 0 auto;" width="480">
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
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #155ec3; color: #000000; width: 480px; margin: 0 auto;" width="480">
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
<div style="max-width: 96px;"><img alt="Alternate text" height="auto" src="${logoMuve64}" style="display: block; height: auto; border: 0; width: 100%;" title="Alternate text" width="96"/></div>
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
<td style="padding:0 10px 0 10px;"><a href="https://www.facebook.com/people/Muve/61566478731090/" target="_blank"><img alt="Facebook" height="auto" src="${FbIcon}" style="display: block; height: auto; border: 0;" title="Facebook" width="32"/></a></td>
<td style="padding:0 10px 0 10px;"><a href="https://www.instagram.com/muveplayer/" target="_blank"><img alt="Instagram" height="auto" src="${IgIcon}"  style="display: block; height: auto; border: 0;" title="Instagram" width="32"/></a></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:15px;">
<div style="color:#ffffff;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:12px;line-height:150%;text-align:left;mso-line-height-alt:18px;">
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
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #ffffff;"><span style="word-break: break-word;">\u200A</span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:40px;padding-right:40px;padding-top:20px;">
<div style="color:#ffffff;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:12px;line-height:120%;text-align:left;mso-line-height-alt:14.399999999999999px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;">Muve Copyright \xA9 2024</span></p>
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
  }
});

// src/templates/trial-ending-soon-email.ts
var TrialEndingSoonEmail;
var init_trial_ending_soon_email = __esm({
  "src/templates/trial-ending-soon-email.ts"() {
    init_images();
    TrialEndingSoonEmail = ({ name }) => {
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
			font-size: 75%;
			line-height: 0;
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
<body class="body" style="background-color: #f9f9f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9f9;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #155ec3;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #155ec3; color: #000000; width: 480px; margin: 0 auto;" width="480">
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
<div align="left" class="alignment" style="line-height:10px">
<div style="max-width: 96px;"><img alt="I'm an image" height="auto" src="${muveAzul64}" style="display: block; height: auto; border: 0; width: 100%;" title="I'm an image" width="96"/></div>
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
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:20px;font-weight:400;line-height:120%;text-align:left;mso-line-height-alt:24px;">
<p style="margin: 0;"><strong>Seu per\xEDodo trial no muve t\xE1 quase terminando...</strong></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">Seu per\xEDodo de teste gratuito no Muve est\xE1 chegando ao fim \u2013 faltam apenas 2 dias! \u23F3</p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">Ainda d\xE1 tempo de explorar o que o Muve pode fazer pelos seus v\xEDdeos. Aqui est\xE3o algumas funcionalidades que voc\xEA precisa conferir antes que o trial acabe:</p>
<p style="margin: 0;">\u{1F4CA} <strong>Analytics completos em tempo real:</strong> Veja cada detalhe do engajamento do seu p\xFAblico e descubra onde est\xE3o as oportunidades de melhoria.</p>
<p style="margin: 0;">\u{1F680} <strong>Smart Autoplay e Bot\xF5es de A\xE7\xE3o personalizados:</strong> Ferramentas poderosas para maximizar a reten\xE7\xE3o e direcionar a audi\xEAncia para a convers\xE3o.</p>
<p style="margin: 0;">\u{1F4CC} <strong>Cap\xEDtulos e \u201CContinue Assistindo\u201D:</strong> Facilite a navega\xE7\xE3o dos seus espectadores e aumente o engajamento nos seus cursos e VSLs.</p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">Lembrando que, com o Muve, voc\xEA n\xE3o precisa se preocupar com custos adicionais por visualiza\xE7\xF5es ou banda \u2013 \xE9 pre\xE7o fixo para que voc\xEA possa escalar sem surpresas no fim do m\xEAs.</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;"><strong>Pronto para levar suas VSLs e v\xEDdeos ao pr\xF3ximo n\xEDvel?</strong> N\xE3o deixe essa oportunidade passar.</p>
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
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9; color: #000000; width: 480px; margin: 0 auto;" width="480">
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
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #155ec3; color: #000000; width: 480px; margin: 0 auto;" width="480">
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
<div style="max-width: 96px;"><img alt="Alternate text" height="auto" src="${logoMuve64}" style="display: block; height: auto; border: 0; width: 100%;" title="Alternate text" width="96"/></div>
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
<td style="padding:0 10px 0 10px;"><a href="https://www.facebook.com/people/Muve/61566478731090/" target="_blank"><img alt="Facebook" height="auto" src="${FbIcon}" style="display: block; height: auto; border: 0;" title="Facebook" width="32"/></a></td>
<td style="padding:0 10px 0 10px;"><a href="https://www.instagram.com/muveplayer/" target="_blank"><img alt="Instagram" height="auto" src="${IgIcon}" style="display: block; height: auto; border: 0;" title="Instagram" width="32"/></a></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:15px;">
<div style="color:#ffffff;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:12px;line-height:150%;text-align:left;mso-line-height-alt:18px;">
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
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #ffffff;"><span style="word-break: break-word;">\u200A</span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:40px;padding-right:40px;padding-top:20px;">
<div style="color:#ffffff;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:12px;line-height:120%;text-align:left;mso-line-height-alt:14.399999999999999px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;">Muve Copyright \xA9 2024</span></p>
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
  }
});

// src/templates/invoice-payment-failed.ts
var InvoicePaymentFailedEmail;
var init_invoice_payment_failed = __esm({
  "src/templates/invoice-payment-failed.ts"() {
    init_images();
    InvoicePaymentFailedEmail = ({
      name,
      plan,
      price
    }) => {
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
			font-size: 75%;
			line-height: 0;
		}

		@media (max-width:500px) {
			.social_block.desktop_hide .social-table {
				display: inline-block !important;
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
<div style="max-width: 144px;"><img alt="I'm an image" height="auto" src="${muveAzul64}" style="display: block; height: auto; border: 0; width: 100%;" title="I'm an image" width="144"/></div>
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
<p style="margin: 0;"><strong>Deu alguma falha aqui...</strong></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">Ol\xE1, ${name}!</p>
<p style="margin: 0;">Notamos que houve uma falha no processamento do pagamento da sua assinatura do Muve. Pode ter sido um problema tempor\xE1rio com o cart\xE3o ou outra quest\xE3o t\xE9cnica.</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;"><strong>Detalhes do plano:</strong></p>
<p style="margin: 0;"><strong>Plano:</strong> ${plan}</p>
<p style="margin: 0;"><strong>Valor:</strong> R$${price}</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;">Para garantir que voc\xEA desfrute de todas as funcionalidades do Muve sem interrup\xE7\xF5es, recomendamos que verifique seus dados de pagamento ou tente realizar o pagamento novamente.</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;">Se precisar de ajuda ou tiver d\xFAvidas, nossa equipe de suporte est\xE1 pronta para te ajudar.</p>
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
<div style="max-width: 96px;"><img alt="Alternate text" height="auto" src="${logoMuve64}" style="display: block; height: auto; border: 0; width: 100%;" title="Alternate text" width="96"/></div>
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
<td style="padding:0 10px 0 10px;"><a href="https://www.facebook.com/people/Muve/61566478731090/" target="_blank"><img alt="Facebook" height="auto" src="${FbIcon}" style="display: block; height: auto; border: 0;" title="Facebook" width="32"/></a></td>
<td style="padding:0 10px 0 10px;"><a href="https://www.instagram.com/muveplayer/" target="_blank"><img alt="Instagram" height="auto" src="i${IgIcon}" style="display: block; height: auto; border: 0;" title="Instagram" width="32"/></a></td>
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
<div style="color:#000000;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:12px;line-height:120%;text-align:left;mso-line-height-alt:14.399999999999999px;">
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
  }
});

// src/templates/invoice-payment-succeeded.ts
var InvoicePaymentSucceededEmail;
var init_invoice_payment_succeeded = __esm({
  "src/templates/invoice-payment-succeeded.ts"() {
    init_images();
    InvoicePaymentSucceededEmail = ({
      name,
      plan,
      price
    }) => {
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
			font-size: 75%;
			line-height: 0;
		}

		@media (max-width:500px) {
			.social_block.desktop_hide .social-table {
				display: inline-block !important;
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
<div style="max-width: 144px;"><img alt="I'm an image" height="auto" src="${muveAzul64}" style="display: block; height: auto; border: 0; width: 100%;" title="I'm an image" width="144"/></div>
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
<p style="margin: 0;"><strong>Assinatura muve renovada!</strong></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">Ol\xE1, ${name}!</p>
<p style="margin: 0;">Estamos felizes em informar que sua assinatura do Muve foi renovada com sucesso! Isso significa que voc\xEA continua com acesso ilimitado \xE0s nossas funcionalidades e ferramentas exclusivas.</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;"><strong>Detalhes da sua renova\xE7\xE3o:</strong></p>
<p style="margin: 0;"><strong>Plano:</strong> ${plan}<br/><strong>Valor:</strong> R${price}</p>
<p style="margin: 0;">Agradecemos por continuar confiando no Muve. Se precisar de qualquer ajuda ou tiver d\xFAvidas, nossa equipe est\xE1 \xE0 disposi\xE7\xE3o.</p>
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
<div style="max-width: 96px;"><img alt="Alternate text" height="auto" src="${logoMuve64}" style="display: block; height: auto; border: 0; width: 100%;" title="Alternate text" width="96"/></div>
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
<td style="padding:0 10px 0 10px;"><a href="https://www.facebook.com/people/Muve/61566478731090/" target="_blank"><img alt="Facebook" height="auto" src="${FbIcon}" style="display: block; height: auto; border: 0;" title="Facebook" width="32"/></a></td>
<td style="padding:0 10px 0 10px;"><a href="https://www.instagram.com/muveplayer/" target="_blank"><img alt="Instagram" height="auto" src="${IgIcon}" style="display: block; height: auto; border: 0;" title="Instagram" width="32"/></a></td>
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
<div style="color:#000000;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:12px;line-height:120%;text-align:left;mso-line-height-alt:14.399999999999999px;">
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
  }
});

// src/templates/index.ts
var init_templates = __esm({
  "src/templates/index.ts"() {
    init_onboarding();
    init_purchase_email();
    init_unsubscribe_email();
    init_half_journey_email();
    init_lateSignature_email();
    init_resetPassword_email();
    init_checkout_expired();
    init_trial_ending_soon_email();
    init_invoice_payment_failed();
    init_invoice_payment_succeeded();
  }
});

// src/use-cases/cases/signature/process-signatures-at-half-trial.ts
var ProcessSignaturesAtHalfTrialUseCase;
var init_process_signatures_at_half_trial = __esm({
  "src/use-cases/cases/signature/process-signatures-at-half-trial.ts"() {
    init_services();
    init_templates();
    ProcessSignaturesAtHalfTrialUseCase = class {
      constructor(signaturesRepository) {
        this.signaturesRepository = signaturesRepository;
      }
      execute() {
        return __async(this, null, function* () {
          const signatures = yield this.signaturesRepository.getSignaturesAtHalfTrial();
          console.log(signatures);
          yield Promise.all(
            signatures.map((signature) => __async(this, null, function* () {
              const onboardingHtml = HalfJourneyEmail();
              yield sendEmail({
                html: onboardingHtml,
                to: signature.user.email,
                from: "contato@muveplayer.com",
                subject: "Aproveite ao m\xE1ximo o Muve! Descubra tudo que voc\xEA pode fazer"
              });
            }))
          );
          return { processedSignatures: signatures };
        });
      }
    };
  }
});

// src/use-cases/factories/signature/make-process-signatures-at-half-trial-use-case.ts
function makeProcessSignaturesAtHalfTrialUseCase() {
  const signatureRepository = new PrismaSignaturesRepository();
  const processSignaturesAtHalfTrialUseCase = new ProcessSignaturesAtHalfTrialUseCase(signatureRepository);
  return processSignaturesAtHalfTrialUseCase;
}
var init_make_process_signatures_at_half_trial_use_case = __esm({
  "src/use-cases/factories/signature/make-process-signatures-at-half-trial-use-case.ts"() {
    init_prisma2();
    init_process_signatures_at_half_trial();
  }
});

// src/use-cases/cases/signature/process-signatures-two-days-after-creation.ts
var ProcessSignaturesTwoDaysAfterCreationUseCase;
var init_process_signatures_two_days_after_creation = __esm({
  "src/use-cases/cases/signature/process-signatures-two-days-after-creation.ts"() {
    init_services();
    init_templates();
    ProcessSignaturesTwoDaysAfterCreationUseCase = class {
      constructor(signaturesRepository) {
        this.signaturesRepository = signaturesRepository;
      }
      execute() {
        return __async(this, null, function* () {
          const signatures = yield this.signaturesRepository.getSignaturesTwoDaysAfterCreation();
          console.log(signatures);
          yield Promise.all(
            signatures.map((signature) => __async(this, null, function* () {
              const onboardingHtml = OnboardingEmail({
                name: signature.user.name
              });
              yield sendEmail({
                html: onboardingHtml,
                to: signature.user.email,
                from: "contato@muveplayer.com",
                subject: "Vamos explorar juntos? Comece agora com o Muve \u{1F680}"
              });
            }))
          );
          return { processedSignatures: signatures };
        });
      }
    };
  }
});

// src/use-cases/factories/signature/make-process-signatures-two-days-after-creation-use-case.ts
function makeProcessSignaturesTwoDaysAfterCreationUseCase() {
  const signatureRepository = new PrismaSignaturesRepository();
  const processSignaturesTwoDaysAfterCreationUseCase = new ProcessSignaturesTwoDaysAfterCreationUseCase(signatureRepository);
  return processSignaturesTwoDaysAfterCreationUseCase;
}
var init_make_process_signatures_two_days_after_creation_use_case = __esm({
  "src/use-cases/factories/signature/make-process-signatures-two-days-after-creation-use-case.ts"() {
    init_prisma2();
    init_process_signatures_two_days_after_creation();
  }
});

// src/use-cases/cases/signature/process-signatures-two-days-before-trial-ends.ts
var ProcessSignaturesTwoDaysBeforeTrialEndsUseCase;
var init_process_signatures_two_days_before_trial_ends = __esm({
  "src/use-cases/cases/signature/process-signatures-two-days-before-trial-ends.ts"() {
    init_services();
    init_templates();
    ProcessSignaturesTwoDaysBeforeTrialEndsUseCase = class {
      constructor(signaturesRepository) {
        this.signaturesRepository = signaturesRepository;
      }
      execute() {
        return __async(this, null, function* () {
          const signatures = yield this.signaturesRepository.getSignaturesTwoDaysBeforeTrialEnds();
          yield Promise.all(
            signatures.map((signature) => __async(this, null, function* () {
              const trialEndingSoonHtml = TrialEndingSoonEmail({
                name: signature.user.name
              });
              yield sendEmail({
                html: trialEndingSoonHtml,
                to: signature.user.email,
                from: "contato@muveplayer.com",
                subject: "Faltam s\xF3 2 dias para o fim do seu trial! Aproveite ao m\xE1ximo"
              });
            }))
          );
          return { processedSignatures: signatures };
        });
      }
    };
  }
});

// src/use-cases/factories/signature/make-process-signatures-two-days-before-trial-ends-use-case.ts
function makeProcessSignaturesTwoDaysBeforeTrialEndsUseCase() {
  const signatureRepository = new PrismaSignaturesRepository();
  const processSignaturesTwoDaysBeforeTrialEndsUseCase = new ProcessSignaturesTwoDaysBeforeTrialEndsUseCase(signatureRepository);
  return processSignaturesTwoDaysBeforeTrialEndsUseCase;
}
var init_make_process_signatures_two_days_before_trial_ends_use_case = __esm({
  "src/use-cases/factories/signature/make-process-signatures-two-days-before-trial-ends-use-case.ts"() {
    init_prisma2();
    init_process_signatures_two_days_before_trial_ends();
  }
});

// src/cron/signature/trial/index.ts
var require_trial = __commonJS({
  "src/cron/signature/trial/index.ts"(exports) {
    var import_node_cron = __toESM(require("node-cron"));
    init_make_process_signatures_at_half_trial_use_case();
    init_make_process_signatures_two_days_after_creation_use_case();
    init_make_process_signatures_two_days_before_trial_ends_use_case();
    var processSignaturesAtHalfTrialUseCase = makeProcessSignaturesAtHalfTrialUseCase();
    var processSignaturesTwoDaysAfterCreationUseCase = makeProcessSignaturesTwoDaysAfterCreationUseCase();
    var processSignaturesTwoDaysBeforeTrialEndsUseCase = makeProcessSignaturesTwoDaysBeforeTrialEndsUseCase();
    import_node_cron.default.schedule("0 0 * * *", () => __async(exports, null, function* () {
      yield processSignaturesTwoDaysAfterCreationUseCase.execute();
    }));
    import_node_cron.default.schedule("0 0 * * *", () => __async(exports, null, function* () {
      yield processSignaturesAtHalfTrialUseCase.execute();
    }));
    import_node_cron.default.schedule("0 0 * * *", () => __async(exports, null, function* () {
      yield processSignaturesTwoDaysBeforeTrialEndsUseCase.execute();
    }));
  }
});

// src/serve.ts
init_env();

// src/cron/index.ts
var cron_exports = {};
__reExport(cron_exports, __toESM(require_trial()));

// src/app.ts
init_env();
var import_fastify = __toESM(require("fastify"));
var import_zod32 = require("zod");
var import_jwt = __toESM(require("@fastify/jwt"));
var import_cors = __toESM(require("@fastify/cors"));
var import_fastify_raw_body = __toESM(require("fastify-raw-body"));

// src/http/controllers/lead/create.ts
var import_zod2 = require("zod");

// src/utils/formatDate.ts
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

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

// src/utils/formatTimestamp.ts
function formatTimestamp(timestamp) {
  return timestamp ? new Date(timestamp * 1e3).toISOString() : null;
}

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

// src/use-cases/cases/lead/create.ts
init_services();
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

// src/use-cases/factories/lead/make-create-use-case.ts
init_prisma2();
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
function leadsRoutes(app2) {
  return __async(this, null, function* () {
    app2.post("/lead", create);
  });
}

// src/http/controllers/users/register.ts
var import_zod3 = require("zod");

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

// src/use-cases/erros/invalid-verification-code-error.ts
var InvalidVerificationCodeError = class extends Error {
  constructor() {
    super("C\xF3digo inv\xE1lido ou email n\xE3o encontrado.");
    this.name = "InvalidVerificationCodeError";
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
init_lib();
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

// src/use-cases/factories/user/make-register-use-case.ts
init_prisma2();
function makeRegisterUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const signaturesRepository = new PrismaSignaturesRepository();
  const registerUseCase = new RegisterUseCase(
    usersRepository,
    signaturesRepository
  );
  return registerUseCase;
}

// src/use-cases/factories/email-verification/make-send-verification-code-use-case.ts
init_prisma2();

// src/use-cases/cases/email-verification/send-verification-code.ts
init_env();
init_services();
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
    const registerBodySchema = import_zod3.z.object({
      name: import_zod3.z.string(),
      phone: import_zod3.z.string(),
      document: import_zod3.z.string(),
      password: import_zod3.z.string(),
      email: import_zod3.z.string().email()
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
init_prisma_user_repository();
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
var import_zod4 = require("zod");

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
init_prisma_user_repository();
function makeCheckEmailUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const checkEmailUseCase = new CheckEmailUseCase(usersRepository);
  return checkEmailUseCase;
}

// src/http/controllers/users/checkEmail.ts
function checkEmail(request, reply) {
  return __async(this, null, function* () {
    const checkEmailBodySchema = import_zod4.z.object({
      email: import_zod4.z.string().email()
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
var import_zod5 = require("zod");

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
init_prisma2();
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
    const authenticateBodySchema = import_zod5.z.object({
      email: import_zod5.z.string().email(),
      password: import_zod5.z.string().min(6)
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
var import_zod6 = require("zod");

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
init_prisma_user_repository();
function makeUpdateEmailUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const updateEmailUseCase = new UpdateEmailUseCase(usersRepository);
  return updateEmailUseCase;
}

// src/http/controllers/users/update-email.ts
function updateEmail(request, reply) {
  return __async(this, null, function* () {
    const updateEmailBodySchema = import_zod6.z.object({
      email: import_zod6.z.string().email(),
      newEmail: import_zod6.z.string().email(),
      password: import_zod6.z.string().min(6)
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
var import_zod7 = require("zod");

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
init_prisma_user_repository();
function makeUpdateProfileUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const updateProfileUseCase = new UpdateProfileUseCase(usersRepository);
  return updateProfileUseCase;
}

// src/http/controllers/users/update-profile.ts
function updateProfile(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const updateProfileBodySchema = import_zod7.z.object({
      document: import_zod7.z.string(),
      phone: import_zod7.z.string(),
      name: import_zod7.z.string()
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
var import_zod8 = require("zod");

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
init_prisma_user_repository();
function makeUpdatePasswordUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const updatePasswordUseCase = new UpdatePasswordUseCase(usersRepository);
  return updatePasswordUseCase;
}

// src/http/controllers/users/update-password.ts
function updatePassword(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const updatePasswordBodySchema = import_zod8.z.object({
      newPassword: import_zod8.z.string().min(6),
      password: import_zod8.z.string().min(6)
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
var import_zod9 = require("zod");

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
init_prisma_user_repository();
function makeForgotPasswordUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const forgotPasswordUseCase = new ForgotPasswordUseCase(usersRepository);
  return forgotPasswordUseCase;
}

// src/http/controllers/users/forgot-password.ts
function forgotPassword(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const updatePasswordBodySchema = import_zod9.z.object({
      newPassword: import_zod9.z.string().min(6),
      confirmNewPassword: import_zod9.z.string().min(6)
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
var import_zod10 = require("zod");
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
init_prisma2();
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
    const addInfoFirstAccessBodySchema = import_zod10.z.object({
      accountType: import_zod10.z.string(),
      memberArea: import_zod10.z.string(),
      videoHosting: import_zod10.z.string()
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
var import_zod11 = require("zod");
init_send_email();
init_templates();

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
init_prisma_user_repository();
function makeFindByEmailUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const findByEmailUseCase = new FindByEmailUseCase(usersRepository);
  return findByEmailUseCase;
}

// src/http/controllers/users/generatePasswordResetToken.ts
function generatePasswordResetToken(request, reply) {
  return __async(this, null, function* () {
    const resetTokenSchema = import_zod11.z.object({
      email: import_zod11.z.string().email()
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
var verify_signature_default = checkSignatureMiddleware;

// src/http/controllers/users/routes.ts
function usersRoutes(app2) {
  return __async(this, null, function* () {
    app2.post("/users", register);
    app2.post("/sessions", authenticate);
    app2.post("/check/email", checkEmail);
    app2.post("/send/password", generatePasswordResetToken);
    app2.post("/forgot/password", { onRequest: [verifyJwt] }, forgotPassword);
    app2.get(
      "/checkJWT",
      { onRequest: [verifyJwt, checkSignatureMiddleware] },
      checkJwt
    );
    app2.post(
      "/first/access",
      { onRequest: [verifyJwt, checkSignatureMiddleware] },
      AddInfoFirstAccess
    );
    app2.post(
      "/update/email",
      { onRequest: [verifyJwt, checkSignatureMiddleware] },
      updateEmail
    );
    app2.post(
      "/update/password",
      { onRequest: [verifyJwt, checkSignatureMiddleware] },
      updatePassword
    );
    app2.post(
      "/update/profile",
      { onRequest: [verifyJwt, checkSignatureMiddleware] },
      updateProfile
    );
  });
}

// src/http/controllers/video/create.ts
var import_zod12 = require("zod");

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

// src/use-cases/factories/video/make-create-video-use-case.ts
init_prisma2();
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
    const chapterSchema = import_zod12.z.object({
      title: import_zod12.z.string().nonempty(),
      startTime: import_zod12.z.string().nonempty(),
      endTime: import_zod12.z.string().nonempty()
    });
    const createVideoBodySchema = import_zod12.z.object({
      url: import_zod12.z.string(),
      type: import_zod12.z.enum(["Vsl", "Curso"]),
      format: import_zod12.z.enum(["9/16", "16/9"]),
      name: import_zod12.z.string(),
      duration: import_zod12.z.string(),
      folderId: import_zod12.z.string().optional(),
      colorProgress: import_zod12.z.string().optional(),
      fictitiousProgress: import_zod12.z.boolean().optional(),
      chapters: import_zod12.z.array(chapterSchema).optional()
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
var import_zod13 = require("zod");

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
init_prisma2();
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
    const deleteVideoParamsSchema = import_zod13.z.object({
      videoId: import_zod13.z.string()
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
var import_zod14 = require("zod");

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
init_prisma2();
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
    const getVideoByIdParamsSchema = import_zod14.z.object({
      videoId: import_zod14.z.string()
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
var import_zod15 = require("zod");

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
init_prisma2();
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
    const buttonSchema = import_zod15.z.object({
      buttonType: import_zod15.z.enum(["below", "inside"]),
      buttonText: import_zod15.z.string().nonempty(),
      buttonSize: import_zod15.z.string().nonempty(),
      buttonLink: import_zod15.z.string().url().nonempty(),
      startTime: import_zod15.z.string().nonempty(),
      endTime: import_zod15.z.string().nonempty(),
      buttonAfterTheVideoEnds: import_zod15.z.boolean().optional(),
      backgroundColor: import_zod15.z.string().nonempty(),
      textColor: import_zod15.z.string().nonempty(),
      hoverBackgroundColor: import_zod15.z.string().nonempty(),
      hoverTextColor: import_zod15.z.string().nonempty(),
      buttonPosition: import_zod15.z.string().nullable().optional()
    });
    const chapterSchema = import_zod15.z.object({
      title: import_zod15.z.string().nonempty(),
      startTime: import_zod15.z.string().nonempty(),
      endTime: import_zod15.z.string().nonempty()
    });
    const editPlayerParamsSchema = import_zod15.z.object({
      videoId: import_zod15.z.string()
    });
    const editPlayerVideoBodySchema = import_zod15.z.object({
      name: import_zod15.z.string().optional(),
      format: import_zod15.z.enum(["9/16", "16/9"]).optional(),
      thumbnail: import_zod15.z.string().optional(),
      color: import_zod15.z.string().optional(),
      colorSmartPlayers: import_zod15.z.string().optional(),
      playAndPause: import_zod15.z.boolean().optional(),
      progressBar: import_zod15.z.boolean().optional(),
      timeTraveled: import_zod15.z.boolean().optional(),
      videoDuration: import_zod15.z.boolean().optional(),
      volumeButton: import_zod15.z.boolean().optional(),
      volumeBar: import_zod15.z.boolean().optional(),
      speed: import_zod15.z.boolean().optional(),
      fullscreen: import_zod15.z.boolean().optional(),
      smartAutoPlay: import_zod15.z.boolean().optional(),
      UrlCoverSmartAutoPlay: import_zod15.z.string().optional(),
      TextTopSmartAutoPlay: import_zod15.z.string().optional(),
      TextButtonSmartAutoPlay: import_zod15.z.string().optional(),
      continueWatching: import_zod15.z.boolean().optional(),
      watchingNow: import_zod15.z.boolean().optional(),
      watchingNowFontSize: import_zod15.z.string().optional(),
      watchingNowBgColor: import_zod15.z.string().optional(),
      watchingNowTextColor: import_zod15.z.string().optional(),
      ImageVideoPause: import_zod15.z.boolean().optional(),
      UrlCoverImageVideoPause: import_zod15.z.string().optional(),
      ImageOfFinished: import_zod15.z.boolean().optional(),
      UrlCoverImageOfFinished: import_zod15.z.string().optional(),
      chapterMenu: import_zod15.z.boolean().optional(),
      buttonsActive: import_zod15.z.boolean().optional(),
      Chapter: import_zod15.z.array(chapterSchema).optional(),
      VideoButtons: import_zod15.z.array(buttonSchema).optional(),
      fictitiousProgressHeight: import_zod15.z.string().optional(),
      fictitiousProgress: import_zod15.z.boolean().optional()
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
init_prisma2();
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
init_prisma2();
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
var import_zod16 = require("zod");

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
init_prisma2();
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
    const editFolderIdVideoBodySchema = import_zod16.z.object({
      videoId: import_zod16.z.string(),
      folderId: import_zod16.z.string()
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
function videosRoutes(app2) {
  return __async(this, null, function* () {
    app2.get("/video/:videoId", getVideoById);
    app2.post(
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
    app2.post(
      "/edit/player/video/:videoId",
      {
        onRequest: [verifyJwt, verify_signature_default]
      },
      editPlayerVideo
    );
    app2.get(
      "/video/not/folder",
      { onRequest: [verifyJwt, verify_signature_default] },
      getManyVideoNotFolderId
    );
    app2.delete(
      "/video/:videoId",
      { onRequest: [verifyJwt, verify_signature_default] },
      deleteVideo
    );
    app2.post(
      "/edit/folder/video",
      { onRequest: [verifyJwt, verify_signature_default] },
      editFolderIdVideo
    );
    app2.get(
      "/video/all",
      { onRequest: [verifyJwt, verify_signature_default] },
      getManyVideoByUserId
    );
  });
}

// src/http/controllers/folder/create-folder.ts
var import_zod17 = require("zod");

// src/use-cases/cases/folder/create.ts
var CreateFolderUseCase = class {
  constructor(usersRepository, folderRepository) {
    this.usersRepository = usersRepository;
    this.folderRepository = folderRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      name,
      userId,
      coverUrl,
      videosId
    }) {
      var _a;
      const user = yield this.usersRepository.findById(userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const folder = yield this.folderRepository.create({
        name,
        coverUrl,
        user: {
          connect: { id: userId }
        },
        videos: {
          connect: (_a = videosId == null ? void 0 : videosId.map((videoId) => ({ id: videoId }))) != null ? _a : []
        }
      });
      return {
        folder
      };
    });
  }
};

// src/use-cases/factories/folder/make-create-folder-use-case.ts
init_prisma2();
function makeCreateFolderUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const folderRepository = new PrismaFoldersRepository();
  const createFolderUseCase = new CreateFolderUseCase(
    usersRepository,
    folderRepository
  );
  return createFolderUseCase;
}

// src/http/controllers/folder/create-folder.ts
function createFolder(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const createFolderBodySchema = import_zod17.z.object({
      name: import_zod17.z.string(),
      coverUrl: import_zod17.z.string().optional(),
      videosId: import_zod17.z.array(import_zod17.z.string()).optional()
    });
    const { name, coverUrl, videosId } = createFolderBodySchema.parse(
      request.body
    );
    const userId = (_a = request.user) == null ? void 0 : _a.sub;
    if (!userId) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    try {
      const createFolderUseCase = makeCreateFolderUseCase();
      const folder = yield createFolderUseCase.execute({
        name,
        userId,
        coverUrl,
        videosId
      });
      return reply.status(201).send(folder);
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/http/controllers/folder/delete-folder.ts
var import_zod18 = require("zod");

// src/use-cases/cases/folder/delete.ts
var DeleteFolderUseCase = class {
  constructor(usersRepository, folderRepository) {
    this.usersRepository = usersRepository;
    this.folderRepository = folderRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      userId,
      folderId
    }) {
      const user = yield this.usersRepository.findById(userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const folder = yield this.folderRepository.findById(folderId);
      if (!folder) {
        throw new NotFoundErros("User");
      }
      if (folder.userId !== user.id) {
        throw new AccessDeniedError("Folder");
      }
      const deletedFolder = yield this.folderRepository.delete(folderId);
      return {
        folder: deletedFolder
      };
    });
  }
};

// src/use-cases/factories/folder/make-delete-folder-use-case.ts
init_prisma2();
function makeDeleteFolderUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const folderRepository = new PrismaFoldersRepository();
  const deleteFolderUseCase = new DeleteFolderUseCase(
    usersRepository,
    folderRepository
  );
  return deleteFolderUseCase;
}

// src/http/controllers/folder/delete-folder.ts
function deleteFolder(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const deleteFolderBodySchema = import_zod18.z.object({
      folderId: import_zod18.z.string()
    });
    const { folderId } = deleteFolderBodySchema.parse(request.params);
    const userId = (_a = request.user) == null ? void 0 : _a.sub;
    if (!userId) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    try {
      const deleteFolderUseCase = makeDeleteFolderUseCase();
      const folder = yield deleteFolderUseCase.execute({
        userId,
        folderId
      });
      return reply.status(200).send(folder);
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

// src/http/controllers/folder/get-folder-by-id.ts
var import_zod19 = require("zod");

// src/use-cases/cases/folder/get-folder-by-id.ts
var GetFolderByIdUseCase = class {
  constructor(usersRepository, folderRepository) {
    this.usersRepository = usersRepository;
    this.folderRepository = folderRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      userId,
      folderId
    }) {
      const user = yield this.usersRepository.findById(userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const folder = yield this.folderRepository.findById(folderId);
      if (!folder) {
        throw new NotFoundErros("Folder");
      }
      if (folder.userId !== user.id) {
        throw new AccessDeniedError("Folder");
      }
      return {
        folder
      };
    });
  }
};

// src/use-cases/factories/folder/make-get-folder-by-id.ts
init_prisma2();
function makeGetFolderByIdUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const folderRepository = new PrismaFoldersRepository();
  const getFolderByIdUseCase = new GetFolderByIdUseCase(
    usersRepository,
    folderRepository
  );
  return getFolderByIdUseCase;
}

// src/http/controllers/folder/get-folder-by-id.ts
function getFolderById(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const getFolderByIdBodySchema = import_zod19.z.object({
      folderId: import_zod19.z.string()
    });
    const { folderId } = getFolderByIdBodySchema.parse(request.params);
    const userId = (_a = request.user) == null ? void 0 : _a.sub;
    if (!userId) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    try {
      const getFolderByIdUseCase = makeGetFolderByIdUseCase();
      const folder = yield getFolderByIdUseCase.execute({
        userId,
        folderId
      });
      return reply.status(200).send(folder);
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

// src/http/controllers/folder/add-favorite-folder.ts
var import_zod20 = require("zod");

// src/use-cases/cases/folder/add-favorite.ts
var AddFavoriteUseCase = class {
  constructor(usersRepository, folderRepository) {
    this.usersRepository = usersRepository;
    this.folderRepository = folderRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      userId,
      value,
      folderId
    }) {
      const user = yield this.usersRepository.findById(userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const folder = yield this.folderRepository.findById(folderId);
      if (!folder) {
        throw new NotFoundErros("Folder");
      }
      if (folder.userId !== user.id) {
        throw new AccessDeniedError("Folder");
      }
      const favoriteFolder = yield this.folderRepository.favoriteFolder(
        folder.id,
        value
      );
      return {
        folder: favoriteFolder
      };
    });
  }
};

// src/use-cases/factories/folder/make-add-favorite-folder-use-case.ts
init_prisma2();
function makeAddFavoriteUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const folderRepository = new PrismaFoldersRepository();
  const addFavoriteUseCase = new AddFavoriteUseCase(
    usersRepository,
    folderRepository
  );
  return addFavoriteUseCase;
}

// src/http/controllers/folder/add-favorite-folder.ts
function addFavoriteFolder(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const addFavoriteFolderBodySchema = import_zod20.z.object({
      folderId: import_zod20.z.string(),
      value: import_zod20.z.boolean()
    });
    const { folderId, value } = addFavoriteFolderBodySchema.parse(request.body);
    const userId = (_a = request.user) == null ? void 0 : _a.sub;
    if (!userId) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    try {
      const addFavoriteUseCase = makeAddFavoriteUseCase();
      const folder = yield addFavoriteUseCase.execute({
        userId,
        folderId,
        value
      });
      return reply.status(200).send(folder);
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

// src/use-cases/cases/folder/get-many-folders-by-user-id.ts
var GetManyFoldersByUserIdUseCase = class {
  constructor(usersRepository, folderRepository) {
    this.usersRepository = usersRepository;
    this.folderRepository = folderRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      userId
    }) {
      const user = yield this.usersRepository.findById(userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const folders = yield this.folderRepository.findManyByUserId(userId);
      return {
        folders
      };
    });
  }
};

// src/use-cases/factories/folder/make-get-many-folders-by-user-id.ts
init_prisma2();
function makeGetManyFoldersByUserIdUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const folderRepository = new PrismaFoldersRepository();
  const getManyFoldersByUserIdUseCase = new GetManyFoldersByUserIdUseCase(
    usersRepository,
    folderRepository
  );
  return getManyFoldersByUserIdUseCase;
}

// src/http/controllers/folder/get-many-folders-by-user-id.ts
function getManyFolderByUserId(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const userId = (_a = request.user) == null ? void 0 : _a.sub;
    if (!userId) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    try {
      const getManyFolderByUserIdUseCase = makeGetManyFoldersByUserIdUseCase();
      const folders = yield getManyFolderByUserIdUseCase.execute({
        userId
      });
      console.log(folders);
      return reply.status(200).send(folders);
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/http/controllers/folder/routes.ts
function foldersRoutes(app2) {
  return __async(this, null, function* () {
    app2.addHook("onRequest", verifyJwt);
    app2.addHook("onRequest", checkSignatureMiddleware);
    app2.post("/folder", createFolder);
    app2.post("/folder/favorite", addFavoriteFolder);
    app2.get("/folder/:folderId", getFolderById);
    app2.delete("/folder/:folderId", deleteFolder);
    app2.get("/folder/all", getManyFolderByUserId);
  });
}

// src/use-cases/cases/signature/get-many-by-user-id.ts
var GetManySignatureByUserIdUseCase = class {
  constructor(usersRepository, signaturesRepository) {
    this.usersRepository = usersRepository;
    this.signaturesRepository = signaturesRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      userId
    }) {
      const user = yield this.usersRepository.findById(userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const signatures = yield this.signaturesRepository.findManyByUserId(userId);
      return {
        signatures
      };
    });
  }
};

// src/use-cases/factories/signature/make-get-many-by-user-id-use-case.ts
init_prisma2();
function makeGetManySignatureByUserIdUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const signatureRepository = new PrismaSignaturesRepository();
  const getManySignatureByUserIdUseCase = new GetManySignatureByUserIdUseCase(
    usersRepository,
    signatureRepository
  );
  return getManySignatureByUserIdUseCase;
}

// src/http/controllers/signature/get-many-by-user-id.ts
function getManySignatureByUserId(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const userId = (_a = request.user) == null ? void 0 : _a.sub;
    if (!userId) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    try {
      const getManySignatureByUserIdUseCase = makeGetManySignatureByUserIdUseCase();
      const { signatures } = yield getManySignatureByUserIdUseCase.execute({
        userId
      });
      return reply.status(200).send(signatures);
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/http/controllers/signature/routes.ts
function signatureRoutes(app2) {
  return __async(this, null, function* () {
    app2.get("/signature", { onRequest: [verifyJwt] }, getManySignatureByUserId);
  });
}

// src/http/middlewares/stripeWebhook.ts
var import_stripe2 = __toESM(require("stripe"));
init_env();

// src/use-cases/factories/webhook-stripe/make-checkout-expired-use-case.ts
init_prisma2();

// src/use-cases/cases/webhook-stripe/checkout-expired.ts
init_services();
init_templates();
var CheckoutExpiredUseCase = class {
  constructor(leadsRepository) {
    this.leadsRepository = leadsRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      leadId
    }) {
      const lead = yield this.leadsRepository.findById(leadId);
      const checkoutExpired2 = CheckoutExpired({
        name: lead.name,
        url: "https://muveplayer.com/"
      });
      const status = yield sendEmail({
        to: lead.email,
        html: checkoutExpired2,
        from: "contato@muveplayer.com",
        subject: "Quase l\xE1! Complete seu cadastro e comece a testar o Muve \u{1F3A5}"
      });
      return { emailSend: !!status };
    });
  }
};

// src/use-cases/factories/webhook-stripe/make-checkout-expired-use-case.ts
function makeCheckoutExpiredUseCase() {
  const leadsRepository = new PrismaLeadsRepository();
  const checkoutExpiredUseCase = new CheckoutExpiredUseCase(leadsRepository);
  return checkoutExpiredUseCase;
}

// src/http/controllers/webhook-stripe/checkout-expired.ts
function checkoutExpired(request, reply, object) {
  return __async(this, null, function* () {
    try {
      const checkoutExpiredUseCase = makeCheckoutExpiredUseCase();
      const { emailSend } = yield checkoutExpiredUseCase.execute({
        leadId: object.client_reference_id
      });
      return reply.status(200).send({
        message: `Email send: ${emailSend}`
      });
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/use-cases/factories/webhook-stripe/make-checkout-completed-use-case.ts
init_prisma2();

// src/use-cases/cases/webhook-stripe/checkout-completed.ts
var import_bcryptjs6 = require("bcryptjs");
init_services();
init_templates();
var CheckoutCompletedUseCase = class {
  constructor(leadsRepository, userRepository, signatureRepository) {
    this.leadsRepository = leadsRepository;
    this.userRepository = userRepository;
    this.signatureRepository = signatureRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      leadId,
      customerId,
      subscriptionId
    }) {
      const lead = yield this.leadsRepository.findById(leadId);
      if (!lead) {
        throw new NotFoundErros("Lead");
      }
      let user;
      const userExist = yield this.userRepository.findByEmail(lead.email);
      if (userExist) {
        user = yield this.userRepository.update(user.id, {
          stripeCustomersId: customerId
        });
      } else {
        const password_hash = yield (0, import_bcryptjs6.hash)(lead.document, 6);
        user = yield this.userRepository.create({
          password_hash,
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          document: lead.document,
          stripeCustomersId: customerId
        });
      }
      yield this.leadsRepository.delete(lead.id);
      const purchaseEmail = PurchaseEmail({
        name: user.name,
        password: user.document,
        login: user.email
      });
      yield sendEmail({
        to: user.email,
        html: purchaseEmail,
        from: "contato@muveplayer.com",
        subject: "Compra aprovada Muve Player"
      });
      return { user };
    });
  }
};

// src/use-cases/factories/webhook-stripe/make-checkout-completed-use-case.ts
function makeCheckoutCompletedUseCase() {
  const leadsRepository = new PrismaLeadsRepository();
  const usersRepository = new PrimasUsersRepository();
  const signaturesRepository = new PrismaSignaturesRepository();
  const checkoutCompletedUseCase = new CheckoutCompletedUseCase(
    leadsRepository,
    usersRepository,
    signaturesRepository
  );
  return checkoutCompletedUseCase;
}

// src/http/controllers/webhook-stripe/checkout-completed.ts
function checkoutCompleted(request, reply, object) {
  return __async(this, null, function* () {
    try {
      const checkoutCompletedUseCase = makeCheckoutCompletedUseCase();
      const { signature, user } = yield checkoutCompletedUseCase.execute({
        leadId: object.client_reference_id,
        customerId: String(object.customer),
        subscriptionId: String(object.subscription)
      });
      user.password_hash = "";
      return reply.status(200).send({
        user,
        signature
      });
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/use-cases/factories/webhook-stripe/make-subscription-updated-use-case.ts
init_prisma2();

// src/use-cases/cases/webhook-stripe/subscription-updated.ts
init_lib();
var SubscriptionUpdatedUseCase = class {
  constructor(usersRepository, signatureRepository) {
    this.usersRepository = usersRepository;
    this.signatureRepository = signatureRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      subscriptionId
    }) {
      const subscription = yield stripe.subscriptions.retrieve(subscriptionId);
      const lastSignature = yield this.signatureRepository.findLastByStripeSubscriptionId(
        subscriptionId
      );
      if (!lastSignature) {
        throw new NotFoundErros("Last Signature");
      }
      const updatedSignature = yield this.signatureRepository.update(
        lastSignature.id,
        {
          status: subscription.status,
          plan: subscription.items.data[0].price.id,
          end_date: new Date(subscription.current_period_end * 1e3),
          start_date: new Date(subscription.current_period_start * 1e3),
          next_charge_date: formatTimestamp(subscription.current_period_end)
        }
      );
      return { updatedSignature };
    });
  }
};

// src/use-cases/factories/webhook-stripe/make-subscription-updated-use-case.ts
function makeSubscriptionUpdatedUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const signaturesRepository = new PrismaSignaturesRepository();
  const subscriptionUpdatedUseCase = new SubscriptionUpdatedUseCase(
    usersRepository,
    signaturesRepository
  );
  return subscriptionUpdatedUseCase;
}

// src/http/controllers/webhook-stripe/subscription-update.ts
function subscriptionUpdate(reply, request, object) {
  return __async(this, null, function* () {
    try {
      const subscriptionUpdatedUseCase = makeSubscriptionUpdatedUseCase();
      const { updatedSignature } = yield subscriptionUpdatedUseCase.execute({
        subscriptionId: object.id
      });
      return reply.status(200).send({
        updatedSignature
      });
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/use-cases/factories/webhook-stripe/make-subscription-deleted-use-case.ts
init_prisma2();

// src/use-cases/cases/webhook-stripe/subscription-deleted.ts
init_lib();
init_services();
init_templates();
var SubscriptionDeletedUseCase = class {
  constructor(usersRepository, signatureRepository) {
    this.usersRepository = usersRepository;
    this.signatureRepository = signatureRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      subscriptionId
    }) {
      const subscription = yield stripe.subscriptions.retrieve(subscriptionId);
      const lastSignature = yield this.signatureRepository.findLastByStripeSubscriptionId(
        subscriptionId
      );
      if (!lastSignature) {
        throw new NotFoundErros("Last Signature");
      }
      const updatedSignature = yield this.signatureRepository.updateStatusSignature(
        lastSignature.id,
        subscription.status
      );
      const user = yield this.usersRepository.findById(lastSignature.userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const cancellationEmail = UnsubscribeEmail({
        name: user.name
      });
      yield sendEmail({
        to: user.email,
        html: cancellationEmail,
        from: "contato@muveplayer.com",
        subject: "Assinatura Cancelada - Muve Player"
      });
      return { updatedSignature };
    });
  }
};

// src/use-cases/factories/webhook-stripe/make-subscription-deleted-use-case.ts
function makeSubscriptionDeletedUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const signaturesRepository = new PrismaSignaturesRepository();
  const subscriptionDeletedUseCase = new SubscriptionDeletedUseCase(
    usersRepository,
    signaturesRepository
  );
  return subscriptionDeletedUseCase;
}

// src/http/controllers/webhook-stripe/subscription-deleted.ts
function subscriptionDeleted(reply, request, object) {
  return __async(this, null, function* () {
    try {
      const subscriptionDeletedUseCase = makeSubscriptionDeletedUseCase();
      const { updatedSignature } = yield subscriptionDeletedUseCase.execute({
        subscriptionId: object.id
      });
      return reply.status(200).send({
        updatedSignature
      });
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/use-cases/factories/webhook-stripe/make-invoice-payment-failed-use-case.ts
init_prisma2();

// src/use-cases/cases/webhook-stripe/invoice-payment-failed.ts
init_lib();
init_services();
init_templates();
var InvoicePaymentFailedUseCase = class {
  constructor(usersRepository, signatureRepository) {
    this.usersRepository = usersRepository;
    this.signatureRepository = signatureRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      invoiceId,
      subscriptionId
    }) {
      const subscription = yield stripe.subscriptions.retrieve(subscriptionId);
      const lastSignature = yield this.signatureRepository.findLastByStripeSubscriptionId(
        subscriptionId
      );
      if (!lastSignature) {
        throw new NotFoundErros("Last Signature");
      }
      const updatedSignature = yield this.signatureRepository.update(
        lastSignature.id,
        {
          status: subscription.status,
          end_date: formatTimestamp(subscription.current_period_end),
          payment_method: String(subscription.default_payment_method),
          start_date: formatTimestamp(subscription.current_period_start),
          next_charge_date: formatTimestamp(subscription.current_period_end)
        }
      );
      const user = yield this.usersRepository.findById(lastSignature.userId);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const plan = planNameMappingStripe(updatedSignature.plan);
      const invoicePaymentFailed2 = InvoicePaymentFailedEmail({
        plan,
        name: user.name,
        price: (Number(updatedSignature.price) / 100).toFixed(2)
      });
      yield sendEmail({
        to: user.email,
        html: invoicePaymentFailed2,
        from: "contato@muveplayer.com",
        subject: "Aten\xE7\xE3o: Houve um problema com o pagamento da sua assinatura"
      });
      return { updatedSignature };
    });
  }
};

// src/use-cases/factories/webhook-stripe/make-invoice-payment-failed-use-case.ts
function makeInvoicePaymentFailedUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const signaturesRepository = new PrismaSignaturesRepository();
  const invoicePaymentFailedUseCase = new InvoicePaymentFailedUseCase(
    usersRepository,
    signaturesRepository
  );
  return invoicePaymentFailedUseCase;
}

// src/http/controllers/webhook-stripe/invoice-payment-failed.ts
function invoicePaymentFailed(reply, request, object) {
  return __async(this, null, function* () {
    try {
      const invoicePaymentFailedUseCase = makeInvoicePaymentFailedUseCase();
      const { updatedSignature } = yield invoicePaymentFailedUseCase.execute({
        invoiceId: object.id,
        subscriptionId: String(object.subscription)
      });
      return reply.status(200).send({
        updatedSignature
      });
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/use-cases/factories/webhook-stripe/make-invoice-payment-succeeded-use-case.ts
init_prisma2();

// src/use-cases/cases/webhook-stripe/invoice-payment-succeeded.ts
init_lib();
init_services();
init_templates();
var InvoicePaymentSucceededUseCase = class {
  constructor(usersRepository, signatureRepository) {
    this.usersRepository = usersRepository;
    this.signatureRepository = signatureRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      subscriptionId,
      customerId,
      invoiceId
    }) {
      const invoice = yield stripe.invoices.retrieve(invoiceId);
      const subscription = yield stripe.subscriptions.retrieve(subscriptionId);
      const user = yield this.usersRepository.findByCustomerId(
        String(subscription.customer)
      );
      if (!user) {
        throw new NotFoundErros("User");
      }
      const lastSignature = yield this.signatureRepository.findLastByStripeSubscriptionId(
        subscriptionId
      );
      if (lastSignature) {
        yield this.signatureRepository.updateStatusSignature(
          lastSignature.id,
          subscription.status
        );
      }
      console.log(user.id);
      const newSignature = yield this.signatureRepository.create({
        plan: String(invoice.lines.data[0].plan.id),
        ChargeFrequency: "MONTHLY",
        status: subscription.status,
        stripe_customer_id: customerId,
        price: String(invoice.amount_paid),
        stripe_subscription_id: subscriptionId,
        user: { connect: { id: user.id } },
        trial_end_date: formatTimestamp(subscription.trial_end),
        end_date: formatTimestamp(subscription.current_period_end),
        payment_method: String(subscription.default_payment_method),
        start_date: formatTimestamp(subscription.current_period_start),
        next_charge_date: formatTimestamp(subscription.current_period_end)
      });
      const plan = planNameMappingStripe(newSignature.plan);
      const invoicePaymentSucceeded2 = InvoicePaymentSucceededEmail({
        plan,
        name: user.name,
        price: (Number(newSignature.price) / 100).toFixed(2)
      });
      const subject = lastSignature ? "Assinatura muve renovada!" : "Assinatura muve paga com sucesso!";
      yield sendEmail({
        to: user.email,
        html: invoicePaymentSucceeded2,
        from: "contato@muveplayer.com",
        subject
      });
      return { newSignature };
    });
  }
};

// src/use-cases/factories/webhook-stripe/make-invoice-payment-succeeded-use-case.ts
function makeInvoicePaymentSucceededUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const signaturesRepository = new PrismaSignaturesRepository();
  const invoicePaymentSucceededUseCase = new InvoicePaymentSucceededUseCase(
    usersRepository,
    signaturesRepository
  );
  return invoicePaymentSucceededUseCase;
}

// src/http/controllers/webhook-stripe/invoice-payment-succeeded.ts
function invoicePaymentSucceeded(reply, request, object) {
  return __async(this, null, function* () {
    try {
      const invoicePaymentSucceededUseCase = makeInvoicePaymentSucceededUseCase();
      const { newSignature } = yield invoicePaymentSucceededUseCase.execute({
        invoiceId: object.id,
        customerId: String(object.customer),
        subscriptionId: String(object.subscription)
      });
      return reply.status(200).send({
        newSignature
      });
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/http/middlewares/stripeWebhook.ts
function handleStripeWebhook(request, reply) {
  return __async(this, null, function* () {
    const sig = request.headers["stripe-signature"];
    let event;
    try {
      event = import_stripe2.default.webhooks.constructEvent(
        request.rawBody,
        sig,
        env.STRIPE_SECRET_WEBHOOK_KEY
      );
    } catch (err) {
      console.error(`\u26A0\uFE0F  Webhook signature verification failed: ${err.message}`);
      return reply.status(400).send(`Webhook Error: ${err.message}`);
    }
    switch (event.type) {
      case "checkout.session.expired":
        yield checkoutExpired(request, reply, event.data.object);
        break;
      case "checkout.session.completed":
        yield checkoutCompleted(request, reply, event.data.object);
        break;
      case "customer.subscription.deleted":
        yield subscriptionDeleted(reply, request, event.data.object);
        break;
      case "customer.subscription.updated":
        yield subscriptionUpdate(reply, request, event.data.object);
        break;
      case "invoice.payment_failed":
        yield invoicePaymentFailed(reply, request, event.data.object);
        break;
      case "invoice.payment_succeeded":
        yield invoicePaymentSucceeded(reply, request, event.data.object);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
        reply.status(200).send({ received: true });
        break;
    }
  });
}

// src/http/controllers/webhook-stripe/routes.ts
function webhookStripeRoutes(app2) {
  return __async(this, null, function* () {
    app2.post("/webhook/stripe", {
      config: {
        rawBody: true
      },
      handler: handleStripeWebhook
    });
  });
}

// src/http/controllers/videoAnalytics/add-view-timestamps.ts
var import_zod21 = require("zod");

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

// src/use-cases/factories/videoAnalytics/make-add-view-timestamps-use-case.ts
init_prisma2();
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
    const addViewTimestampsBodySchema = import_zod21.z.object({
      videoId: import_zod21.z.string(),
      userIp: import_zod21.z.string(),
      // Adiciona userIp
      deviceType: import_zod21.z.string(),
      // Adiciona deviceType
      agent: import_zod21.z.string(),
      // Adiciona agent
      country: import_zod21.z.string(),
      // Adiciona country
      region: import_zod21.z.string(),
      // Adiciona region
      city: import_zod21.z.string(),
      // Adiciona city
      endTimestamp: import_zod21.z.number(),
      startTimestamp: import_zod21.z.number()
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

// src/http/controllers/videoAnalytics/get-analytics-by-video-id.ts
var import_zod22 = require("zod");

// src/use-cases/cases/videoAnalytics/get-analytics-by-video-id.ts
var GetAnalyticsByVideoIdUseCase = class {
  constructor(usersRepository, videoRepository, videoAnalyticsRepository) {
    this.usersRepository = usersRepository;
    this.videoRepository = videoRepository;
    this.videoAnalyticsRepository = videoAnalyticsRepository;
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
      console.log(videoId);
      const analytics = yield this.videoAnalyticsRepository.findByVideoId(videoId);
      return {
        analytics
      };
    });
  }
};

// src/use-cases/factories/videoAnalytics/make-get-analytics-by-video-id-use-case.ts
init_prisma2();
function makeGetAnalyticsByVideoIdUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const videoRepository = new PrimasVideosRepository();
  const videoAnalyticsRepository = new PrimasVideoAnalyticsRepository();
  const getAnalyticsByVideoIdUseCase = new GetAnalyticsByVideoIdUseCase(
    usersRepository,
    videoRepository,
    videoAnalyticsRepository
  );
  return getAnalyticsByVideoIdUseCase;
}

// src/http/controllers/videoAnalytics/get-analytics-by-video-id.ts
function getAnalyticsByVideoId(request, reply) {
  return __async(this, null, function* () {
    var _a;
    const getAnalyticsByVideoIdParamsSchema = import_zod22.z.object({
      videoId: import_zod22.z.string().optional()
    });
    const { videoId } = getAnalyticsByVideoIdParamsSchema.parse(request.params);
    const userId = (_a = request.user) == null ? void 0 : _a.sub;
    if (!userId) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    try {
      const getAnalyticsByVideoIdUseCase = makeGetAnalyticsByVideoIdUseCase();
      const videoAnalytics = yield getAnalyticsByVideoIdUseCase.execute({
        userId,
        videoId
      });
      return reply.status(200).send(videoAnalytics);
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

// src/http/controllers/videoAnalytics/add-view-unique.ts
var import_zod23 = require("zod");

// src/use-cases/cases/videoAnalytics/add-view-unique.ts
var AddViewUniquesUseCase = class {
  constructor(videoRepository, viewUniqueRepository, videoAnalyticsRepository) {
    this.videoRepository = videoRepository;
    this.viewUniqueRepository = viewUniqueRepository;
    this.videoAnalyticsRepository = videoAnalyticsRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      userIp,
      videoId,
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
      const view = yield this.viewUniqueRepository.create({
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
      const updatedAnalytics = yield this.videoAnalyticsRepository.updateTotalViews(
        analytics.id,
        analytics.totalViews + 1
      );
      return {
        analytics: updatedAnalytics,
        view
      };
    });
  }
};

// src/use-cases/factories/videoAnalytics/make-add-view-use-case.ts
init_prisma2();
function makeAddViewUniquesUseCase() {
  const videoRepository = new PrimasVideosRepository();
  const viewUniqueRepository = new PrimasViewUniqueRepository();
  const videoAnalyticsRepository = new PrimasVideoAnalyticsRepository();
  const addViewUniquesUseCase = new AddViewUniquesUseCase(
    videoRepository,
    viewUniqueRepository,
    videoAnalyticsRepository
  );
  return addViewUniquesUseCase;
}

// src/http/controllers/videoAnalytics/add-view-unique.ts
function addViewUnique(request, reply) {
  return __async(this, null, function* () {
    const addViewUniqueBodySchema = import_zod23.z.object({
      videoId: import_zod23.z.string(),
      userIp: import_zod23.z.string(),
      deviceType: import_zod23.z.string(),
      agent: import_zod23.z.string(),
      country: import_zod23.z.string(),
      region: import_zod23.z.string(),
      city: import_zod23.z.string()
    });
    const { videoId, userIp, deviceType, agent, country, region, city } = addViewUniqueBodySchema.parse(request.body);
    try {
      const addViewUniqueUseCase = makeAddViewUniquesUseCase();
      const videoAnalytics = yield addViewUniqueUseCase.execute({
        videoId,
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

// src/http/controllers/videoAnalytics/routes.ts
function analyticsRoutes(app2) {
  return __async(this, null, function* () {
    app2.get(
      "/analytic/:videoId",
      { onRequest: [verifyJwt, verify_signature_default] },
      getAnalyticsByVideoId
    );
    app2.post("/add/analytics", addViewTimestamps);
    app2.post("/analytics/views", addViewUnique);
  });
}

// src/http/controllers/webhook-kirvano/purchaseApproved.ts
var import_zod24 = require("zod");

// src/use-cases/cases/webhook-kirvano/purchaseApproved.ts
var import_bcryptjs7 = require("bcryptjs");
init_templates();
init_send_email();
var PurchaseApprovedUseCase = class {
  constructor(usersRepository, signaturesRepository) {
    this.usersRepository = usersRepository;
    this.signaturesRepository = signaturesRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      status,
      name,
      email,
      phone,
      document,
      password,
      plan,
      price,
      payment_method,
      chargeFrequency,
      next_charge_date,
      kirvano_type,
      kirvano_sale_id,
      kirvano_checkout_id
    }) {
      const sendEmailPurchased = () => __async(this, null, function* () {
        const purchaseEmail = PurchaseEmail({
          name,
          password,
          login: email
        });
        yield sendEmail({
          from: "contato@muveplayer.com",
          // O remetente
          to: email,
          // O destinatário
          subject: "Compra aprovado Muve Player",
          // Assunto do email
          html: purchaseEmail
        });
      });
      const password_hash = yield (0, import_bcryptjs7.hash)(password, 6);
      const userExist = yield this.usersRepository.findByEmail(email);
      if (!userExist) {
        const user = yield this.usersRepository.create({
          name,
          email,
          phone,
          document,
          password_hash
        });
        const signaturePlan = planMapping(plan);
        console.log(signaturePlan, "Use Case");
        const signature = yield this.signaturesRepository.create({
          price,
          payment_method,
          plan: signaturePlan,
          status,
          kirvano_type,
          kirvano_sale_id,
          kirvano_checkout_id,
          next_charge_date,
          ChargeFrequency: chargeFrequency,
          user: {
            connect: {
              id: user.id
            }
          }
        });
        user.password_hash = "";
        yield sendEmailPurchased();
        return {
          user,
          signature
        };
      } else {
        const lastSignature = yield this.signaturesRepository.findByUserId(
          userExist.id
        );
        if (!lastSignature) {
          throw new NotFoundErros("Signature");
        }
        yield this.signaturesRepository.updateStatusSignature(
          lastSignature.id,
          "CANCELED"
        );
        const signaturePlan = planMapping(plan);
        console.log(signaturePlan, "Use Case UserExist");
        const signature = yield this.signaturesRepository.create({
          price,
          payment_method,
          plan: signaturePlan,
          status,
          kirvano_type,
          kirvano_sale_id,
          kirvano_checkout_id,
          next_charge_date,
          ChargeFrequency: chargeFrequency,
          user: {
            connect: {
              id: userExist.id
            }
          }
        });
        userExist.password_hash = "";
        sendEmailPurchased();
        return {
          user: userExist,
          signature
        };
      }
    });
  }
};

// src/use-cases/factories/webhook-kirvano/make-purchase-approved-use-case.ts
init_prisma2();
function makePurchaseApprovedUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const signatureRepository = new PrismaSignaturesRepository();
  const purchaseApprovedUseCase = new PurchaseApprovedUseCase(
    usersRepository,
    signatureRepository
  );
  return purchaseApprovedUseCase;
}

// src/http/controllers/webhook-kirvano/purchaseApproved.ts
function purchaseApproved(request, reply) {
  return __async(this, null, function* () {
    const purchaseApprovedEventSchema = import_zod24.z.object({
      event: import_zod24.z.string(),
      status: import_zod24.z.string(),
      payment_method: import_zod24.z.string(),
      plan: import_zod24.z.object({
        name: import_zod24.z.string(),
        charge_frequency: import_zod24.z.string(),
        next_charge_date: import_zod24.z.string()
      }),
      customer: import_zod24.z.object({
        name: import_zod24.z.string(),
        document: import_zod24.z.string(),
        email: import_zod24.z.string(),
        phone_number: import_zod24.z.string()
      }),
      type: import_zod24.z.string(),
      sale_id: import_zod24.z.string(),
      checkout_id: import_zod24.z.string(),
      total_price: import_zod24.z.string(),
      products: import_zod24.z.array(
        import_zod24.z.object({
          id: import_zod24.z.string(),
          name: import_zod24.z.string(),
          photo: import_zod24.z.string().url(),
          price: import_zod24.z.string(),
          offer_id: import_zod24.z.string(),
          offer_name: import_zod24.z.string(),
          description: import_zod24.z.string(),
          is_order_bump: import_zod24.z.boolean()
        })
      )
    });
    const {
      event,
      plan,
      status,
      customer,
      sale_id,
      checkout_id,
      total_price,
      type,
      payment_method,
      products
    } = purchaseApprovedEventSchema.parse(request.body);
    try {
      if (event === "SALE_APPROVED") {
        console.log(products[0].offer_name);
        const purchaseApprovedUseCase = makePurchaseApprovedUseCase();
        const { signature, user } = yield purchaseApprovedUseCase.execute({
          status,
          name: customer.name,
          email: customer.email,
          phone: customer.phone_number,
          document: customer.document,
          password: customer.document,
          payment_method,
          price: total_price,
          plan: products[0].offer_name,
          chargeFrequency: plan.charge_frequency,
          next_charge_date: plan.next_charge_date,
          kirvano_type: type,
          kirvano_sale_id: sale_id,
          kirvano_checkout_id: checkout_id
        });
        return reply.status(200).send({
          signature,
          user
        });
      }
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/http/controllers/webhook-kirvano/subscriptionExpired.ts
var import_zod25 = require("zod");

// src/use-cases/cases/webhook-kirvano/subscriptionExpired.ts
init_templates();
init_send_email();
var SubscriptionExpiredUseCase = class {
  constructor(usersRepository, videoRepository, signaturesRepository) {
    this.usersRepository = usersRepository;
    this.videoRepository = videoRepository;
    this.signaturesRepository = signaturesRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      email,
      status
    }) {
      const user = yield this.usersRepository.findByEmail(email);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const signature = yield this.signaturesRepository.findByUserId(user.id);
      if (!signature) {
        throw new NotFoundErros("Signature");
      }
      const newStatusSignature = yield this.signaturesRepository.updateStatusSignature(
        signature.id,
        status
      );
      const lateSignatureEmail = LateSignatureEmail({
        name: user.name,
        expirationDate: formatDate(newStatusSignature.next_charge_date),
        paymentLink: "https://muveplayer.com/",
        value: newStatusSignature.price
      });
      yield sendEmail({
        from: "contato@muveplayer.com",
        // O remetente
        to: email,
        // O destinatário
        subject: "Assinatura Atrasada Muve Player",
        // Assunto do email
        html: lateSignatureEmail
      });
      return {
        user,
        signature: newStatusSignature
      };
    });
  }
};

// src/use-cases/factories/webhook-kirvano/make-subscription-expired-use-case.ts
init_prisma2();
function makeSubscriptionExpiredUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const videosRepository = new PrimasVideosRepository();
  const signatureRepository = new PrismaSignaturesRepository();
  const subscriptionExpiredUseCase = new SubscriptionExpiredUseCase(
    usersRepository,
    videosRepository,
    signatureRepository
  );
  return subscriptionExpiredUseCase;
}

// src/http/controllers/webhook-kirvano/subscriptionExpired.ts
function subscriptionExpired(request, reply) {
  return __async(this, null, function* () {
    const subscriptionExpiredEventSchema = import_zod25.z.object({
      event: import_zod25.z.string(),
      status: import_zod25.z.string(),
      customer: import_zod25.z.object({
        name: import_zod25.z.string(),
        document: import_zod25.z.string(),
        email: import_zod25.z.string().email(),
        phone_number: import_zod25.z.string()
      })
    });
    const { event, status, customer } = subscriptionExpiredEventSchema.parse(
      request.body
    );
    try {
      if (event === "SUBSCRIPTION_EXPIRED") {
        const subscriptionExpiredUseCase = makeSubscriptionExpiredUseCase();
        console.log(customer.email);
        const { signature, user } = yield subscriptionExpiredUseCase.execute({
          status,
          email: customer.email
        });
        return reply.status(200).send({
          signature,
          user
        });
      }
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/http/controllers/webhook-kirvano/subscriptionRenewed.ts
var import_zod26 = require("zod");

// src/use-cases/cases/webhook-kirvano/subscriptionsRenewed.ts
var SubscriptionsRenewedUseCase = class {
  constructor(usersRepository, signaturesRepository) {
    this.usersRepository = usersRepository;
    this.signaturesRepository = signaturesRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      status,
      email,
      plan,
      price,
      payment_method,
      chargeFrequency,
      next_charge_date,
      kirvano_type,
      kirvano_sale_id,
      kirvano_checkout_id
    }) {
      const user = yield this.usersRepository.findByEmail(email);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const lastSignature = yield this.signaturesRepository.findByUserId(user.id);
      if (!lastSignature) {
        throw new NotFoundErros("Signature");
      }
      yield this.signaturesRepository.updateStatusSignature(
        lastSignature.id,
        "CANCELED"
      );
      const signaturePlan = planMapping(plan);
      const subscriptionsRenewed = yield this.signaturesRepository.create({
        price,
        payment_method,
        plan: signaturePlan,
        status,
        kirvano_type,
        kirvano_sale_id,
        kirvano_checkout_id,
        next_charge_date,
        ChargeFrequency: chargeFrequency,
        user: {
          connect: {
            id: user.id
          }
        }
      });
      return {
        subscriptionsRenewed
      };
    });
  }
};

// src/use-cases/factories/webhook-kirvano/make-subscription-renewed-use-case.ts
init_prisma2();
function makeSubscriptionsRenewedUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const signatureRepository = new PrismaSignaturesRepository();
  const subscriptionsRenewedUseCase = new SubscriptionsRenewedUseCase(
    usersRepository,
    signatureRepository
  );
  return subscriptionsRenewedUseCase;
}

// src/http/controllers/webhook-kirvano/subscriptionRenewed.ts
function subscriptionRenewed(request, reply) {
  return __async(this, null, function* () {
    const subscriptionRenewedEventSchema = import_zod26.z.object({
      event: import_zod26.z.string(),
      status: import_zod26.z.string(),
      payment_method: import_zod26.z.string(),
      plan: import_zod26.z.object({
        name: import_zod26.z.string(),
        charge_frequency: import_zod26.z.string(),
        next_charge_date: import_zod26.z.string()
      }),
      customer: import_zod26.z.object({
        name: import_zod26.z.string(),
        document: import_zod26.z.string(),
        email: import_zod26.z.string().email(),
        phone_number: import_zod26.z.string()
      }),
      type: import_zod26.z.string(),
      sale_id: import_zod26.z.string(),
      checkout_id: import_zod26.z.string(),
      total_price: import_zod26.z.string(),
      products: import_zod26.z.array(
        import_zod26.z.object({
          id: import_zod26.z.string(),
          name: import_zod26.z.string(),
          photo: import_zod26.z.string().url(),
          price: import_zod26.z.string(),
          offer_id: import_zod26.z.string(),
          offer_name: import_zod26.z.string(),
          description: import_zod26.z.string(),
          is_order_bump: import_zod26.z.boolean()
        })
      )
    });
    const {
      event,
      plan,
      status,
      customer,
      sale_id,
      checkout_id,
      total_price,
      type,
      payment_method,
      products
    } = subscriptionRenewedEventSchema.parse(request.body);
    try {
      if (event === "SUBSCRIPTION_RENEWED") {
        const subscriptionsRenewedUseCase = makeSubscriptionsRenewedUseCase();
        const { subscriptionsRenewed } = yield subscriptionsRenewedUseCase.execute({
          status,
          email: customer.email,
          payment_method,
          price: total_price,
          plan: products[0].offer_name,
          chargeFrequency: plan.charge_frequency,
          next_charge_date: plan.next_charge_date,
          kirvano_type: type,
          kirvano_sale_id: sale_id,
          kirvano_checkout_id: checkout_id
        });
        return reply.status(200).send({
          subscriptionsRenewed
        });
      }
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/http/controllers/webhook-kirvano/subscriptionCanceled.ts
var import_zod27 = require("zod");

// src/use-cases/cases/webhook-kirvano/subscriptionCanceled.ts
init_templates();
init_send_email();
var SubscriptionCanceledUseCase = class {
  constructor(usersRepository, videoRepository, signaturesRepository) {
    this.usersRepository = usersRepository;
    this.videoRepository = videoRepository;
    this.signaturesRepository = signaturesRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      email,
      status
    }) {
      const user = yield this.usersRepository.findByEmail(email);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const signature = yield this.signaturesRepository.findByUserId(user.id);
      if (!signature) {
        throw new NotFoundErros("Signature");
      }
      const newStatusSignature = yield this.signaturesRepository.updateStatusSignature(
        signature.id,
        status
      );
      const unsubscribe = UnsubscribeEmail({
        name: user.name
      });
      yield sendEmail({
        from: "contato@muveplayer.com",
        to: email,
        // O destinatário
        subject: "Assinatura Cancelada Muve player",
        // Assunto do email
        html: unsubscribe
      });
      return {
        user,
        signature: newStatusSignature
      };
    });
  }
};

// src/use-cases/factories/webhook-kirvano/make-subscription-canceled-use-case.ts
init_prisma2();
function makeSubscriptionCanceledUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const videosRepository = new PrimasVideosRepository();
  const signatureRepository = new PrismaSignaturesRepository();
  const subscriptionCanceledUseCase = new SubscriptionCanceledUseCase(
    usersRepository,
    videosRepository,
    signatureRepository
  );
  return subscriptionCanceledUseCase;
}

// src/http/controllers/webhook-kirvano/subscriptionCanceled.ts
function subscriptionCanceled(request, reply) {
  return __async(this, null, function* () {
    const subscriptionCanceledEventSchema = import_zod27.z.object({
      event: import_zod27.z.string(),
      status: import_zod27.z.string(),
      customer: import_zod27.z.object({
        name: import_zod27.z.string(),
        document: import_zod27.z.string(),
        email: import_zod27.z.string().email(),
        phone_number: import_zod27.z.string()
      })
    });
    const { event, status, customer } = subscriptionCanceledEventSchema.parse(
      request.body
    );
    try {
      if (event === "SUBSCRIPTION_CANCELED") {
        const subscriptionCanceledUseCase = makeSubscriptionCanceledUseCase();
        const { signature, user } = yield subscriptionCanceledUseCase.execute({
          status,
          email: customer.email
        });
        return reply.status(200).send({
          signature,
          user
        });
      }
    } catch (err) {
      if (err instanceof NotFoundErros) {
        return reply.status(409).send({ message: err.message });
      }
      throw err;
    }
  });
}

// src/http/controllers/webhook-kirvano/routes.ts
function webhookKirvanoRoutes(app2) {
  return __async(this, null, function* () {
    app2.post("/webhook/purchase/approved", purchaseApproved);
    app2.post("/webhook/subscription/expired", subscriptionExpired);
    app2.post("/webhook/subscription/renewed", subscriptionRenewed);
    app2.post("/webhook/subscription/canceled", subscriptionCanceled);
  });
}

// src/http/controllers/email-varification/validation-code.ts
var import_zod28 = require("zod");

// src/use-cases/factories/email-verification/make-validation-code-use-case.ts
init_prisma2();

// src/use-cases/cases/email-verification/validation-code.ts
var ValidationCodeCodeUseCase = class {
  constructor(emailVerificationRepository) {
    this.emailVerificationRepository = emailVerificationRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      email,
      code
    }) {
      const verification = yield this.emailVerificationRepository.findByEmail(
        email
      );
      if (!verification || verification.code !== code) {
        throw new InvalidVerificationCodeError();
      }
      const { isVerified } = yield this.emailVerificationRepository.updateVerificationStatus(email);
      return {
        status: isVerified
      };
    });
  }
};

// src/use-cases/factories/email-verification/make-validation-code-use-case.ts
function makeValidationCodeCodeUseCase() {
  const emailVerificationRepository = new PrismaEmailVerificationRepository();
  const validationCodeCodeUseCase = new ValidationCodeCodeUseCase(
    emailVerificationRepository
  );
  return validationCodeCodeUseCase;
}

// src/http/controllers/email-varification/validation-code.ts
function validateVerificationCode(request, reply) {
  return __async(this, null, function* () {
    const bodySchema = import_zod28.z.object({ email: import_zod28.z.string().email(), code: import_zod28.z.string() });
    const { email, code } = bodySchema.parse(request.body);
    const validationCodeCodeUseCase = makeValidationCodeCodeUseCase();
    try {
      const { status } = yield validationCodeCodeUseCase.execute({
        email,
        code
      });
      return reply.status(200).send(status);
    } catch (error) {
      return reply.status(400).send({ message: error.message });
    }
  });
}

// src/http/controllers/email-varification/send-verification-code.ts
var import_zod29 = require("zod");
function sendVerificationCode(request, reply) {
  return __async(this, null, function* () {
    const bodySchema = import_zod29.z.object({ email: import_zod29.z.string().email() });
    const { email } = bodySchema.parse(request.body);
    const emailVerificationUseCase = makeSendVerificationCodeUseCase();
    try {
      const emailVerification = yield emailVerificationUseCase.execute({
        email
      });
      return reply.status(201).send(emailVerification);
    } catch (error) {
      if (error instanceof InvalidVerificationCodeError) {
        return reply.status(409).send({ message: error.message });
      }
      return reply.status(400).send({ message: error.message });
    }
  });
}

// src/http/controllers/email-varification/routes.ts
function emailVerificationRoutes(app2) {
  return __async(this, null, function* () {
    app2.post("/email-verification/send", sendVerificationCode);
    app2.post("/email-verification/validate", validateVerificationCode);
  });
}

// src/http/controllers/generate-url-player/signed-url.ts
var import_zod30 = require("zod");

// src/use-cases/factories/tokenPlayer/make-generate-signed-url-use-case.ts
init_prisma2();

// src/use-cases/cases/tokenPlayer/generate-signed-url.ts
init_env();
var import_jsonwebtoken3 = require("jsonwebtoken");
var GenerateSignedUrlUseCase = class {
  constructor(tokenRepository) {
    this.tokenRepository = tokenRepository;
  }
  execute(videoPlayerId) {
    return __async(this, null, function* () {
      const payload = {
        videoPlayerId,
        exp: Math.floor(Date.now() / 1e3) + 300
      };
      const secretKey2 = env.JWT_SECRET;
      const token = (0, import_jsonwebtoken3.sign)(payload, secretKey2);
      yield this.tokenRepository.createToken(token, videoPlayerId);
      const baseUrl = `https://seu-dominio.com/demo/player?videoPlayerId=${videoPlayerId}`;
      const signedUrl = `${baseUrl}&token=${token}`;
      return signedUrl;
    });
  }
};

// src/use-cases/factories/tokenPlayer/make-generate-signed-url-use-case.ts
function makeGenerateSignedUrlUseCase() {
  const tokenPlayerRepository = new PrismaTokenPlayerRepository();
  const generateSignedUrlUseCase = new GenerateSignedUrlUseCase(
    tokenPlayerRepository
  );
  return generateSignedUrlUseCase;
}

// src/http/controllers/generate-url-player/signed-url.ts
function generateSignedUrl(request, reply) {
  return __async(this, null, function* () {
    const generateSignedUrlBodySchema = import_zod30.z.object({
      videoPlayerId: import_zod30.z.string()
    });
    const { videoPlayerId } = generateSignedUrlBodySchema.parse(request.body);
    try {
      const generateSignedUrlUseCase = makeGenerateSignedUrlUseCase();
      const signedUrl = yield generateSignedUrlUseCase.execute(videoPlayerId);
      return reply.status(200).send({ signedUrl });
    } catch (err) {
      return reply.status(500).send({ message: err.message });
    }
  });
}

// src/http/controllers/generate-url-player/validate-signed-url.ts
var import_crypto = __toESM(require("crypto"));

// src/use-cases/factories/tokenPlayer/make-validate-signed-url-use-case.ts
init_prisma2();

// src/use-cases/cases/tokenPlayer/validate-signed-url.ts
init_env();
var import_jsonwebtoken4 = require("jsonwebtoken");
var ValidateSignedUrlUseCase = class {
  constructor(tokenRepository) {
    this.tokenRepository = tokenRepository;
  }
  execute(videoPlayerId, token) {
    return __async(this, null, function* () {
      const isValid = yield this.tokenRepository.isTokenValid(token);
      if (!isValid) {
        return false;
      }
      try {
        const secretKey2 = env.JWT_SECRET;
        const decoded = (0, import_jsonwebtoken4.verify)(token, secretKey2);
        return decoded.videoPlayerId === videoPlayerId && decoded.exp > Math.floor(Date.now() / 1e3);
      } catch (error) {
        if (error instanceof import_jsonwebtoken4.JsonWebTokenError) {
          return false;
        }
        throw error;
      }
    });
  }
};

// src/use-cases/factories/tokenPlayer/make-validate-signed-url-use-case.ts
function makeValidateSignedUrlUseCase() {
  const tokenPlayerRepository = new PrismaTokenPlayerRepository();
  const validateSignedUrlUseCase = new ValidateSignedUrlUseCase(
    tokenPlayerRepository
  );
  return validateSignedUrlUseCase;
}

// src/http/controllers/generate-url-player/validate-signed-url.ts
var algorithm = "aes-256-cbc";
var secretKey = "teste";
var iv = import_crypto.default.randomBytes(16);
function extractParamsFromUrl(url) {
  const urlObj = new URL(url);
  const videoPlayerId = urlObj.searchParams.get("videoPlayerId");
  const token = urlObj.searchParams.get("token");
  return { videoPlayerId, token };
}
function encrypt(text) {
  const cipher = import_crypto.default.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}
function decrypt(text) {
  const textParts = text.split(":");
  const iv2 = Buffer.from(textParts.shift(), "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = import_crypto.default.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    iv2
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
function validateSignedUrl(request, reply) {
  return __async(this, null, function* () {
    const { url } = request.body;
    if (!url) {
      return reply.status(400).send({ message: "URL is required" });
    }
    const decryptedUrl = decrypt(url);
    const { videoPlayerId, token } = extractParamsFromUrl(decryptedUrl);
    if (!videoPlayerId || !token) {
      return reply.status(400).send({ message: "Missing videoPlayerId or token" });
    }
    try {
      const validateSignedUrlUseCase = makeValidateSignedUrlUseCase();
      const isValid = yield validateSignedUrlUseCase.execute(videoPlayerId, token);
      if (isValid) {
        const encryptedVideoUrl = encrypt(decryptedUrl);
        return reply.status(200).send({ message: "Token valid", encryptedVideoUrl });
      } else {
        return reply.status(403).send({ message: "Invalid or expired token" });
      }
    } catch (err) {
      return reply.status(500).send({ message: err.message });
    }
  });
}

// src/http/controllers/generate-url-player/invalidate-url.ts
var import_zod31 = require("zod");

// src/use-cases/factories/tokenPlayer/make-invalidate-token-use-case.ts
init_prisma2();

// src/use-cases/cases/tokenPlayer/invalidate-token.ts
var InvalidateTokenUseCase = class {
  constructor(tokenRepository) {
    this.tokenRepository = tokenRepository;
  }
  execute(token) {
    return __async(this, null, function* () {
      yield this.tokenRepository.invalidateToken(token);
    });
  }
};

// src/use-cases/factories/tokenPlayer/make-invalidate-token-use-case.ts
function makeInvalidateTokenUseCase() {
  const tokenPlayerRepository = new PrismaTokenPlayerRepository();
  const invalidateTokenUseCase = new InvalidateTokenUseCase(
    tokenPlayerRepository
  );
  return invalidateTokenUseCase;
}

// src/http/controllers/generate-url-player/invalidate-url.ts
function invalidateToken(request, reply) {
  return __async(this, null, function* () {
    const invalidateTokenBodySchema = import_zod31.z.object({
      token: import_zod31.z.string()
    });
    const { token } = invalidateTokenBodySchema.parse(request.body);
    try {
      const invalidateTokenUseCase = makeInvalidateTokenUseCase();
      yield invalidateTokenUseCase.execute(token);
      return reply.status(200).send({ message: "Token invalidated successfully" });
    } catch (err) {
      return reply.status(500).send({ message: err.message });
    }
  });
}

// src/http/controllers/generate-url-player/routes.ts
function generateUrlPlayerRoutes(app2) {
  return __async(this, null, function* () {
    app2.post("/generate/url", generateSignedUrl);
    app2.post("/validate/url", validateSignedUrl);
    app2.post("/invalidate/url", invalidateToken);
  });
}

// src/app.ts
var app = (0, import_fastify.default)();
app.register(import_fastify_raw_body.default, {
  global: false,
  runFirst: true,
  field: "rawBody",
  encoding: "utf8"
});
app.register(import_jwt.default, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "7d"
  }
});
var corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://web.muveplayer.com",
      "http://localhost:8080",
      "https://seahorse-app-2xtkj.ondigitalocean.app"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.addContentTypeParser(
  "application/json",
  { parseAs: "string" },
  (req, body, done) => {
    try {
      const json = JSON.parse(body);
      done(null, json);
    } catch (err) {
      err.statusCode = 400;
      done(err, void 0);
    }
  }
);
app.register(import_cors.default, corsOptions);
app.register(usersRoutes, { prefix: "/api" });
app.register(leadsRoutes, { prefix: "/api" });
app.register(videosRoutes, { prefix: "/api" });
app.register(foldersRoutes, { prefix: "/api" });
app.register(analyticsRoutes, { prefix: "/api" });
app.register(signatureRoutes, { prefix: "/api" });
app.register(webhookKirvanoRoutes, { prefix: "/api" });
app.register(emailVerificationRoutes, { prefix: "/api" });
app.register(generateUrlPlayerRoutes, { prefix: "/api" });
app.register((instance) => __async(void 0, null, function* () {
  instance.addHook("preValidation", (request, reply, done) => {
    request.rawBody = request.rawBody || "";
    done();
  });
  instance.register(webhookStripeRoutes, { prefix: "/api" });
}));
app.get("/", (req, res) => {
  res.send("Muve Player On");
});
app.setErrorHandler((error, _, reply) => {
  if (error instanceof import_zod32.ZodError) {
    return reply.status(400).send({ message: "Validation error", issues: error.format() });
  }
  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
  }
  return reply.status(500).send({ message: "Internal server error." });
});

// src/serve.ts
app.listen({
  host: "0.0.0.0",
  port: env.PORT
}).then(() => {
  console.log(`\u{1F680} HTTP Server Running ${env.PORT} !`);
});
