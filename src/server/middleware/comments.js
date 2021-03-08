exports.validateCommentData = (req, res, next) => {
  try {
    const { text, author, link } = req.body;

    if (!text || text.length === 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Invalid Request',
        errors: {
          details: 'Comment message should be provided.',
        },
      });
    }

    if (!author || author.length === 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Invalid Request',
        errors: {
          details: 'Author should be provided.',
        },
      });
    }

    if (!link || link.length === 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Invalid Request',
        errors: {
          details: 'Link should be provided.',
        },
      });
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
