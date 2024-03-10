import { NextFunction, Request, Response } from "express";
import { contactFormValidator } from "../utils/validations";
import ExpressError from "../utils/ExpressError";
import { sendMailHelper } from "../helper/mail";

type RequestData = {
  emailId: string;
  message: string;
};

export const sendMail = async (
  req: Request<{}, {}, RequestData>,
  res: Response,
  next?: NextFunction
) => {
  const payload = req.body;
  const { isValid, errorMessage } = contactFormValidator(payload);
  if (!isValid) {
    throw new ExpressError(errorMessage, 400);
  } else {
    const data = await sendMailHelper(payload);
    if (data.success) {
      res.status(200).json(data);
    } else {
      throw new ExpressError(
        data?.error?.message ??
          data?.message ??
          "Something went wrong when sending email!",
        400
      );
    }
  }
};
