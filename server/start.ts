import * as config from "./config";
import "./env";
import app from "./index";
import { getLogger } from "./infrastructure/log";

const logger = getLogger(__filename);

app
  .listen(config.PORT, () => {
    logger.info(
      `Listening on port ${config.PORT}, NODE_ENV = ${config.NODE_ENV}`
    );
  })
  .on("error", (err) => {
    logger.error(`ERROR: ${err}`);
  });
