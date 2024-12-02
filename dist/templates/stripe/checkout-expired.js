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

// src/templates/stripe/checkout-expired.ts
var checkout_expired_exports = {};
__export(checkout_expired_exports, {
  CheckoutExpired: () => CheckoutExpired
});
module.exports = __toCommonJS(checkout_expired_exports);

// src/templates/images/images.ts
var muveAzul64 = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8IS0tIENyZWF0b3I6IENvcmVsRFJBVyAtLT4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNjM0cHgiIGhlaWdodD0iMTQ0cHgiIHZlcnNpb249IjEuMSIgc3R5bGU9InNoYXBlLXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247IHRleHQtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjsgaW1hZ2UtcmVuZGVyaW5nOm9wdGltaXplUXVhbGl0eTsgZmlsbC1ydWxlOmV2ZW5vZGQ7IGNsaXAtcnVsZTpldmVub2RkIg0Kdmlld0JveD0iMCAwIDI0NC41IDU1LjQzIg0KIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIg0KIHhtbG5zOnhvZG09Imh0dHA6Ly93d3cuY29yZWwuY29tL2NvcmVsZHJhdy9vZG0vMjAwMyI+DQogPGRlZnM+DQogIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQogICA8IVtDREFUQVsNCiAgICAuZmlsMSB7ZmlsbDojMTU1RUM0fQ0KICAgIC5maWwwIHtmaWxsOiMxNTVFQzQ7ZmlsbC1ydWxlOm5vbnplcm99DQogICBdXT4NCiAgPC9zdHlsZT4NCiA8L2RlZnM+DQogPGcgaWQ9IkNhbWFkYV94MDAyMF8xIj4NCiAgPG1ldGFkYXRhIGlkPSJDb3JlbENvcnBJRF8wQ29yZWwtTGF5ZXIiLz4NCiAgPGcgaWQ9Il8yNzE0NTM3MTM4MDY0Ij4NCiAgIDxnPg0KICAgIDxwYXRoIGNsYXNzPSJmaWwwIiBkPSJNMTI1Ljg4IDE0LjA0Yy0yLjM4LDAgLTQuNDgsMC40IC02LjMsMS4xOCAtMS44MSwwLjc5IC0zLjM1LDEuODMgLTQuNjEsMy4xMyAtMS4wMywtMS42NiAtMi4yOCwtMi43OSAtMy43NiwtMy40IC0xLjQ4LC0wLjYgLTIuOTYsLTAuOTEgLTQuNDQsLTAuOTEgLTIuOTIsMCAtNS44OCwwLjk5IC04Ljg5LDIuOTdsMCAtMi40MyAtOC43NCAwIDAgMzMuNjUgOS4wOCAwIDAgLTI0LjM2YzAuOSwtMC43NiAxLjgzLC0xLjM1IDIuNzksLTEuNzUgMC45NywtMC40IDIuMSwtMC42MSAzLjQsLTAuNjEgMS43MSwwIDIuOTUsMC41MSAzLjc0LDEuNTIgMC43OCwxLjAxIDEuMTcsMi41NyAxLjE3LDQuNjdsMCAyMC41MyA5LjA5IDAgMCAtMjAuMzJjMCwtMS44NCAwLjU2LC0zLjM2IDEuNjgsLTQuNTUgMS4xMiwtMS4xOSAyLjY3LC0xLjc4IDQuNjQsLTEuNzggMS43MSwwIDIuOTMsMC41MSAzLjY3LDEuNTEgMC43NCwxLjAxIDEuMTEsMi41NSAxLjExLDQuNjFsMCAyMC41MyA5LjA4IDAgMCAtMjAuOTNjMCwtMi42OSAtMC4zOSwtNC44OSAtMS4xOCwtNi41OSAtMC43OCwtMS43MSAtMS43OCwtMy4wNSAtMi45OSwtNC4wNCAtMS4yMSwtMC45OSAtMi41NywtMS42NyAtNC4wNywtMi4wNSAtMS41LC0wLjM4IC0yLjk5LC0wLjU4IC00LjQ3LC0wLjU4eiIvPg0KICAgIDxwYXRoIGNsYXNzPSJmaWwwIiBkPSJNMTU2LjggNDguNzZjNC43NiwwIDguNDYsLTEuMTggMTEuMTEsLTMuNTYgMi42NCwtMi4zOCAzLjk3LC01Ljg2IDMuOTcsLTEwLjQzbDAgLTIwLjE5IC05LjA5IDAgMCAyMC4xOWMwLDIuMzMgLTAuNTIsNC4wMSAtMS41OCw1LjA0IC0xLjA1LDEuMDQgLTIuNTIsMS41NSAtNC40MSwxLjU1IC0xLjg4LDAgLTMuMzUsLTAuNTEgLTQuNCwtMS41NSAtMS4wNiwtMS4wMyAtMS41OCwtMi43MSAtMS41OCwtNS4wNGwwIC0yMC4xOSAtOS4wOSAwIDAgMjAuMTljMCw0LjU3IDEuMzMsOC4wNSAzLjk3LDEwLjQzIDIuNjUsMi4zOCA2LjM1LDMuNTYgMTEuMSwzLjU2eiIvPg0KICAgIDxwb2x5Z29uIGNsYXNzPSJmaWwwIiBwb2ludHM9IjE3NS4wMiwxNC41OCAxODUuNDQsNDguMjMgMTk5LjkxLDQ4LjIzIDIxMC4zNCwxNC41OCAyMDAuODUsMTQuNTggMTkzLjc5LDQwLjQyIDE5MS45LDQwLjQyIDE4NC41LDE0LjU4ICIvPg0KICAgIDxwYXRoIGNsYXNzPSJmaWwwIiBkPSJNMjEzLjQ4IDMxYzAsNS41NiAxLjQ1LDkuOTEgNC4zNCwxMy4wNSAyLjg5LDMuMTQgNi45Miw0LjcxIDEyLjA4LDQuNzEgMy43MiwwIDYuNzgsLTAuNzEgOS4xOCwtMi4xNSAyLjQsLTEuNDMgNC4xMiwtMy41IDUuMTUsLTYuMTlsLTcuMjcgLTIuOTZjLTAuNDksMS4xNyAtMS4yMywyLjEyIC0yLjIyLDIuODYgLTAuOTgsMC43NCAtMi40OSwxLjExIC00LjUxLDEuMTEgLTAuOCwwIC0xLjYxLC0wLjExIC0yLjQyLC0wLjM0IC0wLjgxLC0wLjIyIC0xLjU3LC0wLjYyIC0yLjI5LC0xLjIxIC0wLjcxLC0wLjU4IC0xLjMyLC0xLjM4IC0xLjgxLC0yLjM5IC0wLjUsLTEuMDEgLTAuODUsLTIuMyAtMS4wOCwtMy44N2wyMS44NyAwIDAgLTMuNzZjMCwtMi4yNSAtMC4zNCwtNC4zMiAtMS4wMSwtNi4yMyAtMC42NywtMS45IC0xLjY1LC0zLjU3IC0yLjkzLC01LjAxIC0xLjI4LC0xLjQzIC0yLjgzLC0yLjU2IC00LjY3LC0zLjM2IC0xLjg0LC0wLjgxIC0zLjkzLC0xLjIyIC02LjI2LC0xLjIyIC0yLjYsMCAtNC45MSwwLjQ0IC02LjkzLDEuMzIgLTIuMDIsMC44NyAtMy43MSwyLjA3IC01LjA4LDMuNiAtMS4zNywxLjUyIC0yLjQsMy4zMiAtMy4xLDUuMzggLTAuNjksMi4wNiAtMS4wNCw0LjI4IC0xLjA0LDYuNjZ6bTE2LjQyIC05Ljc2YzEuOTMsMCAzLjQ2LDAuNjEgNC42MSwxLjgyIDEuMTQsMS4yMSAxLjc2LDIuNzYgMS44NSw0LjY0bC0xMy41OSAwYzAuMzUsLTIuMDEgMS4xMywtMy42IDIuMzIsLTQuNzQgMS4xOSwtMS4xNCAyLjc5LC0xLjcyIDQuODEsLTEuNzJ6Ii8+DQogICA8L2c+DQogICA8Zz4NCiAgICA8cGF0aCBjbGFzcz0iZmlsMSIgZD0iTTMzLjA5IDAuMTZsMTIuMzQgMTIuMzUgMy4zNiAwIDkuNTcgLTkuNTdjMC4yMiwtMC4yMiAwLjU4LC0wLjIyIDAuNzksMGwxOS4zMyAxOS4zMmMwLjIyLDAuMjIgMC4yMiwwLjU4IDAsMC44bC0xMC4xMiAxMC4xMWMtMC4yMSwwLjIyIC0wLjU3LDAuMjIgLTAuNzksMGwtMTguOSAtMTguODkgLTMuMDkgMCAtMTMuODYgMTMuODZjLTAuMjIsMC4yMiAtMC41OCwwLjIyIC0wLjgsMGwtMTIuOSAtMTIuOWMtMC4yMiwtMC4yMiAtMC4yMiwtMC41OCAwLC0wLjhsMTQuMjcgLTE0LjI4YzAuMjIsLTAuMjIgMC41OCwtMC4yMiAwLjgsMHoiLz4NCiAgICA8cGF0aCBjbGFzcz0iZmlsMSIgZD0iTTExLjMxIDIxLjk1bDE4LjgyIDE4LjgyIDMuNTEgMCAxMy40OSAtMTMuNWMwLjIyLC0wLjIyIDAuNTgsLTAuMjIgMC44LDBsMTIuOTkgMTIuOTljMC4yMiwwLjIyIDAuMjIsMC41OCAwLDAuOGwtMTQuMjEgMTQuMjFjLTAuMjIsMC4yMiAtMC41OCwwLjIyIC0wLjgsMGwtMTIuNzQgLTEyLjc0IC0yLjkzIDAgLTkuOTIgOS45MmMtMC4yMiwwLjIyIC0wLjU4LDAuMjIgLTAuOCwwbC0xOS4zNiAtMTkuMzZjLTAuMjIsLTAuMjIgLTAuMjIsLTAuNTggMCwtMC44bDEwLjM1IC0xMC4zNGMwLjIyLC0wLjIyIDAuNTgsLTAuMjIgMC44LDB6Ii8+DQogICA8L2c+DQogIDwvZz4NCiA8L2c+DQo8L3N2Zz4NCg==";
var logoMuve64 = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8IS0tIENyZWF0b3I6IENvcmVsRFJBVyAtLT4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNjM0cHgiIGhlaWdodD0iMTQ0cHgiIHZlcnNpb249IjEuMSIgc3R5bGU9InNoYXBlLXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247IHRleHQtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjsgaW1hZ2UtcmVuZGVyaW5nOm9wdGltaXplUXVhbGl0eTsgZmlsbC1ydWxlOmV2ZW5vZGQ7IGNsaXAtcnVsZTpldmVub2RkIg0Kdmlld0JveD0iMCAwIDI0NC41IDU1LjQzIg0KIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIg0KIHhtbG5zOnhvZG09Imh0dHA6Ly93d3cuY29yZWwuY29tL2NvcmVsZHJhdy9vZG0vMjAwMyI+DQogPGRlZnM+DQogIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQogICA8IVtDREFUQVsNCiAgICAuZmlsMSB7ZmlsbDojMTU1RUM0fQ0KICAgIC5maWwwIHtmaWxsOiMxNTVFQzQ7ZmlsbC1ydWxlOm5vbnplcm99DQogICBdXT4NCiAgPC9zdHlsZT4NCiA8L2RlZnM+DQogPGcgaWQ9IkNhbWFkYV94MDAyMF8xIj4NCiAgPG1ldGFkYXRhIGlkPSJDb3JlbENvcnBJRF8wQ29yZWwtTGF5ZXIiLz4NCiAgPGcgaWQ9Il8yNzE0NTM3MTM4MDY0Ij4NCiAgIDxnPg0KICAgIDxwYXRoIGNsYXNzPSJmaWwwIiBkPSJNMTI1Ljg4IDE0LjA0Yy0yLjM4LDAgLTQuNDgsMC40IC02LjMsMS4xOCAtMS44MSwwLjc5IC0zLjM1LDEuODMgLTQuNjEsMy4xMyAtMS4wMywtMS42NiAtMi4yOCwtMi43OSAtMy43NiwtMy40IC0xLjQ4LC0wLjYgLTIuOTYsLTAuOTEgLTQuNDQsLTAuOTEgLTIuOTIsMCAtNS44OCwwLjk5IC04Ljg5LDIuOTdsMCAtMi40MyAtOC43NCAwIDAgMzMuNjUgOS4wOCAwIDAgLTI0LjM2YzAuOSwtMC43NiAxLjgzLC0xLjM1IDIuNzksLTEuNzUgMC45NywtMC40IDIuMSwtMC42MSAzLjQsLTAuNjEgMS43MSwwIDIuOTUsMC41MSAzLjc0LDEuNTIgMC43OCwxLjAxIDEuMTcsMi41NyAxLjE3LDQuNjdsMCAyMC41MyA5LjA5IDAgMCAtMjAuMzJjMCwtMS44NCAwLjU2LC0zLjM2IDEuNjgsLTQuNTUgMS4xMiwtMS4xOSAyLjY3LC0xLjc4IDQuNjQsLTEuNzggMS43MSwwIDIuOTMsMC41MSAzLjY3LDEuNTEgMC43NCwxLjAxIDEuMTEsMi41NSAxLjExLDQuNjFsMCAyMC41MyA5LjA4IDAgMCAtMjAuOTNjMCwtMi42OSAtMC4zOSwtNC44OSAtMS4xOCwtNi41OSAtMC43OCwtMS43MSAtMS43OCwtMy4wNSAtMi45OSwtNC4wNCAtMS4yMSwtMC45OSAtMi41NywtMS42NyAtNC4wNywtMi4wNSAtMS41LC0wLjM4IC0yLjk5LC0wLjU4IC00LjQ3LC0wLjU4eiIvPg0KICAgIDxwYXRoIGNsYXNzPSJmaWwwIiBkPSJNMTU2LjggNDguNzZjNC43NiwwIDguNDYsLTEuMTggMTEuMTEsLTMuNTYgMi42NCwtMi4zOCAzLjk3LC01Ljg2IDMuOTcsLTEwLjQzbDAgLTIwLjE5IC05LjA5IDAgMCAyMC4xOWMwLDIuMzMgLTAuNTIsNC4wMSAtMS41OCw1LjA0IC0xLjA1LDEuMDQgLTIuNTIsMS41NSAtNC40MSwxLjU1IC0xLjg4LDAgLTMuMzUsLTAuNTEgLTQuNCwtMS41NSAtMS4wNiwtMS4wMyAtMS41OCwtMi43MSAtMS41OCwtNS4wNGwwIC0yMC4xOSAtOS4wOSAwIDAgMjAuMTljMCw0LjU3IDEuMzMsOC4wNSAzLjk3LDEwLjQzIDIuNjUsMi4zOCA2LjM1LDMuNTYgMTEuMSwzLjU2eiIvPg0KICAgIDxwb2x5Z29uIGNsYXNzPSJmaWwwIiBwb2ludHM9IjE3NS4wMiwxNC41OCAxODUuNDQsNDguMjMgMTk5LjkxLDQ4LjIzIDIxMC4zNCwxNC41OCAyMDAuODUsMTQuNTggMTkzLjc5LDQwLjQyIDE5MS45LDQwLjQyIDE4NC41LDE0LjU4ICIvPg0KICAgIDxwYXRoIGNsYXNzPSJmaWwwIiBkPSJNMjEzLjQ4IDMxYzAsNS41NiAxLjQ1LDkuOTEgNC4zNCwxMy4wNSAyLjg5LDMuMTQgNi45Miw0LjcxIDEyLjA4LDQuNzEgMy43MiwwIDYuNzgsLTAuNzEgOS4xOCwtMi4xNSAyLjQsLTEuNDMgNC4xMiwtMy41IDUuMTUsLTYuMTlsLTcuMjcgLTIuOTZjLTAuNDksMS4xNyAtMS4yMywyLjEyIC0yLjIyLDIuODYgLTAuOTgsMC43NCAtMi40OSwxLjExIC00LjUxLDEuMTEgLTAuOCwwIC0xLjYxLC0wLjExIC0yLjQyLC0wLjM0IC0wLjgxLC0wLjIyIC0xLjU3LC0wLjYyIC0yLjI5LC0xLjIxIC0wLjcxLC0wLjU4IC0xLjMyLC0xLjM4IC0xLjgxLC0yLjM5IC0wLjUsLTEuMDEgLTAuODUsLTIuMyAtMS4wOCwtMy44N2wyMS44NyAwIDAgLTMuNzZjMCwtMi4yNSAtMC4zNCwtNC4zMiAtMS4wMSwtNi4yMyAtMC42NywtMS45IC0xLjY1LC0zLjU3IC0yLjkzLC01LjAxIC0xLjI4LC0xLjQzIC0yLjgzLC0yLjU2IC00LjY3LC0zLjM2IC0xLjg0LC0wLjgxIC0zLjkzLC0xLjIyIC02LjI2LC0xLjIyIC0yLjYsMCAtNC45MSwwLjQ0IC02LjkzLDEuMzIgLTIuMDIsMC44NyAtMy43MSwyLjA3IC01LjA4LDMuNiAtMS4zNywxLjUyIC0yLjQsMy4zMiAtMy4xLDUuMzggLTAuNjksMi4wNiAtMS4wNCw0LjI4IC0xLjA0LDYuNjZ6bTE2LjQyIC05Ljc2YzEuOTMsMCAzLjQ2LDAuNjEgNC42MSwxLjgyIDEuMTQsMS4yMSAxLjc2LDIuNzYgMS44NSw0LjY0bC0xMy41OSAwYzAuMzUsLTIuMDEgMS4xMywtMy42IDIuMzIsLTQuNzQgMS4xOSwtMS4xNCAyLjc5LC0xLjcyIDQuODEsLTEuNzJ6Ii8+DQogICA8L2c+DQogICA8Zz4NCiAgICA8cGF0aCBjbGFzcz0iZmlsMSIgZD0iTTMzLjA5IDAuMTZsMTIuMzQgMTIuMzUgMy4zNiAwIDkuNTcgLTkuNTdjMC4yMiwtMC4yMiAwLjU4LC0wLjIyIDAuNzksMGwxOS4zMyAxOS4zMmMwLjIyLDAuMjIgMC4yMiwwLjU4IDAsMC44bC0xMC4xMiAxMC4xMWMtMC4yMSwwLjIyIC0wLjU3LDAuMjIgLTAuNzksMGwtMTguOSAtMTguODkgLTMuMDkgMCAtMTMuODYgMTMuODZjLTAuMjIsMC4yMiAtMC41OCwwLjIyIC0wLjgsMGwtMTIuOSAtMTIuOWMtMC4yMiwtMC4yMiAtMC4yMiwtMC41OCAwLC0wLjhsMTQuMjcgLTE0LjI4YzAuMjIsLTAuMjIgMC41OCwtMC4yMiAwLjgsMHoiLz4NCiAgICA8cGF0aCBjbGFzcz0iZmlsMSIgZD0iTTExLjMxIDIxLjk1bDE4LjgyIDE4LjgyIDMuNTEgMCAxMy40OSAtMTMuNWMwLjIyLC0wLjIyIDAuNTgsLTAuMjIgMC44LDBsMTIuOTkgMTIuOTljMC4yMiwwLjIyIDAuMjIsMC41OCAwLDAuOGwtMTQuMjEgMTQuMjFjLTAuMjIsMC4yMiAtMC41OCwwLjIyIC0wLjgsMGwtMTIuNzQgLTEyLjc0IC0yLjkzIDAgLTkuOTIgOS45MmMtMC4yMiwwLjIyIC0wLjU4LDAuMjIgLTAuOCwwbC0xOS4zNiAtMTkuMzZjLTAuMjIsLTAuMjIgLTAuMjIsLTAuNTggMCwtMC44bDEwLjM1IC0xMC4zNGMwLjIyLC0wLjIyIDAuNTgsLTAuMjIgMC44LDB6Ii8+DQogICA8L2c+DQogIDwvZz4NCiA8L2c+DQo8L3N2Zz4NCg==";
var FbIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8IS0tIENyZWF0b3I6IENvcmVsRFJBVyAtLT4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNjM0cHgiIGhlaWdodD0iMTQ0cHgiIHZlcnNpb249IjEuMSIgc3R5bGU9InNoYXBlLXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247IHRleHQtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjsgaW1hZ2UtcmVuZGVyaW5nOm9wdGltaXplUXVhbGl0eTsgZmlsbC1ydWxlOmV2ZW5vZGQ7IGNsaXAtcnVsZTpldmVub2RkIg0Kdmlld0JveD0iMCAwIDI0NC41IDU1LjQzIg0KIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIg0KIHhtbG5zOnhvZG09Imh0dHA6Ly93d3cuY29yZWwuY29tL2NvcmVsZHJhdy9vZG0vMjAwMyI+DQogPGRlZnM+DQogIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQogICA8IVtDREFUQVsNCiAgICAuZmlsMSB7ZmlsbDojMTU1RUM0fQ0KICAgIC5maWwwIHtmaWxsOiMxNTVFQzQ7ZmlsbC1ydWxlOm5vbnplcm99DQogICBdXT4NCiAgPC9zdHlsZT4NCiA8L2RlZnM+DQogPGcgaWQ9IkNhbWFkYV94MDAyMF8xIj4NCiAgPG1ldGFkYXRhIGlkPSJDb3JlbENvcnBJRF8wQ29yZWwtTGF5ZXIiLz4NCiAgPGcgaWQ9Il8yNzE0NTM3MTM4MDY0Ij4NCiAgIDxnPg0KICAgIDxwYXRoIGNsYXNzPSJmaWwwIiBkPSJNMTI1Ljg4IDE0LjA0Yy0yLjM4LDAgLTQuNDgsMC40IC02LjMsMS4xOCAtMS44MSwwLjc5IC0zLjM1LDEuODMgLTQuNjEsMy4xMyAtMS4wMywtMS42NiAtMi4yOCwtMi43OSAtMy43NiwtMy40IC0xLjQ4LC0wLjYgLTIuOTYsLTAuOTEgLTQuNDQsLTAuOTEgLTIuOTIsMCAtNS44OCwwLjk5IC04Ljg5LDIuOTdsMCAtMi40MyAtOC43NCAwIDAgMzMuNjUgOS4wOCAwIDAgLTI0LjM2YzAuOSwtMC43NiAxLjgzLC0xLjM1IDIuNzksLTEuNzUgMC45NywtMC40IDIuMSwtMC42MSAzLjQsLTAuNjEgMS43MSwwIDIuOTUsMC41MSAzLjc0LDEuNTIgMC43OCwxLjAxIDEuMTcsMi41NyAxLjE3LDQuNjdsMCAyMC41MyA5LjA5IDAgMCAtMjAuMzJjMCwtMS44NCAwLjU2LC0zLjM2IDEuNjgsLTQuNTUgMS4xMiwtMS4xOSAyLjY3LC0xLjc4IDQuNjQsLTEuNzggMS43MSwwIDIuOTMsMC41MSAzLjY3LDEuNTEgMC43NCwxLjAxIDEuMTEsMi41NSAxLjExLDQuNjFsMCAyMC41MyA5LjA4IDAgMCAtMjAuOTNjMCwtMi42OSAtMC4zOSwtNC44OSAtMS4xOCwtNi41OSAtMC43OCwtMS43MSAtMS43OCwtMy4wNSAtMi45OSwtNC4wNCAtMS4yMSwtMC45OSAtMi41NywtMS42NyAtNC4wNywtMi4wNSAtMS41LC0wLjM4IC0yLjk5LC0wLjU4IC00LjQ3LC0wLjU4eiIvPg0KICAgIDxwYXRoIGNsYXNzPSJmaWwwIiBkPSJNMTU2LjggNDguNzZjNC43NiwwIDguNDYsLTEuMTggMTEuMTEsLTMuNTYgMi42NCwtMi4zOCAzLjk3LC01Ljg2IDMuOTcsLTEwLjQzbDAgLTIwLjE5IC05LjA5IDAgMCAyMC4xOWMwLDIuMzMgLTAuNTIsNC4wMSAtMS41OCw1LjA0IC0xLjA1LDEuMDQgLTIuNTIsMS41NSAtNC40MSwxLjU1IC0xLjg4LDAgLTMuMzUsLTAuNTEgLTQuNCwtMS41NSAtMS4wNiwtMS4wMyAtMS41OCwtMi43MSAtMS41OCwtNS4wNGwwIC0yMC4xOSAtOS4wOSAwIDAgMjAuMTljMCw0LjU3IDEuMzMsOC4wNSAzLjk3LDEwLjQzIDIuNjUsMi4zOCA2LjM1LDMuNTYgMTEuMSwzLjU2eiIvPg0KICAgIDxwb2x5Z29uIGNsYXNzPSJmaWwwIiBwb2ludHM9IjE3NS4wMiwxNC41OCAxODUuNDQsNDguMjMgMTk5LjkxLDQ4LjIzIDIxMC4zNCwxNC41OCAyMDAuODUsMTQuNTggMTkzLjc5LDQwLjQyIDE5MS45LDQwLjQyIDE4NC41LDE0LjU4ICIvPg0KICAgIDxwYXRoIGNsYXNzPSJmaWwwIiBkPSJNMjEzLjQ4IDMxYzAsNS41NiAxLjQ1LDkuOTEgNC4zNCwxMy4wNSAyLjg5LDMuMTQgNi45Miw0LjcxIDEyLjA4LDQuNzEgMy43MiwwIDYuNzgsLTAuNzEgOS4xOCwtMi4xNSAyLjQsLTEuNDMgNC4xMiwtMy41IDUuMTUsLTYuMTlsLTcuMjcgLTIuOTZjLTAuNDksMS4xNyAtMS4yMywyLjEyIC0yLjIyLDIuODYgLTAuOTgsMC43NCAtMi40OSwxLjExIC00LjUxLDEuMTEgLTAuOCwwIC0xLjYxLC0wLjExIC0yLjQyLC0wLjM0IC0wLjgxLC0wLjIyIC0xLjU3LC0wLjYyIC0yLjI5LC0xLjIxIC0wLjcxLC0wLjU4IC0xLjMyLC0xLjM4IC0xLjgxLC0yLjM5IC0wLjUsLTEuMDEgLTAuODUsLTIuMyAtMS4wOCwtMy44N2wyMS44NyAwIDAgLTMuNzZjMCwtMi4yNSAtMC4zNCwtNC4zMiAtMS4wMSwtNi4yMyAtMC42NywtMS45IC0xLjY1LC0zLjU3IC0yLjkzLC01LjAxIC0xLjI4LC0xLjQzIC0yLjgzLC0yLjU2IC00LjY3LC0zLjM2IC0xLjg0LC0wLjgxIC0zLjkzLC0xLjIyIC02LjI2LC0xLjIyIC0yLjYsMCAtNC45MSwwLjQ0IC02LjkzLDEuMzIgLTIuMDIsMC44NyAtMy43MSwyLjA3IC01LjA4LDMuNiAtMS4zNywxLjUyIC0yLjQsMy4zMiAtMy4xLDUuMzggLTAuNjksMi4wNiAtMS4wNCw0LjI4IC0xLjA0LDYuNjZ6bTE2LjQyIC05Ljc2YzEuOTMsMCAzLjQ2LDAuNjEgNC42MSwxLjgyIDEuMTQsMS4yMSAxLjc2LDIuNzYgMS44NSw0LjY0bC0xMy41OSAwYzAuMzUsLTIuMDEgMS4xMywtMy42IDIuMzIsLTQuNzQgMS4xOSwtMS4xNCAyLjc5LC0xLjcyIDQuODEsLTEuNzJ6Ii8+DQogICA8L2c+DQogICA8Zz4NCiAgICA8cGF0aCBjbGFzcz0iZmlsMSIgZD0iTTMzLjA5IDAuMTZsMTIuMzQgMTIuMzUgMy4zNiAwIDkuNTcgLTkuNTdjMC4yMiwtMC4yMiAwLjU4LC0wLjIyIDAuNzksMGwxOS4zMyAxOS4zMmMwLjIyLDAuMjIgMC4yMiwwLjU4IDAsMC44bC0xMC4xMiAxMC4xMWMtMC4yMSwwLjIyIC0wLjU3LDAuMjIgLTAuNzksMGwtMTguOSAtMTguODkgLTMuMDkgMCAtMTMuODYgMTMuODZjLTAuMjIsMC4yMiAtMC41OCwwLjIyIC0wLjgsMGwtMTIuOSAtMTIuOWMtMC4yMiwtMC4yMiAtMC4yMiwtMC41OCAwLC0wLjhsMTQuMjcgLTE0LjI4YzAuMjIsLTAuMjIgMC41OCwtMC4yMiAwLjgsMHoiLz4NCiAgICA8cGF0aCBjbGFzcz0iZmlsMSIgZD0iTTExLjMxIDIxLjk1bDE4LjgyIDE4LjgyIDMuNTEgMCAxMy40OSAtMTMuNWMwLjIyLC0wLjIyIDAuNTgsLTAuMjIgMC44LDBsMTIuOTkgMTIuOTljMC4yMiwwLjIyIDAuMjIsMC41OCAwLDAuOGwtMTQuMjEgMTQuMjFjLTAuMjIsMC4yMiAtMC41OCwwLjIyIC0wLjgsMGwtMTIuNzQgLTEyLjc0IC0yLjkzIDAgLTkuOTIgOS45MmMtMC4yMiwwLjIyIC0wLjU4LDAuMjIgLTAuOCwwbC0xOS4zNiAtMTkuMzZjLTAuMjIsLTAuMjIgLTAuMjIsLTAuNTggMCwtMC44bDEwLjM1IC0xMC4zNGMwLjIyLC0wLjIyIDAuNTgsLTAuMjIgMC44LDB6Ii8+DQogICA8L2c+DQogIDwvZz4NCiA8L2c+DQo8L3N2Zz4NCg==";
var IgIcon = "data:image/png;base64,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";

