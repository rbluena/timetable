const mailjet = require('node-mailjet').connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

const { MAILER } = require('../constants');

/**
 *
 * @param {Object} user Receiver with name and email
 * @param {String} confirmationLink URL for user to confirm verification
 */
const sendVerificationToken = (user, subject, confirmationLink) =>
  mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: MAILER.verification.from,
          Name: MAILER.verification.name,
        },
        To: [
          {
            Email: user.email,
            Name: user.name,
          },
        ],
        TemplateID: MAILER.verification.id,
        TemplateLanguage: true,
        Subject: subject,
        Variables: {
          userName: user.name,
          confirmation_link: confirmationLink,
        },
      },
    ],
  });

/**
 * If user signup with google, we send thank you email without verification token
 */
const sendSignupEmailService = (user, subject) =>
  mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: MAILER.signup.from,
          Name: MAILER.signup.name,
        },
        To: [
          {
            Email: user.email,
            Name: user.name,
          },
        ],
        TemplateID: MAILER.signup.id,
        TemplateLanguage: true,
        Subject: subject,
        Variables: {
          userName: user.name,
        },
      },
    ],
  });

const sendingDailyDigest = () => {};

module.exports = {
  sendVerificationToken,
  sendSignupEmailService,
  sendingDailyDigest,
};
