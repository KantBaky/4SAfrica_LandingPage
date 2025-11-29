import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import type { Server } from "http";
import { nanoid } from "nanoid";

// DEV-ONLY: hook Vite dev server into Express
export async function setupVite(app: Express, server: Server) {
  // Dynamically import Vite so production doesn't touch it
  const { createServer, createLogger } = await import("vite");
  const viteLogger = createLogger();

  const viteDevServer = await createServer({
    // In dev, __dirname = <projectRoot>/server
    configFile: path.resolve(__dirname, "..", "vite.config.ts"),
    customLogger: {
      ...viteLogger,
      error(msg, options) {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: {
      middlewareMode: true,
      hmr: { server },
      allowedHosts: true,
    },
    appType: "custom",
  });

  app.use(viteDevServer.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        __dirname,
        "..",
        "client",
        "index.html",
      );

      // Always read fresh template
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );

      const html = await viteDevServer.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      viteDevServer.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

// PROD: serve built client from dist/public
export function serveStatic(app: Express) {
  // In dist, __dirname = <projectRoot>/dist/server
  const distPath = path.resolve(__dirname, "..", "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