// src/templates/stripe/checkout-expired.ts
var CheckoutExpired = ({ name, url }) => {
  return `<!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"/><!--<![endif]-->
<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		sup,
		sub {
			font-size: 75%;
			line-height: 0;
		}

		@media (max-width:500px) {

			.desktop_hide table.icons-inner,
			.social_block.desktop_hide .social-table {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>
<body class="body" style="background-color: #f9f9f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9f9;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #155ec3;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #155ec3; color: #000000; width: 480px; margin: 0 auto;" width="480">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #155ec3;"><span style="word-break: break-word;">\u200A</span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 480px; margin: 0 auto;" width="480">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:25px;padding-top:22px;width:100%;padding-right:0px;padding-left:0px;">
<div align="left" class="alignment" style="line-height:10px">
<div style="max-width: 96px;"><img alt="I'm an image" height="auto" src="${muveAzul64}" style="display: block; height: auto; border: 0; width: 100%;" title="I'm an image" width="96"/></div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000; width: 480px; margin: 0 auto;" width="480">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-top:50px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span style="word-break: break-word;">\u200A</span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:20px;line-height:120%;text-align:left;mso-line-height-alt:24px;">
<p style="margin: 0;"><strong>Voc\xEA est\xE1 apenas a um passo de ter acesso a melhor ferramenta de v\xEDdeo do mercado...</strong></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">Opa, ${name}!</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;">Notamos que voc\xEA come\xE7ou seu cadastro no Muve, mas ainda falta s\xF3 um passo para liberar o seu teste gratuito.</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;">Com o Muve, voc\xEA tem acesso a ferramentas poderosas para otimizar seus v\xEDdeos de vendas e cursos, como an\xE1lises detalhadas de reten\xE7\xE3o e personaliza\xE7\xE3o total do player. E o melhor: voc\xEA pode testar tudo isso sem custo por 7 dias!</p>
<p style="margin: 0;">\xA0</p>
<p style="margin: 0;">\u{1F449} <strong>Complete seu cadastro e descubra o que o Muve pode fazer pelo seu neg\xF3cio!</strong></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="button_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:10px;padding-right:10px;padding-top:15px;text-align:center;">
<div align="center" class="alignment"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:62px;width:331px;v-text-anchor:middle;" arcsize="97%" stroke="false" fillcolor="#155ec3">
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:Tahoma, sans-serif;font-size:16px">
<![endif]-->
<a href="${url}" style="background-color:#155ec3;border-bottom:0px solid transparent;border-left:0px solid transparent;border-radius:60px;border-right:0px solid transparent;border-top:0px solid transparent;color:#ffffff;display:inline-block;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:16px;font-weight:400;mso-border-alt:none;padding-bottom:15px;padding-top:15px;text-align:center;text-decoration:none;width:auto;word-break:keep-all;"><span style="word-break: break-word; padding-left: 30px; padding-right: 30px; font-size: 16px; display: inline-block; letter-spacing: normal;"><span style="word-break: break-word; line-height: 32px;"><strong>Finalizar Cadastro Agora Mesmo</strong></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
<div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;font-weight:400;line-height:150%;text-align:left;mso-line-height-alt:22.5px;">
<p style="margin: 0;">Qualquer d\xFAvida, estamos por aqui para ajudar! \u{1F60A}</p>
<p style="margin: 0;">N\xE3o perde tempo</p>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9; color: #000000; width: 480px; margin: 0 auto;" width="480">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="empty_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div></div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #155ec3; color: #000000; width: 480px; margin: 0 auto;" width="480">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #155ec3;"><span style="word-break: break-word;">\u200A</span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-top:40px;width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment" style="line-height:10px">
<div style="max-width: 96px;"><img alt="Alternate text" height="auto" src="${logoMuve64}" style="display: block; height: auto; border: 0; width: 100%;" title="Alternate text" width="96"/></div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="social_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:28px;text-align:center;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;" width="104px">
<tr>
<td style="padding:0 10px 0 10px;"><a href="https://www.facebook.com/people/Muve/61566478731090/" target="_blank"><img alt="Facebook" height="auto" src="${FbIcon}" style="display: block; height: auto; border: 0;" title="Facebook" width="32"/></a></td>
<td style="padding:0 10px 0 10px;"><a href="https://www.instagram.com/muveplayer/" target="_blank"><img alt="Instagram" height="auto" src="${IgIcon}"  style="display: block; height: auto; border: 0;" title="Instagram" width="32"/></a></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:15px;">
<div style="color:#ffffff;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:12px;line-height:150%;text-align:left;mso-line-height-alt:18px;">
<p style="margin: 0; word-break: break-word;">Voc\xEA est\xE1 recebendo este e-mail porque fez uma compra ou se inscreveu no Muve. Siga-nos nas redes sociais e fique por dentro das novidades, dicas e atualiza\xE7\xF5es!<br/>Caso tenha alguma d\xFAvida, entre em contato com nossa equipe de suporte.</p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #ffffff;"><span style="word-break: break-word;">\u200A</span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:40px;padding-right:40px;padding-top:20px;">
<div style="color:#ffffff;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:12px;line-height:120%;text-align:left;mso-line-height-alt:14.399999999999999px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;">Muve Copyright \xA9 2024</span></p>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table><!-- End -->
</body>
</html>`;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CheckoutExpired
});
