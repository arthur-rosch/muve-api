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

// src/use-cases/cases/videoAnalytics/add-view-unique.ts
var add_view_unique_exports = {};
__export(add_view_unique_exports, {
  AddViewUniquesUseCase: () => AddViewUniquesUseCase
});
module.exports = __toCommonJS(add_view_unique_exports);

// src/use-cases/erros/not-found-error.ts
var NotFoundErros = class extends Error {
  constructor(text) {
    super(`${text} not found`);
  }
};

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddViewUniquesUseCase
});
