const { sendVerificationToken } = require('../services/mailer');

exports.testMailHandler = async (req, res, next) => {
  try {
    const request = sendVerificationToken(
      {
        name: 'Rabii',
        email: 'luenarabii@gmail.com',
      },
      'https://'
    );

    const response = await request;

    if (response) {
      res.status(200).json({
        status: 200,
        data: {},
        message: 'Email sent successfully!',
      });
    }
  } catch (error) {
    next(error);
  }
};
