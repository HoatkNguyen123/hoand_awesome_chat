import userModel from "../models/userModel";
import { transErrors } from "../../lang/vi";
import { check } from "express-validator/check";
import bcrypt from "bcrypt";

const saltRounds = 7;

let updateUser = (id, item) => {
  return userModel.updateUser(id, item);
};

let updatePassword = (id, dataUpdate) => {
  return new Promise(async (resolve, reject) => {
    let currentUser = await userModel.findUserById(id);
    if (!currentUser) {
      return reject(transErrors.account_undefined);
    }
    let checkCurrentPassword = await currentUser.comparePassword(dataUpdate.currentPassword);
    if(!checkCurrentPassword){
      return reject(transErrors.user_current_password);
    }
    let salt = bcrypt.genSaltSync(saltRounds);
    await userModel.updatePassword(id, bcrypt.hashSync(dataUpdate.newPassword, salt));
    resolve(true); 
  });
}

module.exports = {
  updateUser: updateUser,
  updatePassword: updatePassword
};