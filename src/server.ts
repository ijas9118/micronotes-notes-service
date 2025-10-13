import "reflect-metadata";

import app from "./app.js";
import logger from "./configs/logger.js";
import env from "./configs/validate-env.js";

const PORT = env.PORT || 3002;

async function startServer() {
  try {
    app.listen(PORT, () => {
      logger.info(`Notes service is running on port ${PORT}`);
      logger.info(`Environment: ${env.NODE_ENV}`);
      logger.info(`Health check: http://localhost:${PORT}/health`);
    });
  }
  catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
