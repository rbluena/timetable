const mongoose = require('mongoose');
const mongooseAggregatePaginateV2 = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: String,
    description: String,
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    reporter: { type: Schema.Types.ObjectId, ref: 'User' },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    schedule: {
      start: { type: Date },
      end: { type: Date },
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    assignees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
    attachements: [{ type: Schema.Types.ObjectId, ref: 'Attachements' }],
    timeEntries: [{ type: Schema.Types.ObjectId, ref: 'Timer' }],
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

taskSchema.plugin(mongooseAggregatePaginateV2);
taskSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Task', taskSchema);
