import { notification } from "./../services/index";
let readMore = async (req, res) => {
  try {
    let skipNumberNotif = +(req.query.skipNumber);
    let newNotification = await notification.readMore(req.user._id, skipNumberNotif);
    return res.status(200).send(newNotification);
  } catch (error) {
    return res.status(500).send(error);
  }
};
module.exports = {
  readMore: readMore
}