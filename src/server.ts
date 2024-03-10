require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import ExpressError from "./utils/ExpressError";
import mailRouter from "./routes/email";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      connectSrc: ["'self'"],
      frameSrc: ["youtube.com"],
    },
  })
);
app.use(helmet.xContentTypeOptions());
app.use(helmet.xssFilter());
app.use(helmet.referrerPolicy({ policy: "same-origin" }));
app.use(helmet.frameguard({ action: "sameorigin" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/emails", mailRouter);

app.use("*", () => {
  throw new ExpressError("Route Not Found", 404);
});

app.use(
  (err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if (res.headersSent) {
      return next(err);
    }
    res
      .status(err.status)
      .json({ success: false, message: err.message ?? "Something went wrong" });
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
