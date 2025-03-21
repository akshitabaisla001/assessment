const http = require("http");
const express = require("express");
const fs = require("fs");
const url = require("url");

const app = express();

app.get("/", (req, res) => {
  return res.send("hello from home page");
});

app.get("/about", (req, res) => {
  const myurl = url.parse(req.url, true); // true to parse query string
  const username = myurl.query.myname;
  return res.send(`hi, ${username}`);
});

app.get("/search", (req, res) => {
  const myurl = url.parse(req.url, true);
  const search = myurl.query.search_query;
  return res.send(`here are your results: ${search}`);
});

app.get("/signup", (req, res) => {
  return res.send("this is signup form");
});

app.post("/signup", (req, res) => {
  // db query
  return res.send("success");
});

app.use((req, res) => {
  const log = `${Date.now()} : ${req.method} : ${req.url} new request received\n`;
  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error("Error writing to log:", err);
    }
    res.status(404).send("not found");
  });
});

const server = http.createServer(app);
server.listen(8080, () => {
    console.log("Server started on port 8080");
  });
  

//server.listen(8080 () , console.log("server started"));