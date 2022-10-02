import express from "express";
import { routes } from "./routes";
import { swaggerDocs } from "./utils/swagger";

const app = express();
const PORT = Number(process.env.PORT) || 3333;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {

    swaggerDocs(app, PORT);
});
