const mongoose = require('mongoose');
const { generateHash } = require('../utils/auth');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName: String,
    userName: String,
    accountName: String,
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true,
      min: 3,
    },
    image: {
      thumbnail: {
        type: String,
      },
      medium: {
        type: String,
      },
    },
    password: { type: String, min: 5 },
    loginStrategy: {
      type: String,
      enum: ['local', 'google-oauth'],
      required: true,
    },
    verified: { type: Boolean, default: false },
    verificationToken: String,
    subscription: {
      isTrial: { type: Boolean, default: false },
      subscribedTo: {
        type: String,
        enum: ['FREE', 'BASIC', 'PREMIUM'],
        default: 'FREE',
      },
    },

    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    timer: [{ type: Schema.Types.ObjectId, ref: 'Timer' }],
    task: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  },
  { timestamps: true }
);

// eslint-disable-next-line func-names
userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  if (user.password) {
    user.password = generateHash(user.password);
  }

  return next();
});

module.exports = mongoose.model('User', userSchema);
