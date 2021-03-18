const mongoose = require('mongoose');
const mongooseAggregatePaginateV2 = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const subscriptionsSchema = new Schema(
  {
    email: String,
    description: String,
    checkoutId: String,
    isRecurring: Boolean,
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    amount: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subscriptionDate: Date,
    expiringDate: Date,
  },
  { timestamps: true }
);

subscriptionsSchema.plugin(mongooseAggregatePaginateV2);
subscriptionsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Subscription', subscriptionsSchema);
