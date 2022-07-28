const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const { connectDB } = require("./db/mongoose");
const { watcher } = require("./task");

app.use(express.json());

const PORT = process.env.APP_PORT || 5001;

// routes and doc
const personRoute = require("./routes/person");
const { swaggerUI, specs } = require("./doc/swagger");

app.use("/api/person", personRoute);
app.use('/api/doc', swaggerUI.serve, swaggerUI.setup(specs))

connectDB()
  .then(() => {
    console.log("DB Connection successful! Starting app");
    watcher();
    setInterval(watcher, process.env.APP_INTERVAL_SEC || 3 * 60 * 60 * 1000);
    app.listen(PORT, () => console.log(`APP running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
