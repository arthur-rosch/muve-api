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

// src/services/get-url-youtube.ts
var get_url_youtube_exports = {};
__export(get_url_youtube_exports, {
  getUrlYoutube: () => getUrlYoutube
});
module.exports = __toCommonJS(get_url_youtube_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getUrlYoutube
});