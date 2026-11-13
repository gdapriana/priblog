import app from "./app.js";
import { logger } from "./configs/logger.js";

const port = 8000;

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`);
});
