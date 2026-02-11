import { defineConfig, createLogger } from "vite";
import elmPlugin from "vite-plugin-elm";

const logger = createLogger();
const originalWarning = logger.warn;
logger.warn = (msg, options) => {
  // Suppress known vite-plugin-elm HMR warning
  if (msg.includes("vite-plugin-elm")) return;
  originalWarning(msg, options);
};

export default defineConfig(({ mode }) => ({
  customLogger: logger,
  plugins: [
    elmPlugin({
      debug: mode === "development",
      optimize: mode === "production",
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
  },
}));
