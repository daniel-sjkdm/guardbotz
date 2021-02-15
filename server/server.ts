import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import config from "config";
import AuthRouter from "./routes/auth.routes";
import { createConnection } from "typeorm";
import IncidentRouter from "./routes/incident.routes";
import GeocodeRouter from "./routes/geocode.routes";



const app = express();

app.use(bodyParser({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({
    origin: "localhost:3000"
}));

// Firebase (authentication)
app.use("/api/auth", AuthRouter);
app.use("/api/incident", IncidentRouter);
app.use("/api/geocode", GeocodeRouter);
// Postgresql database


const PORT = config.get("app.port") || 8080;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

createConnection().then(connection => {
    console.log("Conected to the postgresql database")
    console.log(connection.isConnected)
});

export default app;
