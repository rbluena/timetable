const mongoose = require('mongoose');

const { Schema } = mongoose;

const groupSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    invitees: [{ email: String }],
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    assignedTasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Group', groupSchema);
