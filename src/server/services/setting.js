const mongoose = require('mongoose');
const Setting = require('../models/Setting');

mongoose.set('debug', true);

const addSettingService = async (data) => {
  const foundOne = await Setting.findOne({ code: data.code });

  if (foundOne) {
    throw Error('The code of item already used.');
  }

  const doc = new Setting(data);
  return doc.save();
};

const updateSettingService = async (code, data) => {
  const doc = await Setting.findOne({ code });

  Object.keys(data).forEach((key) => {
    doc[key] = data[key];
  });

  return doc.save();
};

/**
 *
 * @param {String} type
 */
const getSettingsByType = async (type) => {
  const docs = await Setting.find({ type });
  return docs;
};

/**
 * Retrieving all settings for the application
 *
 * @param {Object} queries
 */
const getAllSettings = async (query) => {
  let options = [];
  const keys = Object.keys(query);

  keys.forEach((key) => {
    options = [...options, { [key]: query[key] }];
  });

  return Setting.find().or(options);
};

module.exports = {
  addSettingService,
  updateSettingService,
  getSettingsByType,
  getAllSettings,
};
