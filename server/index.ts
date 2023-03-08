import { genericErrorHandler } from "@middleware";
import bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import { authRoutes } from "./routes";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", [
  authRoutes,
  require("./routes/user_routes"),
  require("./routes/project_routes"),
]);

app.use(genericErrorHandler);

export default app;
