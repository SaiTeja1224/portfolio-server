"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactFormValidator = exports.limitText = void 0;
const regExPatterns_1 = require("./regExPatterns");
const jsdom_1 = require("jsdom");
const dompurify_1 = __importDefault(require("dompurify"));
const limitText = (maxLength, input) => {
    if (input.length > maxLength) {
        return input.slice(0, maxLength);
    }
    else
        return input;
};
exports.limitText = limitText;
const contactFormValidator = (formData) => {
    try {
        let isValid = true;
        let errorMessage = "";
        const window = new jsdom_1.JSDOM("").window;
        const purify = (0, dompurify_1.default)(window);
        const sanitizedMessage = purify.sanitize(formData.message);
        const limitedText = (0, exports.limitText)(800, sanitizedMessage);
        formData.message = limitedText;
        if (!regExPatterns_1.emailPattern.test(formData.emailId.trim())) {
            errorMessage = "Please enter a valid email address";
            isValid = false;
        }
        else if (formData.message.trim() === "") {
            errorMessage = "Message is required";
            isValid = false;
        }
        return { isValid, errorMessage };
    }
    catch (error) {
        const errorMessage = (error === null || error === void 0 ? void 0 : error.message) || "An error occurred";
        return { isValid: false, errorMessage };
    }
};
exports.contactFormValidator = contactFormValidator;
