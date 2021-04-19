const mongoose = require('mongoose');
const mongooseAggregatePaginateV2 = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    project: { type: mongoose.Types.ObjectId, ref: 'Project', required: true },
    creator: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    recepient: {
      type: { type: String, required: true, default: 'all' }, // user, group, all
      id: { type: String },
      name: { type: String },
    },
    body: String,
    type: { type: String, default: 'notification' }, // notification || message
    pinners: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    seenBy: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    mentions: [{ type: String }],
  },
  { timestamps: true }
);

notificationSchema.plugin(mongooseAggregatePaginateV2);
notificationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Notification', notificationSchema);
