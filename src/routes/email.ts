import express from "express";
const mailRouter = express.Router();
import catchAsync from "../utils/catchAsync";
import { sendMail } from "../controllers/email";
import { sendMailHelper } from "../helper/mail";

mailRouter.get("/", async (req, res) => {
  res.send("Working");
});
mailRouter.post("/send-mail", catchAsync(sendMail));

export default mailRouter;
