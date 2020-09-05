import { notification, contact } from "./../services/index";
let getHome = async (req, res) => {
  let notifications = await notification.getNotifications(req.user._id);
  let countNotifUnread = await notification.countNotifUnread(req.user._id);


  let contacts = await contact.getContacts(req.user._id);
  let contactsSent = await contact.getContactsSent(req.user._id);
  let contactsReceived = await contact.getContactsReceived(req.user._id);



  let countAllcontacts = await contact.countAllcontacts(req.user._id);
  let countAllcontactsSent = await contact.countAllcontactsSent(req.user._id);
  let countAllcontactsReceived = await contact.countAllcontactsReceived(req.user._id);

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
    countAllcontactsReceived: countAllcontactsReceived

  });
};

module.exports = {
  getHome: getHome
};