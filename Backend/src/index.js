import express from "express";
import dotenv from "dotenv";
import dataBaseConnection from "./database/DbConnection.js";
import CardRouter from "./routes/cards.routes.js";
import cors from "cors";

const app = express();

dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 8000;

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.get("/ping", (req, res) => {
  res.status(200).send({
    mesaage: "Server is running.... ",
  });
});

app.use("/api/v1", CardRouter);

dataBaseConnection();
app.listen(PORT, () => {
  console.log("App is running on PORT", PORT);
});
