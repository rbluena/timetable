const mongoose = require('mongoose');
const mongooseAggregatePaginateV2 = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    text: String,
    pinned: { type: Boolean, default: false },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    parent: { type: mongoose.Types.ObjectId, ref: 'Comment' },
    link: { type: mongoose.Types.ObjectId, ref: 'Link', required: true },
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

commentSchema.plugin(mongooseAggregatePaginateV2);
commentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Comment', commentSchema);
