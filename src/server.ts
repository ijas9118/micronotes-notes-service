import { migrate } from "drizzle-orm/node-postgres/migrator";

import app from "./app.js";
import logger from "./configs/logger.js";
import env from "./configs/validate-env.js";
import { db } from "./db/index.js";

const PORT = env.PORT || 3002;

async function startServer() {
  try {
    logger.info("Running database migrations...");
    await migrate(db, { migrationsFolder: "./migrations" });
    logger.info("Database migrations applied successfully.");

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
