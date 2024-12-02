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

// src/use-cases/cases/video/edit-folderId-video.ts
var edit_folderId_video_exports = {};
__export(edit_folderId_video_exports, {
  EditFolderIdVideoUseCase: () => EditFolderIdVideoUseCase
});
module.exports = __toCommonJS(edit_folderId_video_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditFolderIdVideoUseCase
});
