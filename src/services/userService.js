import userModel from "../models/userModel";

let updateUser = (id, item)  =>{
  return userModel.updateUser(id, item);
};

module.exports = {
  updateUser : updateUser,
};