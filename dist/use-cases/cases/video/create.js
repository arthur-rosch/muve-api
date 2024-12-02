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

// src/use-cases/cases/video/create.ts
var create_exports = {};
__export(create_exports, {
  CreateVideoUseCase: () => CreateVideoUseCase
});
module.exports = __toCommonJS(create_exports);

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

// src/use-cases/erros/not-found-error.ts
var NotFoundErros = class extends Error {
  constructor(text) {
    super(`${text} not found`);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateVideoUseCase
});
