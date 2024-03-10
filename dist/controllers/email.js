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
exports.sendMail = void 0;
const validations_1 = require("../utils/validations");
const ExpressError_1 = __importDefault(require("../utils/ExpressError"));
const mail_1 = require("../helper/mail");
const sendMail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const payload = req.body;
    const { isValid, errorMessage } = (0, validations_1.contactFormValidator)(payload);
    if (!isValid) {
        throw new ExpressError_1.default(errorMessage, 400);
    }
    else {
        const data = yield (0, mail_1.sendMailHelper)(payload);
        if (data.success) {
            res.status(200).json(data);
        }
        else {
            throw new ExpressError_1.default((_c = (_b = (_a = data === null || data === void 0 ? void 0 : data.error) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : data === null || data === void 0 ? void 0 : data.message) !== null && _c !== void 0 ? _c : "Something went wrong when sending email!", 400);
        }
    }
});
exports.sendMail = sendMail;
