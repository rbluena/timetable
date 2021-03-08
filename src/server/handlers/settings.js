const { addSettingService, getAllSettings } = require('../services/setting');

/**
 * Request handler for adding new setting.
 */
exports.addSettingHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const document = await addSettingService(data);

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Link was updated successfully.',
      data: { ...document },
    });
  } catch (error) {
    next(error);
  }
};

/**
 *
 */
exports.getSettingsHandler = async (req, res, next) => {
  try {
    const { query } = req;

    const docs = await getAllSettings(query);

    res.status(200).json({
      status: 200,
      success: true,
      data: docs,
    });
  } catch (error) {
    next(error);
  }
};
