"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const make_process_signatures_at_half_trial_use_case_1 = require("@/use-cases/factories/signature/make-process-signatures-at-half-trial-use-case");
const make_process_signatures_two_days_after_creation_use_case_1 = require("@/use-cases/factories/signature/make-process-signatures-two-days-after-creation-use-case");
const make_process_signatures_two_days_before_trial_ends_use_case_1 = require("@/use-cases/factories/signature/make-process-signatures-two-days-before-trial-ends-use-case");
const processSignaturesAtHalfTrialUseCase = (0, make_process_signatures_at_half_trial_use_case_1.makeProcessSignaturesAtHalfTrialUseCase)();
const processSignaturesTwoDaysAfterCreationUseCase = (0, make_process_signatures_two_days_after_creation_use_case_1.makeProcessSignaturesTwoDaysAfterCreationUseCase)();
const processSignaturesTwoDaysBeforeTrialEndsUseCase = (0, make_process_signatures_two_days_before_trial_ends_use_case_1.makeProcessSignaturesTwoDaysBeforeTrialEndsUseCase)();
node_cron_1.default.schedule('0 0 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    yield processSignaturesTwoDaysAfterCreationUseCase.execute();
}));
node_cron_1.default.schedule('0 0 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    yield processSignaturesAtHalfTrialUseCase.execute();
}));
node_cron_1.default.schedule('0 0 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    yield processSignaturesTwoDaysBeforeTrialEndsUseCase.execute();
}));
