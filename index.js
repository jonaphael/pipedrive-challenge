const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const { connectDB } = require("./db/mongoose");
const { watcher } = require("./task");

app.use(express.json());

const PORT = process.env.APP_PORT || 5001;
// routes
const personRoute = require("./routes/person");

app.use("/api/person", personRoute);

connectDB()
  .then(() => {
    console.log("DB Connection successful! starting app");
    watcher();
    setInterval(watcher, process.env.APP_INTERVAL_SEC);
    app.listen(PORT, () => console.log(`APP running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
