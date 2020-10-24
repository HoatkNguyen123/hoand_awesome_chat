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
import configSocketIo from "./config/socketio";
import events from "events"
import cookieParser from "cookie-parser";
import * as configApp from "./config/app";

let app = express();

events.EventEmitter.defaultMaxListeners =configApp.app.max_event_listeners;

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

configSocketIo(io, cookieParser, session.sessionStore);

initSockets(io);


let hostname = 'localhost';
let port = 8017;

server.listen(port, hostname, () => {
  console.log(`Hoand code project chat at ${hostname}: ${port}/`);
});