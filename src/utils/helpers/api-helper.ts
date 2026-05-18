import type { IncomingMessage } from "node:http";
import { ServerResponse } from "node:http";

export function getRequestBody<T = unknown>(req: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on("data", (chunk: Buffer) => chunks.push(chunk));

    req.on("end", () => {
      try {
        const rawBody = Buffer.concat(chunks).toString("utf-8");

        if (!rawBody) return resolve(null as T);

        const parsedData = JSON.parse(rawBody) as T;
        resolve(parsedData);
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });

    req.on("error", (error) => reject(error));
  });
}

export function responseErrorHandler(
  error: unknown,
  res: ServerResponse,
  code: number = 500,
) {
  let errorMessage =
    error instanceof Error ? error.message : "An unexpected error occurred.";

  console.error(`Server Error: `, errorMessage);

  if (!res.writableEnded) {
    res.writeHead(code, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: errorMessage }));
  }
}
