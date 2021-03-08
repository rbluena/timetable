const mongoose = require('mongoose');
const mongooseAggregatePaginateV2 = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const boardSchema = new Schema(
  {
    name: String,
    description: String,
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    columns: [{ type: Schema.Types.ObjectId, ref: 'BoardColumn' }],
    filePath: String,
  },
  { timestamps: true }
);

boardSchema.plugin(mongooseAggregatePaginateV2);
boardSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Board', boardSchema);
