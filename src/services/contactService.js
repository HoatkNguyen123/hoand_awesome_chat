import contactModel from "../models/contactModel";
import userModel from "../models/userModel";
import notificationModel from "../models/notificationsModel";
import _ from "lodash";
const LIMIT_NOTIF = 10;
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

let removeContact = async (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let removeContact = await contactModel.removeContact(currentUserId, contactId);
    if (removeContact.result.n === 0) {
      return reject(false);
    }
    resolve(true);
  });
};

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

let removeRequestContactReceived = (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let removeReq = await contactModel.removeRequestContactReceived(currentUserId, contactId);
    if (removeReq.result.n === 0) {
      return reject(false);
    }

    // await notificationModel.model.removeRequestContactReceivedNotification(currentUserId, contactId, notificationModel.types.ADD_CONTACT);
    resolve(true);
  });
}

let approveRequestContactReceived = (currentUserId, contactId) => {
  return new Promise(async (resolve, reject) => {
    let approveReq = await contactModel.approveRequestContactReceived(currentUserId, contactId);
    // console.log(approveReq);
    if (approveReq.nModified === 0) {
      return reject(false);
    }

    let notificationItem = {
      senderId: currentUserId,
      receiverId: contactId,
      type: notificationModel.types.APPROVE_CONTACT,
    };
    await notificationModel.model.createNew(notificationItem);
    resolve(true);
  });
}


let getContacts = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contacts = await contactModel.getContacts(currentUserId, LIMIT_NOTIF);
      let users = contacts.map(async (contact) => {
        if (contact.contactId == currentUserId) {
          return await userModel.getNormalUserDataById(contact.userId);
        }
        else {

          return await userModel.getNormalUserDataById(contact.contactId);
        }
      });
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  });
}


let getContactsSent = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contacts = await contactModel.getContactsSent(currentUserId, LIMIT_NOTIF);
      let users = contacts.map(async (contact) => {
        return await userModel.getNormalUserDataById(contact.contactId);
      });
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  });
}


let getContactsReceived = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let contacts = await contactModel.getContactsReceived(currentUserId, LIMIT_NOTIF);
      let users = contacts.map(async (contact) => {
        return await userModel.getNormalUserDataById(contact.userId);
      });
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  });
}


let countAllcontacts = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await contactModel.countAllcontacts(currentUserId);
      resolve(count);
    } catch (error) {
      reject(error);
    }
  });
}

let countAllcontactsSent = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await contactModel.countAllcontactsSent(currentUserId);
      resolve(count);
    } catch (error) {
      reject(error);
    }
  });
}


let countAllcontactsReceived = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await contactModel.countAllcontactsReceived(currentUserId);
      resolve(count);
    } catch (error) {
      reject(error);
    }
  });
}

let readMoreContacts = (currentUserId, skipNumberContacts) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newContacts = await contactModel.readMoreContacts(currentUserId, skipNumberContacts, LIMIT_NOTIF);

      let users = newContacts.map(async (contact) => {
        if (contact.contactId == currentUserId) {
          return await userModel.getNormalUserDataById(contact.userId);
        }
        else {

          return await userModel.getNormalUserDataById(contact.contactId);
        }
      });
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  });
}

let readMoreContactsSent = (currentUserId, skipNumberContacts) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newContacts = await contactModel.readMoreContactsSent(currentUserId, skipNumberContacts, LIMIT_NOTIF);

      let users = newContacts.map(async (contact) => {
        return await userModel.getNormalUserDataById(contact.contactId);
      });
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  });
}

let readMoreContactsReceived = (currentUserId, skipNumberContacts) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newContacts = await contactModel.readMoreContactsReceived(currentUserId, skipNumberContacts, LIMIT_NOTIF);

      let users = newContacts.map(async (contact) => {
        return await userModel.getNormalUserDataById(contact.userId);
      });
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error);
    }
  });
}


module.exports = {
  findUsersContact: findUsersContact,
  addNew: addNew,
  removeRequestContact: removeRequestContact,
  getContacts: getContacts,
  getContactsSent: getContactsSent,
  getContactsReceived: getContactsReceived,
  countAllcontacts: countAllcontacts,
  countAllcontactsSent: countAllcontactsSent,
  countAllcontactsReceived: countAllcontactsReceived,
  readMoreContacts: readMoreContacts,
  readMoreContactsSent: readMoreContactsSent,
  readMoreContactsReceived: readMoreContactsReceived,
  removeRequestContactReceived: removeRequestContactReceived,
  approveRequestContactReceived: approveRequestContactReceived,
  removeContact: removeContact
}
