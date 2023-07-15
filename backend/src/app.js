 require("dotenv").config();
const express = require("express");
const cookieParser = require ("cookie-parser");
const cors = require("cors");
const router=require("./router");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:"http://localhost:3000",credentials:true}));
app.use("/api", router); // explication dans la video JWT1 a 29 min/*
app.use(express.static(path.join(__dirname, "../public")));



app.get("*", (req, res) => {
  res.status(404).json({ message: "Not Found!" });
});

module.exports = app;