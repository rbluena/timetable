const mongoose = require('mongoose');
const mongooseAggregatePaginateV2 = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: String,
    description: String,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    reporter: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date },
    startTime: { type: Date },
    endTime: { type: Date },
    schedule: {
      start: { type: Date },
      end: { type: Date },
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    groupAssignees: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    userAssignees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    status: { type: Schema.Types.ObjectId, ref: 'Status' },
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
    attachments: [{ type: Schema.Types.ObjectId, ref: 'Attachment' }],
    timeEntries: [{ type: Schema.Types.ObjectId, ref: 'Timer' }],
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

taskSchema.plugin(mongooseAggregatePaginateV2);
taskSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Task', taskSchema);
