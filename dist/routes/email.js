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
const express_1 = __importDefault(require("express"));
const mailRouter = express_1.default.Router();
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const email_1 = require("../controllers/email");
mailRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Working");
}));
mailRouter.post("/send-mail", (0, catchAsync_1.default)(email_1.sendMail));
exports.default = mailRouter;
