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

// src/http/controllers/folder/routes.ts
var routes_exports = {};
__export(routes_exports, {
  foldersRoutes: () => foldersRoutes
});
module.exports = __toCommonJS(routes_exports);

// src/http/middlewares/verify-jwt.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
function verifyJwt(request, reply) {
  return __async(this, null, function* () {
    var _a;
    try {
      const token = (_a = request.headers.authorization) == null ? void 0 : _a.split(" ")[1];
      console.log(token);
      if (!token) {
        return reply.status(401).send({ message: "Unauthorized" });
      }
      const decoded = import_jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
      request.user = { sub: decoded.sub, role: decoded.role };
    } catch (err) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
  });
}

// src/http/middlewares/verify-signature.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var checkSignatureMiddleware = (request, reply) => __async(void 0, null, function* () {
  var _a;
  const userId = (_a = request.user) == null ? void 0 : _a.sub;
  if (!userId) {
    return reply.status(401).send({ message: "Usu\xE1rio n\xE3o autenticado." });
  }
  try {
    const signature = yield prisma.signature.findFirst({
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

// src/http/controllers/folder/create-folder.ts
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
var import_client2 = require("@prisma/client");
var prisma2 = new import_client2.PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : []
});

// src/repositories/prisma/prisma-user-repository.ts
var PrimasUsersRepository = class {
  findById(id) {
    return __async(this, null, function* () {
      const user = yield prisma2.user.findFirst({
        where: {
          id
        }
      });
      return user;
    });
  }
  findByCustomerId(id) {
    return __async(this, null, function* () {
      const user = yield prisma2.user.findFirst({
        where: {
          stripeCustomersId: id
        }
      });
      return user;
    });
  }
  findByEmail(email) {
    return __async(this, null, function* () {
      const user = yield prisma2.user.findUnique({
        where: {
          email
        }
      });
      return user;
    });
  }
  create(data) {
    return __async(this, null, function* () {
      const user = yield prisma2.user.create({
        data: __spreadProps(__spreadValues({}, data), {
          role: "MEMBER"
        })
      });
      return user;
    });
  }
  update(id, data) {
    return __async(this, null, function* () {
      const user = yield prisma2.user.update({
        where: {
          id
        },
        data: __spreadValues({}, data)
      });
      return user;
    });
  }
};

// src/repositories/prisma/prisma-folder-repository.ts
var PrismaFoldersRepository = class {
  findById(id) {
    return __async(this, null, function* () {
      const folder = yield prisma2.folder.findFirst({
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
      const folder = yield prisma2.folder.findFirst({
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
      const folders = yield prisma2.folder.findMany({
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
      const folder = yield prisma2.folder.update({
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
      const folder = yield prisma2.folder.create({
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
      const folder = yield prisma2.folder.delete({
        where: {
          id
        }
      });
      return folder;
    });
  }
};

// src/lib/stripe.ts
var import_stripe = __toESM(require("stripe"));
var stripe = new import_stripe.default(env.STRIPE_SECRET_KEY);

// src/lib/mixpanel.ts
var import_mixpanel = __toESM(require("mixpanel"));
var mixpanel = import_mixpanel.default.init("5fbda77db1c3a9a99cc4b9d70c4b9cee");

// src/repositories/prisma/prisma-email-verification-repository.ts
var import_client3 = require("@prisma/client");
var prisma3 = new import_client3.PrismaClient();

// src/use-cases/factories/folder/make-create-folder-use-case.ts
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
    const createFolderBodySchema = import_zod2.z.object({
      name: import_zod2.z.string(),
      coverUrl: import_zod2.z.string().optional(),
      videosId: import_zod2.z.array(import_zod2.z.string()).optional()
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
var import_zod3 = require("zod");

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
    const deleteFolderBodySchema = import_zod3.z.object({
      folderId: import_zod3.z.string()
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
var import_zod4 = require("zod");

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
    const getFolderByIdBodySchema = import_zod4.z.object({
      folderId: import_zod4.z.string()
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
var import_zod5 = require("zod");

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
    const addFavoriteFolderBodySchema = import_zod5.z.object({
      folderId: import_zod5.z.string(),
      value: import_zod5.z.boolean()
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
function foldersRoutes(app) {
  return __async(this, null, function* () {
    app.addHook("onRequest", verifyJwt);
    app.addHook("onRequest", checkSignatureMiddleware);
    app.post("/folder", createFolder);
    app.post("/folder/favorite", addFavoriteFolder);
    app.get("/folder/:folderId", getFolderById);
    app.delete("/folder/:folderId", deleteFolder);
    app.get("/folder/all", getManyFolderByUserId);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  foldersRoutes
});
