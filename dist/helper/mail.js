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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailHelper = void 0;
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
const sendMailHelper = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = yield resend.emails.send({
            from: "Porfolio <onboarding@resend.dev>",
            to: process.env.TO_MAIL,
            subject: "Message from contact form in portfolio!",
            reply_to: payload.emailId,
            text: payload.message,
        });
        if (value.error) {
            return { success: false, error: value.error };
        }
        return { success: true, message: "Email sent successfully" };
    }
    catch (e) {
        console.log(e);
        return { success: false, message: "Email failed to deliver" };
    }
});
exports.sendMailHelper = sendMailHelper;
