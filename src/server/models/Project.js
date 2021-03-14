const mongoose = require('mongoose');
const mongooseAggregatePaginateV2 = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    code: { type: String },
    image: { thumbnail: { type: String }, medium: { type: String } },
    isPrivate: { type: Boolean, default: true },
    startDate: { type: Date },
    endDate: { type: Date },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    categories: [
      {
        name: String,
        colorName: String,
      },
    ],
    archived: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    visits: { type: Number, default: 0 },
    settings: {
      categories: {
        name: { type: String, default: 'Categories' },
      },
      groups: {
        name: { type: String, default: 'Members Groups' },
      },
    },
    subscription: {
      isTrial: { type: Boolean, default: false },
      checkoutId: String,
      isRecurring: false,
      maxUsers: { type: Number, default: 1 },
      subscriptionDate: { type: Date, default: null },
      expiringDate: { type: Date, default: null },
      subscribedTo: {
        type: String,
        enum: ['FREE', 'PRO'],
        default: 'FREE',
      },
    },
  },
  { timestamps: true }
);

projectSchema.plugin(mongooseAggregatePaginateV2);
projectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Project', projectSchema);
