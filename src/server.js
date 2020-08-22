import express from "express";
import connectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import configSession from "./config/session";
import passport from "passport";


let app = express();

connectDB();

configSession(app);

configViewEngine(app);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(connectFlash());

app.use(passport.initialize());
app.use(passport.session());

initRoutes(app);


let hostname = 'localhost';
let port = 8017;

app.listen(port, hostname, () => {
  console.log(`Hoand code project chat at ${hostname}: ${port}/`);
});