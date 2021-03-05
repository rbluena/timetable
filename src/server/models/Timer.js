const mongoose = require('mongoose');

const { Schema } = mongoose;

const timerSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    start: { type: Date, required: true },
    end: { type: Date },
    duration: { type: Number },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    task: { type: Schema.Types.ObjectId, ref: 'Task' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Timer', timerSchema);
