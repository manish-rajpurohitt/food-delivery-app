import { connectToMongo } from "common";
import express from 'express';
import "dotenv/config";
import routes from "./routes/index.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

connectToMongo();

app.use(routes);

// Start the server
app.listen(process.env.AUTH_PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.AUTH_PORT}`);
});


