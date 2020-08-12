import express from "express";
import connectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/web"; 



let app = express();

connectDB();

configViewEngine(app);

initRoutes(app);


let hostname = 'localhost';
let port = 8017;

app.listen(port, hostname, () => {
  console.log(`Hoand code project chat at ${hostname}: ${port}/`);
});
