"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const ExpressError_1 = __importDefault(require("./utils/ExpressError"));
const email_1 = __importDefault(require("./routes/email"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        connectSrc: ["'self'"],
        frameSrc: ["youtube.com"],
    },
}));
app.use(helmet_1.default.xContentTypeOptions());
app.use(helmet_1.default.xssFilter());
app.use(helmet_1.default.referrerPolicy({ policy: "same-origin" }));
app.use(helmet_1.default.frameguard({ action: "sameorigin" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/emails", email_1.default);
app.use("*", () => {
    throw new ExpressError_1.default("Route Not Found", 404);
});
app.use((err, req, res, next) => {
    var _a;
    console.error(err);
    if (res.headersSent) {
        return next(err);
    }
    res
        .status(err.status)
        .json({ success: false, message: (_a = err.message) !== null && _a !== void 0 ? _a : "Something went wrong" });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
