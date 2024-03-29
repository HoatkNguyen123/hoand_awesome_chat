import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ContactSchema = new Schema({
  userId: String,
  contactId: String,
  status: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null }
});

ContactSchema.statics = {

  createNew(item) {
    return this.create(item);
  },

  findAllByUser(userId) {
    return this.find({
      $or: [
        { "userId": userId },
        { "contactId": userId }
      ]
    }).exec();
  },


  checkExists(userId, contactId) {
    return this.findOne({
      $or: [
        {
          $and: [
            { "userId": userId },
            { "contactId": contactId }
          ]
        },
        {
          $and: [
            { "userId": contactId },
            { "contactId": userId }
          ]
        }
      ]
    }).exec();
  },

  removeContact(userId, contactId) {
    return this.remove({
      $or: [
        {
          $and: [
            { "userId": userId },
            { "contactId": contactId },
            { "status": true }
          ]
        },
        {
          $and: [
            { "userId": contactId },
            { "contactId": userId },
            { "status": true }
          ]
        }
      ]
    }).exec();
  },

  removeRequestContact(userId, contactId) {
    return this.remove({
      $and: [
        { "userId": userId },
        { "contactId": contactId },
        { "status": false }
      ]
    }).exec();
  },

  removeRequestContactReceived(userId, contactId) {
    return this.remove({
      $and: [
        { "contactId": userId },
        { "userId": contactId },
        { "status": false }
      ]
    }).exec();
  },

  approveRequestContactReceived(userId, contactId) {
    return this.update({
      $and: [
        { "contactId": userId },
        { "userId": contactId },
        { "status": false }
      ]
    }, { "status": true, "updatedAt": Date.now() }).exec();
  },


  getContacts(userId, limit) {
    return this.find({
      $and: [
        { $or: [{ "userId": userId }, { "contactId": userId }] },
        { "status": true }
      ]
    }).sort({ "createdAt": -1 }).limit(limit).exec();
  },

  getContactsSent(userId, limit) {
    return this.find({
      $and: [
        { "userId": userId },
        { "status": false }
      ]
    }).sort({ "updatedAt": -1 }).limit(limit).exec();
  },


  getContactsReceived(userId, limit) {
    return this.find({
      $and: [
        { "contactId": userId },
        { "status": false }
      ]
    }).sort({ "createdAt": -1 }).limit(limit).exec();
  },



  countAllcontacts(userId) {
    return this.count({
      $and: [
        { $or: [{ "userId": userId }, { "contactId": userId }] },
        { "status": true }
      ]
    }).exec();
  },

  countAllcontactsSent(userId) {
    return this.count({
      $and: [
        { "userId": userId },
        { "status": false }
      ]
    }).exec();
  },


  countAllcontactsReceived(userId) {
    return this.count({
      $and: [
        { "contactId": userId },
        { "status": false }
      ]
    }).exec();
  },

  readMoreContacts(userId, skip, limit) {
    return this.find({
      $and: [
        {
          $or: [{ "userId": userId },
          { "contactId": userId }
          ]
        },
        { "status": true }
      ]
    }).sort({ "updatedAt": -1 }).skip(skip).limit(limit).exec();
  },

  readMoreContactsSent(userId, skip, limit) {
    return this.find({
      $and: [
        { "userId": userId },
        { "status": false }
      ]
    }).sort({ "createdAt": -1 }).skip(skip).limit(limit).exec();
  },
  readMoreContactsReceived(userId, skip, limit) {
    return this.find({
      $and: [
        { "contactId": userId },
        { "status": false }
      ]
    }).sort({ "createdAt": -1 }).skip(skip).limit(limit).exec();
  },
  updateWhenHasNewMessage(userId, contactId) {
    return this.update({
      $or: [
        {
          $and: [
            { "userId": userId },
            { "contactId": contactId }
          ]
        },
        {
          $and: [
            { "userId": contactId },
            { "contactId": userId }
          ]
        }
      ]
    }, { "updatedAt": Date.now() }).exec();
  },

  getFriends(userId) {
    return this.find({
      $and: [
        { $or: [{ "userId": userId }, { "contactId": userId }] },
        { "status": true }
      ]
    }).sort({ "createdAt": -1 }).exec();
  },

};


module.exports = mongoose.model("contact", ContactSchema);