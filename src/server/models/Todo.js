const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    completed: { type: Boolean, default: false },
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Todo', todoSchema);
