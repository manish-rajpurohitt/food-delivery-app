import {connectToMongo} from "common";
import express from 'express';
import "dotenv/config";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());

connectToMongo();

app.use(routes);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});


