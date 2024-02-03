import { connectToMongo } from "common";
import express from 'express';
import "dotenv/config";
import routes from "./routes/index.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

connectToMongo();

app.use(routes);

// Start the server
app.listen(process.env.DELIVERY_PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.DELIVERY_PORT}`);
});