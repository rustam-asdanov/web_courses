// jshint esversion:6

// import express from "express";
const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  // console.log(req);
  // res.send("Hello Worls!");
  res.send("kukus");
});

app.get("/contact", function (req, res) {
  res.send("Contact me obasr");
});

app.get("/about", function (req, res) {
  res.send("My name is Rustam");
});

app.get("/hobbies", function (req, res) {
  res.send("Coding");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
