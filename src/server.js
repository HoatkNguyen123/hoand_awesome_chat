import express from "express";
import connectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
let app = express();

connectDB();

configViewEngine(app);

app.get("/", (req, res) => {
  return res.render("main/master");
});

app.get("/login-register", (req, res) => {
  return res.render("auth/loginRegister");
});




let hostname = 'localhost';
let port = 8017;

app.listen(port, hostname, () => {
  console.log(`Hoand code project chat at ${hostname}: ${port}/`);
});
