import notificationModel from "../models/notificationsModel";
import userModel from "../models/userModel";

const LIMIT_NOTIF = 10;

let getNotifications = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let notifications = await notificationModel.model.getByUserIdAndLimit(currentUserId, LIMIT_NOTIF);

      let getNotifContent = notifications.map(async (notification) => {
        let sender = await userModel.findUserById(notification.senderId);
        return notificationModel.contents.getContent(notification.type, notification.isRead, sender._id, sender.username, sender.avatar);
      });
      resolve(await Promise.all(getNotifContent));
    } catch (error) {
      reject(error);
    }
  });
};



let countNotifUnread = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let notificationsUnread = await notificationModel.model.countNotifUnread(currentUserId);
      resolve(notificationsUnread);
    } catch (error) {
      reject(error);
    }
  });
};


let readMore = (currentUserId, skipNumberNotification) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newNotification = await notificationModel.model.readMore(currentUserId, skipNumberNotification, LIMIT_NOTIF);

      let getNotifContent = newNotification.map(async (notification) => {
        let sender = await userModel.findUserById(notification.senderId);
        return notificationModel.contents.getContent(notification.type, notification.isRead, sender._id, sender.username, sender.avatar);
      });
      resolve(await Promise.all(getNotifContent));
    } catch (error) {
      reject(error);
    }
  });
};


let markAllAsRead = (currentUserId, targetUsers) => {
  return new Promise(async (resolve, reject) => {   
    try {
      await notificationModel.model.markAllAsRead(currentUserId, targetUsers);
      resolve(true);
    } catch (error) {
      console.log(`Error when mark notification as read: ${error}`);
      reject(false);
    }
  });
};

module.exports = {
  getNotifications: getNotifications,
  countNotifUnread: countNotifUnread,
  readMore: readMore,
  markAllAsRead: markAllAsRead
}