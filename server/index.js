"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const vite_1 = require("./vite");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === "production";
async function bootstrap() {
    if (isProd) {
        // PRODUCTION: serve the prebuilt client from dist/public
        (0, vite_1.serveStatic)(app);
    }
    else {
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
