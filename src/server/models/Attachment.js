const mongoose = require('mongoose');
const mongooseAggregatePaginateV2 = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const attachmentSchema = new Schema(
  {
    name: String,
    description: String,
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    filePath: String,
  },
  { timestamps: true }
);

attachmentSchema.plugin(mongooseAggregatePaginateV2);
attachmentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Attachment', attachmentSchema);
