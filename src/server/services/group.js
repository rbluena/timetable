const mongoose = require('mongoose');
const Group = require('../models/Group');
const User = require('../models/User');

/**
 * Deleting all groups related to the project.
 * @param {String} projectId ID of the project
 */
const deleteProjectGroups = async (projectId) => {
  const groups = await Group.find({
    project: mongoose.Types.ObjectId(projectId),
  })
    .select(['_id'])
    .lean();

  await Group.deleteMany({
    project: mongoose.Types.ObjectId(projectId),
  });

  groups.forEach(async (group) => {
    await User.findOneAndUpdate(
      { groups: { $in: [group._id] } },
      { $pull: { groups: group._id } }
    );
  });

  return true;
};

module.exports = {
  deleteProjectGroups,
};
