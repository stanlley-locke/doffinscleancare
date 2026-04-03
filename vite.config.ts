import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import url from "url";
import fs from "fs";

// Custom API Middleware for Vite Dev Server
const apiPlugin = () => ({
  name: 'api-plugin',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url?.startsWith('/api/')) {
        const urlParsed = url.parse(req.url, true);
        const endpoint = urlParsed.pathname?.replace('/api/', '');
        const filePath = path.resolve(__dirname, `./api/${endpoint}.ts`);

        if (fs.existsSync(filePath)) {
          try {
            // Use Vite's SSR loading to handle TypeScript and HMR
            const module = await server.ssrLoadModule(`./api/${endpoint}.ts`);
            const handler = module.default;

            // Mocking 'res' methods for Vercel/Next compatibility
            res.status = (code: number) => {
              res.statusCode = code;
              return res;
            };
            res.json = (data: any) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return res;
            };

            // Basic body parsing for POST/PATCH
            if (['POST', 'PATCH'].includes(req.method)) {
              const buffers: any[] = [];
              for await (const chunk of req) {
                buffers.push(chunk);
              }
              const data = Buffer.concat(buffers).toString();
              req.body = data ? JSON.parse(data) : {};
            }

            // Expose query parameters
            req.query = urlParsed.query;

            await handler(req, res);
            return;
          } catch (error) {
            console.error(`API Error [${endpoint}]:`, error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
          }
        }
      }
      next();
    });
  }
});

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    apiPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.svg", "**/*.csv"],
});