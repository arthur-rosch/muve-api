var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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

// src/http/controllers/generate-url-player/validate-signed-url.ts
var validate_signed_url_exports = {};
__export(validate_signed_url_exports, {
  validateSignedUrl: () => validateSignedUrl
});
module.exports = __toCommonJS(validate_signed_url_exports);
var import_crypto = __toESM(require("crypto"));

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

// src/lib/stripe.ts
var import_stripe = __toESM(require("stripe"));
var stripe = new import_stripe.default(env.STRIPE_SECRET_KEY);

// src/lib/mixpanel.ts
var import_mixpanel = __toESM(require("mixpanel"));
var mixpanel = import_mixpanel.default.init("5fbda77db1c3a9a99cc4b9d70c4b9cee");

// src/repositories/prisma/prisma-token-player-repository.ts
var PrismaTokenPlayerRepository = class {
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

// src/repositories/prisma/prisma-email-verification-repository.ts
var import_client2 = require("@prisma/client");
var prisma2 = new import_client2.PrismaClient();

// src/use-cases/cases/tokenPlayer/validate-signed-url.ts
var import_jsonwebtoken = require("jsonwebtoken");
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
        const decoded = (0, import_jsonwebtoken.verify)(token, secretKey2);
        return decoded.videoPlayerId === videoPlayerId && decoded.exp > Math.floor(Date.now() / 1e3);
      } catch (error) {
        if (error instanceof import_jsonwebtoken.JsonWebTokenError) {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  validateSignedUrl
});
