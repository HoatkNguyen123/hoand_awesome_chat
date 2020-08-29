import express from "express";
import connectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import session from "./config/session";
import passport from "passport";
import http from "http";
import socketio from "socket.io";
import initSockets from "./sockets/index";
import passportSocketIo from "passport.socketio";
import cookieParser from "cookie-parser";

let app = express();

let server = http.createServer(app);

let io = socketio(server);

connectDB();

session.config(app);

configViewEngine(app);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(connectFlash());

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

initRoutes(app);

io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,
  key: "express.sid",
  secret: "mySecret",
  store: session.sessionStore,
  success: (data, accept) => {
    if (!data.user.logged_in) {
      return accept("Invalid user", false);
    }
    return accept(null, true);
  },
  fail: (data, message, error, accept) => {
    if (error) {
      console.log("Failed connection to socket.io:", message);
      return accept(new Error(message), false);
    }
  }
}));

initSockets(io);


let hostname = 'localhost';
let port = 8017;

server.listen(port, hostname, () => {
  console.log(`Hoand code project chat at ${hostname}: ${port}/`);
});