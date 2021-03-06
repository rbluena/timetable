/**
 * Validating data comming from the client
 *
 */
exports.validateProjectData = (req, res, next) => {
  try {
    const { title, owner } = req.body;

    if (!title || title.length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'error',
        errors: [
          {
            details:
              'Title of the project is missing. Title should be provided.',
          },
        ],
      });
    }

    if (!owner || owner.length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'error',
        errors: [
          {
            details: 'Owner should be specified.',
          },
        ],
      });
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
