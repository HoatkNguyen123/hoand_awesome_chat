import { notification, contact, message } from "./../services/index";
import { bufferToBase64, lastItemOfArray, convertTimestampToHumanTime } from "./../helpers/clientHelper";
import request from "request";

let getICETurnServer = () => {
  return new Promise(async (resolve, reject) => {

    // let o = {
    //   format: "urls"
    // };

    // let bodyString = JSON.stringify(o);
    // let options = {
    //   url: "https://global.xirsys.net/_turn/awesome-chat",
    //   method: "PUT",
    //   headers: {
    //     "Authorization": "Basic " + Buffer.from("HoaND:8cb1f4fc-1622-11eb-b375-0242ac150002").toString("base64"),
    //     "Content-Type": "application/json",
    //     "Content-Length": bodyString.length
    //   }
    // };

    // request(options, (error, response, body) => {
    //   if (error) {
    //     return reject(error);
    //   }
    //   let bodyJson = JSON.parse(body);
    //   resolve(bodyJson.v.iceServers);
    // });
    resolve([]);

  });
};


let getHome = async (req, res) => {
  let notifications = await notification.getNotifications(req.user._id);
  let countNotifUnread = await notification.countNotifUnread(req.user._id);


  let contacts = await contact.getContacts(req.user._id);
  let contactsSent = await contact.getContactsSent(req.user._id);
  let contactsReceived = await contact.getContactsReceived(req.user._id);



  let countAllcontacts = await contact.countAllcontacts(req.user._id);
  let countAllcontactsSent = await contact.countAllcontactsSent(req.user._id);
  let countAllcontactsReceived = await contact.countAllcontactsReceived(req.user._id);

  let getAllConversationItems = await message.getAllConversationItems(req.user._id);
  let allConversationWithMessages = getAllConversationItems.allConversationWithMessages;

  let iceServerList = await getICETurnServer();

  return res.render("main/home/home", {
    errors: req.flash("errors"),
    success: req.flash("success"),
    user: req.user,
    notifications: notifications,
    countNotifUnread: countNotifUnread,
    contacts: contacts,
    contactsSent: contactsSent,
    contactsReceived: contactsReceived,
    countAllcontacts: countAllcontacts,
    countAllcontactsSent: countAllcontactsSent,
    countAllcontactsReceived: countAllcontactsReceived,
    allConversationWithMessages: allConversationWithMessages,
    bufferToBase64: bufferToBase64,
    lastItemOfArray: lastItemOfArray,
    convertTimestampToHumanTime: convertTimestampToHumanTime,
    iceServerList: JSON.stringify(iceServerList)

  });
};

module.exports = {
  getHome: getHome
};