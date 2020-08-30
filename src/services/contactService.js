import contactModel from "../models/contactModel";
import userModel from "../models/userModel";
import notificationModel from "../models/notificationsModel";
import _ from "lodash";

let findUsersContact = (currentUserId, keyword) => {
  return new Promise(async (resolve, reject) => {
    let deprecatedUserIds = [currentUserId];
    let contactsByUser = await contactModel.findAllByUser(currentUserId);
    contactsByUser.forEach((contact) => {
      deprecatedUserIds.push(contact.userId);
      deprecatedUserIds.push(contact.contactId);
    });

    deprecatedUserIds = _.uniqBy(deprecatedUserIds);
    let users = await userModel.findAllForAddContact(deprecatedUserIds, keyword);
    resolve(users);

  });
}
let addNew = (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let contactExists = await contactModel.checkExists(currentUserId, contactId);
    if (contactExists) {
      return reject(false);
    }

    let newContactItem = {
      userId: currentUserId,
      contactId: contactId
    };

    let newContact = await contactModel.createNew(newContactItem);

    let notificationItem = {
      senderId: currentUserId,
      receiverId: contactId,
      type: notificationModel.types.ADD_CONTACT,
    };
    await notificationModel.model.createNew(notificationItem);

    resolve(newContact);
  });
}
let removeRequestContact = (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let removeReq = await contactModel.removeRequestContact(currentUserId, contactId);
    if (removeReq.result.n === 0) {
      return reject(false);
    }

    await notificationModel.model.removeRequestContactNotification(currentUserId, contactId, notificationModel.types.ADD_CONTACT);
    resolve(true);
  });
}

module.exports = {
  findUsersContact: findUsersContact,
  addNew: addNew,
  removeRequestContact: removeRequestContact,
}
