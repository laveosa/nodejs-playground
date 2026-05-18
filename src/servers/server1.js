import fsP from "node:fs/promises";
import path from "node:path";
import * as http from "node:http";
const PORT = 8001;
const serviceOption = {};
const MIME_TYPES = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
};
export function runService1() {
    const service = http.createServer(serviceOption);
    service.on("request", async (request, response) => {
        const url = request.url || "/";
        const viewRoot = "./views/pages";
        if (url === "/") {
            const filePath = path.join(viewRoot, "main-page", "main-page.html");
            const fileContent = await fsP.readFile(filePath);
            response.writeHead(200, { "Content-Type": MIME_TYPES[".html"] });
            return response.end(fileContent);
        }
        if (url === "/contacts") {
            const filePath = path.join(viewRoot, "contacts-page", "contacts-page.html");
            const fileContent = await fsP.readFile(filePath);
            response.writeHead(200, { "Content-Type": MIME_TYPES[".html"] });
            return response.end(fileContent);
        }
        const staticFilePath = path.join(viewRoot, url);
        try {
            const fileContent = await fsP.readFile(staticFilePath);
            const ext = path.extname(staticFilePath);
            const contentType = MIME_TYPES[ext] || "application/octet-stream";
            response.writeHead(200, { "Content-Type": contentType });
            return response.end(fileContent);
        }
        catch (error) {
            try {
                const errorPage = await fsP.readFile(path.join(viewRoot, "error-page", "error-page.html"));
                response.writeHead(404, { "Content-Type": MIME_TYPES[".html"] });
                return response.end(errorPage);
            }
            catch {
                response.writeHead(404, { "Content-Type": "text/plain" });
                return response.end("404 Page Not Found");
            }
        }
    });
    service.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}
//# sourceMappingURL=server1.js.map