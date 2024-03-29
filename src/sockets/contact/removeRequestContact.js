import { pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray } from "./../../helpers/socketHelper";

let removeRequestContact = (io) => {
  let clients = {};
  io.on("connection", (socket) => {

    clients = pushSocketIdToArray(clients, socket.request.user._id, socket.id);

    socket.on("remove-request-contact", (data) => {
      let currentUser = {
        id: socket.request.user._id,
      };

      if (clients[data.contactId]) {

        emitNotifyToArray(clients, data.contactId, io, "response-remove-request-contact", currentUser);
      }
    });

    socket.on("disconnect", () => {

      clients = removeSocketIdFromArray(clients, socket.request.user._id, socket);
    });
  });
};
module.exports = removeRequestContact;