const mongoose = require('mongoose');
const Status = require('../models/Status');
const Task = require('../models/Task');

const getProjectStatusesService = async (projectId, options = {}) => {
  const statuses = await Status.find(
    {
      project: mongoose.Types.ObjectId(projectId),
    },
    { ...options }
  ).lean();

  return statuses;
};

const createStatusService = async (data) => {
  const status = new Status(data);
  return status.save();
};

/**
 * Updating status data
 * @param {String} id ID of a status
 * @param {Object} data
 */
const updateStatusService = async (id, data) => {
  const updatedStatus = await Status.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(id),
    },
    { $set: data },
    { new: true }
  );

  await Status.populate(updatedStatus, 'tasks');

  return updatedStatus;
};

/**
 * Deleting status from an ID
 * @param {String} id ID of a status
 */
const deleteStatusService = async (id) => {
  const deleted = await Status.findOneAndDelete({
    _id: mongoose.Types.ObjectId(id),
  });

  await Task.updateMany(
    { status: mongoose.Types.ObjectId(deleted._id) },
    { $set: { status: null } }
  );

  return {
    _id: deleted._id,
  };
};

module.exports = {
  getProjectStatusesService,
  createStatusService,
  updateStatusService,
  deleteStatusService,
};
