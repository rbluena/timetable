const mongoose = require('mongoose');
const mongooseAggregatePaginateV2 = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const attachmentsSchema = new Schema(
  {
    name: String,
    description: String,
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    filePath: String,
  },
  { timestamps: true }
);

attachmentsSchema.plugin(mongooseAggregatePaginateV2);
attachmentsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Task', attachmentsSchema);
