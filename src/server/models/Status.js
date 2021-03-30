const mongoose = require('mongoose');
const mongooseAggregatePaginateV2 = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const statusSchema = new Schema(
  {
    name: { type: String },
    description: String,
    board: { type: Schema.Types.ObjectId, ref: 'Board' },
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    position: { type: Number, default: 0 },
  },
  { timestamps: true }
);

statusSchema.plugin(mongooseAggregatePaginateV2);
statusSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Status', statusSchema);
