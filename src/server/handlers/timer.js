const { omit } = require('lodash');
const {
  startTimerService,
  stopTimerService,
  updateTimerService,
  getTimeEntriesService,
  deleteTimeEntryService,
} = require('../services/timer');

exports.startTimerHandler = async (req, res, next) => {
  try {
    const doc = await startTimerService(req.body);

    return res.status(201).json({
      status: 201,
      success: true,
      message: 'Time entry was started successfully.',
      data: doc,
    });
  } catch (error) {
    return next(error);
  }
};

exports.stopTimerHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await stopTimerService(id, req.body);

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'Timer was stoped successfully.',
      data: doc,
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateTimerHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await updateTimerService(id, req.body);

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'Timer was updated successfully.',
      data: doc,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getTimeEntriesHandler = async (req, res, next) => {
  try {
    const data = await getTimeEntriesService(req.query);
    const meta = omit(data, 'docs');
    const { docs } = data;

    res.status(200).json({
      status: 200,
      success: true,
      message: 'List of time entries.',
      data: { meta, data: docs },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTimeEntryHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await deleteTimeEntryService(id);

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Time entry was deleted successfully.',
      data: { ...doc },
    });
  } catch (error) {
    next(error);
  }
};
