const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    assignees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
    reporter: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
