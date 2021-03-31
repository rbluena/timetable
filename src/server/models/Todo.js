const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    text: String,
    task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Todo', todoSchema);
