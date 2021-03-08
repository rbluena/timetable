const mongoose = require('mongoose');
const mongooseAggregatePaginateV2 = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    task: { type: mongoose.Types.ObjectId, ref: 'Task', required: true },
    text: String,
    pinned: { type: Boolean, default: false },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    mentions: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

commentSchema.plugin(mongooseAggregatePaginateV2);
commentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Comment', commentSchema);
