import { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSchema from "./swaggerSchema.json";
import log from "./logger";

export function swaggerDocs(app: Express, port: number) {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSchema));

    app.get("/api/docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSchema);
    });

    log.info(`Docs available at http://localhost:${port}/api/docs`);
    log.info(`Docs available at http://localhost:${port}/api/docs.json`);
}
