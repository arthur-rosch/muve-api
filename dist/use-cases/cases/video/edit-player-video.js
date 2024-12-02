var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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

// src/use-cases/cases/video/edit-player-video.ts
var edit_player_video_exports = {};
__export(edit_player_video_exports, {
  EditPlayerVideo: () => EditPlayerVideo
});
module.exports = __toCommonJS(edit_player_video_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditPlayerVideo
});
