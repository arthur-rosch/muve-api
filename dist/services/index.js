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

// src/services/index.ts
var services_exports = {};
__export(services_exports, {
  createStripeCheckout: () => createStripeCheckout,
  getUrlYoutube: () => getUrlYoutube,
  sendEmail: () => sendEmail
});
module.exports = __toCommonJS(services_exports);

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

// src/services/send-email.ts
var import_nodemailer = __toESM(require("nodemailer"));
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

// src/services/get-url-youtube.ts
var ytdl = require("@distube/ytdl-core");
function getUrlYoutube(url) {
  return __async(this, null, function* () {
    try {
      const cookiesYt = [
        {
          domain: ".youtube.com",
          expirationDate: 1752683746542673e-6,
          hostOnly: false,
          httpOnly: true,
          name: "LOGIN_INFO",
          path: "/",
          sameSite: "no_restriction",
          secure: true,
          session: false,
          storeId: "0",
          value: "AFmmF2swRAIgMqEbXg9BIBrpKPZCTVUanvbwCYB1irQhUFhwhww8BSYCIAEMjikH8JsxxOPy4ObLly_MLnalnrrcfsNbwov_ahks:QUQ3MjNmeHZqWllUdGhyREcyLVV6dkphTUdtME5pNmFsVWU5UnNzUlBvb2tLdi1qSEY3NWVnVmEtR2c5RlF4TFJaczBPOGh1MXh1OGtHX3NsU2J4ODdDX0ZaSXlJZGdXOTFiN0haVTk2NUdhM2I4ZWlaSjZaeE5yeF94OGVJSEt3X3VoeG8yV3k5eXRLOVpwZlUwNmZVTGlNWE5hTEwtNXZn"
        },
        {
          domain: ".youtube.com",
          expirationDate: 1757992081411502e-6,
          hostOnly: false,
          httpOnly: false,
          name: "SID",
          path: "/",
          sameSite: "unspecified",
          secure: false,
          session: false,
          storeId: "0",
          value: "g.a000mwjPim5i3heofBD-A3shLHRLZC7VR0_WJpnm3gCsuQ1uKosZFqcQwBy8DuxaSdu3fTRc0gACgYKARYSARISFQHGX2MiraKkQbZXh0jZ7R427kJRtxoVAUF8yKpdsdoZfFBqT0iqFtp10wy50076"
        },
        {
          domain: ".youtube.com",
          expirationDate: 1757992081411509e-6,
          hostOnly: false,
          httpOnly: true,
          name: "__Secure-1PSID",
          path: "/",
          sameSite: "unspecified",
          secure: true,
          session: false,
          storeId: "0",
          value: "g.a000mwjPim5i3heofBD-A3shLHRLZC7VR0_WJpnm3gCsuQ1uKosZlSKuviedXzRNV9sCEirGZAACgYKAaMSARISFQHGX2MiXgncQLgMQGQ4H2QXb3ciuRoVAUF8yKrHFnbCIcaRYSrxZcfswtvw0076"
        },
        {
          domain: ".youtube.com",
          expirationDate: 1757992081411517e-6,
          hostOnly: false,
          httpOnly: true,
          name: "__Secure-3PSID",
          path: "/",
          sameSite: "no_restriction",
          secure: true,
          session: false,
          storeId: "0",
          value: "g.a000mwjPim5i3heofBD-A3shLHRLZC7VR0_WJpnm3gCsuQ1uKosZc65qVZ6SRfA4dMooW8FA7wACgYKASoSARISFQHGX2MiBuH4WlI-8pIYDK6RYpMu-xoVAUF8yKr5J3_py_6CuHGKdsiY56Wm0076"
        },
        {
          domain: ".youtube.com",
          expirationDate: 1757992081411524e-6,
          hostOnly: false,
          httpOnly: true,
          name: "HSID",
          path: "/",
          sameSite: "unspecified",
          secure: false,
          session: false,
          storeId: "0",
          value: "ARkDU-GwDBrpJVVDb"
        },
        {
          domain: ".youtube.com",
          expirationDate: 1757992081411527e-6,
          hostOnly: false,
          httpOnly: true,
          name: "SSID",
          path: "/",
          sameSite: "unspecified",
          secure: true,
          session: false,
          storeId: "0",
          value: "Ax7qtmagrbnfgA_3k"
        },
        {
          domain: ".youtube.com",
          expirationDate: 1757992081411531e-6,
          hostOnly: false,
          httpOnly: false,
          name: "APISID",
          path: "/",
          sameSite: "unspecified",
          secure: false,
          session: false,
          storeId: "0",
          value: "5HtBjDQBnnQamNv5/A5dsF3S6E2wC6gcvb"
        },
        {
          domain: ".youtube.com",
          expirationDate: 1757992081411535e-6,
          hostOnly: false,
          httpOnly: false,
          name: "SAPISID",
          path: "/",
          sameSite: "unspecified",
          secure: true,
          session: false,
          storeId: "0",
          value: "kV1q_T0odp0FGy_l/An3cIOCP7IiHF-J4V"
        },
        {
          domain: ".youtube.com",
          expirationDate: 1757992081411539e-6,
          hostOnly: false,
          httpOnly: false,
          name: "__Secure-1PAPISID",
          path: "/",
          sameSite: "unspecified",
          secure: true,
          session: false,
          storeId: "0",
          value: "kV1q_T0odp0FGy_l/An3cIOCP7IiHF-J4V"
        },
        {
          domain: ".youtube.com",
          expirationDate: 1757992081411547e-6,
          hostOnly: false,
          httpOnly: false,
          name: "__Secure-3PAPISID",
          path: "/",
          sameSite: "no_restriction",
          secure: true,
          session: false,
          storeId: "0",
          value: "kV1q_T0odp0FGy_l/An3cIOCP7IiHF-J4V"
        },
        {
          domain: ".youtube.com",
          hostOnly: false,
          httpOnly: false,
          name: "wide",
          path: "/",
          sameSite: "unspecified",
          secure: false,
          session: true,
          storeId: "0",
          value: "1"
        },
        {
          domain: ".youtube.com",
          expirationDate: 1759882071370564e-6,
          hostOnly: false,
          httpOnly: false,
          name: "PREF",
          path: "/",
          sameSite: "unspecified",
          secure: true,
          session: false,
          storeId: "0",
          value: "f7=4100&f6=40000000&tz=America.Sao_Paulo"
        },
        {
          domain: ".youtube.com",
          expirationDate: 1756859325641039e-6,
          hostOnly: false,
          httpOnly: true,
          name: "__Secure-1PSIDTS",
          path: "/",
          sameSite: "unspecified",
          secure: true,
          session: false,
          storeId: "0",
          value: "sidts-CjEBUFGoh9gG9rVT0LF9_VxwFWscGVDWNyDnIOXcXDungrPlG9aqUed6J3FCCNLLhJhkEAA"
        },
        {
          domain: ".youtube.com",
          expirationDate: 175685932564118e-5,
          hostOnly: false,
          httpOnly: true,
          name: "__Secure-3PSIDTS",
          path: "/",
          sameSite: "no_restriction",
          secure: true,
          session: false,
          storeId: "0",
          value: "sidts-CjEBUFGoh9gG9rVT0LF9_VxwFWscGVDWNyDnIOXcXDungrPlG9aqUed6J3FCCNLLhJhkEAA"
        },
        {
          domain: ".youtube.com",
          expirationDate: 1756859858393422e-6,
          hostOnly: false,
          httpOnly: false,
          name: "SIDCC",
          path: "/",
          sameSite: "unspecified",
          secure: false,
          session: false,
          storeId: "0",
          value: "AKEyXzXucpkJhof2Z6xXH67FXBqQeDLlnPnmoeTr_TCcWGMi04IGGuQ4lEfK5v33KgOZCPocSw"
        },
        {
          domain: ".youtube.com",
          expirationDate: 1756859858393598e-6,
          hostOnly: false,
          httpOnly: true,
          name: "__Secure-1PSIDCC",
          path: "/",
          sameSite: "unspecified",
          secure: true,
          session: false,
          storeId: "0",
          value: "AKEyXzXzb0bOrVniJKcR9PBTeDZJcaWq77MewD5s9RNZHdwZG0nwGjddvEY-Wkw9TDZBVvxMiRo"
        },
        {
          domain: ".youtube.com",
          expirationDate: 1756859858393656e-6,
          hostOnly: false,
          httpOnly: true,
          name: "__Secure-3PSIDCC",
          path: "/",
          sameSite: "no_restriction",
          secure: true,
          session: false,
          storeId: "0",
          value: "AKEyXzXxwrUDVZP3mr_IVjUSCTTDEPW7HMaAhNGH1KlIDP97tpb8_7JBt2tJU-UrcLcKimJzAw"
        }
      ];
      const agent = ytdl.createAgent(cookiesYt);
      const info = yield yield ytdl.getInfo(url, { agent });
      const videoFormat = info.formats.find(
        (format) => format.qualityLabel === "1080p"
      );
      console.log(videoFormat);
      if (!videoFormat) {
        throw new Error("No suitable MP4 format found");
      }
      return videoFormat.url;
    } catch (error) {
      console.error("Error fetching video URL:", error);
      throw new Error(`Failed to obtain video URL for ${url}`);
    }
  });
}

// src/lib/stripe.ts
var import_stripe = __toESM(require("stripe"));
var stripe = new import_stripe.default(env.STRIPE_SECRET_KEY);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : []
});

// src/lib/mixpanel.ts
var import_mixpanel = __toESM(require("mixpanel"));
var mixpanel = import_mixpanel.default.init("5fbda77db1c3a9a99cc4b9d70c4b9cee");

// src/services/stripe/checkout-sessions.ts
var createStripeCheckout = (_0) => __async(void 0, [_0], function* ({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createStripeCheckout,
  getUrlYoutube,
  sendEmail
});
