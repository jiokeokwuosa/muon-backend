import express from "express";
import cors from "cors";
import { config } from "dotenv";
import "./db";
import v1Router from "./routes";

config();

const app = express();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/api/v1", (req, res) =>
  res
    .status(200)
    .json({ status: "success", message: "Welcome to MUON Club API" })
);
app.use("/api/v1", v1Router);

app.use((req, res, next) => {
  const err = new Error("No endpoint found");
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.status(err.status || 500).json({
    status: "error",
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

//server
app.listen(port, () => {
  console.log(`Server running at port ${port} on ${process.env.NODE_ENV}`);
});


export default app;
