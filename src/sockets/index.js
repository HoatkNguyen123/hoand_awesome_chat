import addNewContact from "./contact/addNewContact";
import removeRequestContact from "./contact/removeRequestContact";
import removeRequestContactReceived from "./contact/removeRequestContactReceived";

let initSockets = (io) => {
  addNewContact(io);
  removeRequestContact(io);
  removeRequestContactReceived(io);
}

module.exports = initSockets;