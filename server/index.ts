import express from "express";
import http from "http";
import { serveStatic } from "./vite";

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === "production";

async function bootstrap() {
  if (isProd) {
    // PRODUCTION: serve the prebuilt client from dist/public
    serveStatic(app);
  } else {
    // DEVELOPMENT: use Vite dev server (CommonJS require avoids TS2835)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { setupVite } = require("./vite");
    await setupVite(app, server);
  }

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
