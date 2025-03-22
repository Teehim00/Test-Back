// server.js
const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

const transactionRoutes = require("./routes/transactionRoutes")

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", transactionRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
