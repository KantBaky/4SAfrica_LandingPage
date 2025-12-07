"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupVite = setupVite;
exports.serveStatic = serveStatic;
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const nanoid_1 = require("nanoid");
// DEV-ONLY: hook Vite dev server into Express
async function setupVite(app, server) {
    // Dynamically import Vite so production doesn't touch it
    const { createServer, createLogger } = await import("vite");
    const viteLogger = createLogger();
    const viteDevServer = await createServer({
        // In dev, __dirname = <projectRoot>/server
        configFile: path_1.default.resolve(__dirname, "..", "vite.config.ts"),
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
            const clientTemplate = path_1.default.resolve(__dirname, "..", "client", "index.html");
            // Always read fresh template
            let template = await fs_1.default.promises.readFile(clientTemplate, "utf-8");
            template = template.replace(`src="/src/main.tsx"`, `src="/src/main.tsx?v=${(0, nanoid_1.nanoid)()}"`);
            const html = await viteDevServer.transformIndexHtml(url, template);
            res.status(200).set({ "Content-Type": "text/html" }).end(html);
        }
        catch (e) {
            viteDevServer.ssrFixStacktrace(e);
            next(e);
        }
    });
}
// PROD: serve built client from dist/public
function serveStatic(app) {
    // In dist, __dirname = <projectRoot>/dist/server
    const distPath = path_1.default.resolve(__dirname, "..", "public");
    if (!fs_1.default.existsSync(distPath)) {
        throw new Error(`Could not find the build directory: ${distPath}, make sure to build the client first`);
    }
    app.use(express_1.default.static(distPath));
    app.use("*", (_req, res) => {
        res.sendFile(path_1.default.resolve(distPath, "index.html"));
    });
}
