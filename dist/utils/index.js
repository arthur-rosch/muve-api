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

// src/utils/index.ts
var utils_exports = {};
__export(utils_exports, {
  formatDate: () => formatDate,
  formatTimestamp: () => formatTimestamp,
  generateVerificationCode: () => generateVerificationCode,
  getVideoThumbnail: () => getVideoThumbnail,
  planMapping: () => planMapping,
  planMappingStripe: () => planMappingStripe,
  planNameMappingStripe: () => planNameMappingStripe
});
module.exports = __toCommonJS(utils_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatDate,
  formatTimestamp,
  generateVerificationCode,
  getVideoThumbnail,
  planMapping,
  planMappingStripe,
  planNameMappingStripe
});
