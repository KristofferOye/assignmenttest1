const express = require("express");
const app = express();
const routes = require("../routes");

app.use(express.json());

// Direct health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "API is running" });
});

app.use("/", routes);

// JSON error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

module.exports = app;
