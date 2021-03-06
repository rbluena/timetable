const mongoose = require('mongoose');
const mongooseAggregatePaginateV2 = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const timerSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    start: { type: Date, required: true },
    end: { type: Date },
    duration: { type: Number },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

timerSchema.plugin(mongooseAggregatePaginateV2);
timerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Timer', timerSchema);
