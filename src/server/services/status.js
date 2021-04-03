const mongoose = require('mongoose');
const Status = require('../models/Status');
const Task = require('../models/Task');

const getProjectStatusesService = async (projectId, options = {}) => {
  const statuses = await Status.find(
    {
      project: mongoose.Types.ObjectId(projectId),
    },
    { ...options },
    { populate: { path: 'tasks' } }
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

  // await Status.populate(updatedStatus, 'tasks');

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

const movingTaskOnBoardService = async (taskId, data) => {
  const { source, destination } = data;
  const { droppableId: sourceStatusId } = source;
  const { droppableId: destStatusId, index: destPosition } = destination;

  // Task moved from backlog to board
  if (sourceStatusId === 'backlog') {
    await Status.updateOne(
      { _id: mongoose.Types.ObjectId(destStatusId) },
      {
        $push: {
          tasks: {
            $each: [taskId],
            $position: destPosition,
          },
        },
      }
    );

    await Task.updateOne(
      { _id: mongoose.Types.ObjectId(taskId) },
      { status: destStatusId }
    );

    return data;
  }

  // Item was moved to backlog
  if (destStatusId === 'backlog') {
    await Status.updateOne(
      { _id: mongoose.Types.ObjectId(sourceStatusId) },
      { $pull: { tasks: mongoose.Types.ObjectId(taskId) } }
    );

    await Task.updateOne(
      { _id: mongoose.Types.ObjectId(taskId) },
      { $unset: { status: 1 } }
    );

    return data;
  }

  // Item was moved from on board column to another. ie. One status to another.
  if (destStatusId !== 'backlog' && sourceStatusId !== 'backlog') {
    await Status.updateOne(
      { _id: mongoose.Types.ObjectId(sourceStatusId) },
      { $pull: { tasks: mongoose.Types.ObjectId(taskId) } }
    );

    await Status.updateOne(
      { _id: mongoose.Types.ObjectId(destStatusId) },
      {
        $push: {
          tasks: {
            $each: [taskId],
            $position: destPosition,
          },
        },
      }
    );

    await Task.updateOne(
      { _id: mongoose.Types.ObjectId(taskId) },
      { status: destStatusId }
    );

    return data;
  }
};

module.exports = {
  getProjectStatusesService,
  createStatusService,
  updateStatusService,
  deleteStatusService,
  movingTaskOnBoardService,
};
