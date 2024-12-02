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

// src/use-cases/cases/video/get-video-by-id.ts
var get_video_by_id_exports = {};
__export(get_video_by_id_exports, {
  GetVideoByIdUseCase: () => GetVideoByIdUseCase
});
module.exports = __toCommonJS(get_video_by_id_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetVideoByIdUseCase
});
