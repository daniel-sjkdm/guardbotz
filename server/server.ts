import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
process.env.SUPPRESS_NO_CONFIG_WARNING = "y";
import config from "config";
import AuthRouter from "./routes/auth.routes";
import { createConnection, Connection } from "typeorm";
import IncidentRouter from "./routes/incident.routes";
import GeocodeRouter from "./routes/geocode.routes";
import UserRouter from "./routes/user.routes";

const app = express();

app.use(bodyParser({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(
	cors({
		origin: "localhost:3000",
	})
);

// Firebase (authentication)
app.use("/api/auth", AuthRouter);
app.use("/api/incident", IncidentRouter);
app.use("/api/geocode", GeocodeRouter);
app.use("/api/user", UserRouter);
// Postgresql database

const PORT = config.get("app.port") || 8080;

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

(async () => {
	await createConnection();
})();

export default app;
