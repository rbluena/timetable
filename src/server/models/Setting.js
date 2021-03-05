const mongoose = require('mongoose');

const { Schema } = mongoose;

const settingSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, unique: true, required: true },
    type: { type: String, required: true }, // category, topic
  },
  { timestamps: true }
);

module.exports = mongoose.model('Setting', settingSchema);
