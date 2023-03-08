import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { genericErrorHandler } from "../server/middleware";
import * as config from "./config";
import { getLogger } from "./infrastructure/log";

const app = express();
const logger = getLogger(__filename);

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", [require("./routes/auth.route")]);

app.use(genericErrorHandler);

export const start = () => {
  app
    .listen(config.PORT, () => {
      logger.info(
        `Listening on port ${config.PORT}, NODE_ENV = ${config.NODE_ENV}`
      );
    })
    .on("error", (err) => {
      logger.error(`ERROR: ${err}`);
    });
};
