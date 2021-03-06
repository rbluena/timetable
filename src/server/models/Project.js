const mongoose = require('mongoose');
const mongooseAggregatePaginateV2 = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    code: { type: String, required: true },
    image: { thumbnail: { type: String }, medium: { type: String } },
    isPrivate: { type: Boolean, default: true },
    startDate: { type: Date },
    endDate: { type: Date },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    groups: {
      type: Array,
      default: [
        { name: 'Admins', roles: 2 }, // Can edit project, can add user and can create task and
        { name: 'Members', roles: 1 }, // Can add task, 0 can only view project
      ],
    },
    users: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        group: String,
      },
    ],
    categories: [
      {
        name: String,
      },
    ],
    archived: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    visits: { type: Number, default: 0 },
    settings: {
      categories: {
        name: { type: String, default: 'Categories' },
      },
    },
  },
  { timestamps: true }
);

projectSchema.plugin(mongooseAggregatePaginateV2);
projectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Project', projectSchema);
