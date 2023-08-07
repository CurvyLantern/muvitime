import "dotenv/config.js";

import { createServer } from "http";
import app from "./app.js";
import mongoose from "mongoose";

const MONGO_URI =
  process.env.NODE_ENV === "development"
    ? process.env.MONGODB_URI_DEV
    : process.env.MONGODB_URI;
console.log({ MONGO_URI });
if (!MONGO_URI) {
  throw new Error(
    "Please define the Mongo uri environment variable inside .env.local"
  );
}

import transportInit from "./transport.js";

const port = Number(process.env.PORT || 8000);

const httpServer = createServer(app);

transportInit(httpServer);

mongoose.set("autoIndex", false);
mongoose.set("strictQuery", false);

mongoose
  .connect(MONGO_URI, {})
  .then(() => {
    console.log("connected to MongoDB");
    httpServer.listen(port, () => console.log(`server listening on ${port}`));
  })
  .catch((error) => {
    console.log(error);
  });
