const mongoose = require('mongoose');
const mongooseAggregatePaginateV2 = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const boardColumnSchema = new Schema(
  {
    name: String,
    description: String,
    board: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    position: { type: Number, default: 0 },
  },
  { timestamps: true }
);

boardColumnSchema.plugin(mongooseAggregatePaginateV2);
boardColumnSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('BoardColumn', boardColumnSchema);
