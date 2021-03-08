const mongoose = require('mongoose');
const mongooseAggregatePaginateV2 = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: String,
    description: String,
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  },
  { timestamps: true }
);

categorySchema.plugin(mongooseAggregatePaginateV2);
categorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Task', categorySchema);
