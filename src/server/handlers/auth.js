const validator = require('validator');
const sharp = require('sharp');
const { decode } = require('jsonwebtoken');
const fs = require('fs');
const {
  sendVerificationToken,
  sendSignupEmailService,
} = require('../services/mailer');
const {
  generateAccessToken,
  comparePassword,
  generateVerificationCode,
} = require('../utils/auth');

const {
  createUser,
  findUserByUsername,
  findUserByVerificationToken,
  deleteUserByEmail,
  findUserByEmail,
  findUserById,
  toggleFollowUserService,
  userUploadImages,
} = require('../services/user');

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Handling user's registration request.
 *
 */
exports.registerHandler = async (req, res, next) => {
  try {
    const { type, email } = req.body;

    const userFound = await findUserByEmail(email);

    if (userFound) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Bad Request',
        errors: {
          email: 'User with email address is existing.',
        },
      });
    }

    let userData;

    // SIGINING UP WITH EMAIL AND PASSWORD
    if (type === 'local') {
      const { userName, password } = req.body;

      const usernameFound = await findUserByUsername(userName);

      if (usernameFound) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: 'Failed to register.',
          errors: {
            username: 'This username is not available.',
          },
        });
      }

      const verificationToken = generateVerificationCode();

      userData = {
        email,
        userName,
        password,
        loginStrategy: type,
        verificationToken,
      };

      const user = await createUser(userData);

      const verificationUrl = `${process.env.SITE_URL}/verify/${verificationToken}`;

      // SEND EMAIL WITH VERIFICATION.
      if (user && isProduction) {
        const request = sendVerificationToken(
          {
            name: user.userName,
            email: user.email,
          },
          'Thank you for the sign up',
          verificationUrl
        );

        await request;
      }

      const responseBody = {
        status: 201,
        success: true,
        data: {},
        message:
          'Thank you for registering with us. Check your email for verification.',
      };

      return res.status(201).json(responseBody);
    }

    // SIGNING UP WITH GOOGLE OAUTH
    const { firstname, lastname, image } = req.body;

    userData = {
      fullName: `${firstname} ${lastname}`,
      email,
      loginStrategy: type,
      verified: true,
    };

    if (image && image.length) {
      userData = { ...userData, 'image.thumbnail': image };
    }

    const user = await createUser(userData);
    const userObj = user.toObject();
    const jwt = generateAccessToken(userObj);

    req.app.jwt = jwt;

    // SENDING THANK YOU NOTE AFTER SIGNIN UP WITH GOOGLE-AUTH.
    if (user && isProduction) {
      const request = sendSignupEmailService(
        {
          name: user.fullName[0],
          email: user.email,
        },
        'Thank you for the sign up'
      );

      await request;
    }

    const responseBody = {
      status: 201,
      success: true,
      data: { token: jwt },
      message: 'Thank you for registering with us.',
    };

    return res.status(201).json(responseBody);
  } catch (error) {
    return next(error);
  }
};

/**
 * Handling user verification using link provided to user's email.
 */
exports.userVerificationHandler = async (req, res, next) => {
  try {
    const { token: verificationToken } = req.params;
    const user = await findUserByVerificationToken(verificationToken);

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: 'error',
        errors: {
          details:
            'Verification is failed, please request new verification token.',
        },
      });
    }

    user.verified = true;
    user.verificationToken = '';
    await user.save();

    return res.status(200).json({
      status: 200,
      data: { verified: true },
      message: 'You email address has been verified.',
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Send an email with verification token.
 */
exports.newVerificationCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!validator.isEmail(email)) {
      res.status(400).json({
        status: 400,
        success: false,
        message: 'Bad Request',
        errors: { details: 'Invalid email address used.' },
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      res.status(422).json({
        status: 422,
        success: false,
        message: 'Bad Request',
        errors: { details: 'You have entered wrong email address.' },
      });
    }

    if (user.verified) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: 'You are already verified.',
        data: {},
      });
    }

    const verificationToken = generateVerificationCode();
    const verificationUrl = `${process.env.SITE_URL}/verify/${verificationToken}`;

    user.verificationToken = verificationToken;
    const saved = await user.save();

    if (!saved) {
      res.status(400).json({
        status: 400,
        success: false,
        message: 'Bad Request',
        errors: { details: 'Failed to send an email. Please try again.' },
      });
    }

    const request = sendVerificationToken(
      {
        name: user.userName,
        email: user.email,
      },
      'Verify your email',
      verificationUrl
    );

    const response = await request;

    if (!response) {
      res.status(500).json({
        status: 500,
        success: false,
        message: 'Server Error',
        errors: {
          details: 'There is a problem on our end, out team are working on it.',
        },
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'We have sent you verification email.',
      data: {},
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Logging user in with email address or google oauth
 */
exports.loginHandler = async (req, res, next) => {
  try {
    const { type, email, password } = req.body;

    const userData = await findUserByEmail(email);

    if (!userData) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Bad Request',
        errors: {
          email: 'The email address does not exist. You should sign up first.',
        },
      });
    }

    // Using username/email and password to login
    if (type === 'local') {
      if (userData.loginStrategy !== 'local') {
        return res.status(400).json({
          status: 400,
          success: false,
          message: 'Bad Request',
          errors: {
            email: 'It seems you signed up with google. Use it for sign in.',
          },
        });
      }
      // Checking if password is correct password.
      if (!comparePassword(password, userData.password)) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: 'Bad Request',
          errors: { password: 'You have entered incorrect password!' },
        });
      }
    }

    const user = userData.toObject();
    const jwt = await generateAccessToken(user);
    req.app.jwt = jwt;

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'You are logged in successfully.',
      data: { jwt },
    });
  } catch (error) {
    return next(error);
  }
};

/**
 *  Verifying user jwt token.
 *  If it passes validation middleware, that is valid token.
 */
exports.verifyUserToken = async (req, res, next) => {
  try {
    return res.status(200).json({
      status: 200,
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Handler upload profile image.
 */
exports.uploadImageHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { file } = req;

    const thumbnail = `thumb_${file.filename}`;
    // const medium = `medium_${file.filename}`; // Medium image will be use later on, for let us reduce upload space.

    await sharp(file.path)
      .resize(150)
      .png()
      .toFile(`${file.destination}/${thumbnail}`);

    // Deleting original file
    // eslint-disable-next-line no-unused-vars
    fs.unlink(file.path, (err) => {
      // TODO: Report error to sentry.
      // throw err;
    });

    // await sharp(file.path)
    //   .resize(300)
    //   .png()
    //   .toFile(`${file.destination}/${medium}`);

    const user = await userUploadImages(userId, {
      thumbnail: `${process.env.SERVER_URL}/api/static/images/${thumbnail}`,
      // medium: `${process.env.SERVER_URL}/api/static/images/${medium}`,
    });

    const jwt = await generateAccessToken(user);
    req.app.jwt = jwt;

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'Profile image updated successfully!',
      data: { jwt },
    });
  } catch (error) {
    return next(error);
  }
};

exports.followUserHandler = async (req, res, next) => {
  try {
    const followedId = req.body.userId;

    const user = await decode(req.app.jwt);

    if (!user) {
      return res.status(403).json({
        status: 403,
        message: 'Unauthorized',
        errors: {
          details:
            'You not authorized to perform this action, please re-login.',
        },
      });
    }

    if (String(user._id) === String(followedId)) {
      return res.status(403).json({
        status: 403,
        message: 'Unauthorized',
        errors: {
          details: "User can't be following him/her self.",
        },
      });
    }

    const profile = await toggleFollowUserService(user._id, followedId);

    delete profile.password;
    delete profile.verificationToken;
    delete profile.token;
    delete profile.loginStrategy;
    delete profile.links;
    delete profile.followers;
    delete profile.followings;

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'Following successfully.',
      data: profile,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Logging user out
 */
exports.logoutHandler = async (req, res, next) => {
  try {
    req.app.jwt = null;

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'You have been logged out successfully',
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Updating user based ont the ID
 */
exports.updateUserHandler = async (req, res, next) => {
  try {
    const { oldPassword, password } = req.body;

    const user = await findUserById(req.params.id);

    if (!user) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Bad Request',
        errors: {
          details: 'Failed to update user.',
        },
      });
    }

    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });

    // Updating password
    if (password && password.length > 4) {
      delete user.oldPassword;

      // User should confirm password before updating
      if (!comparePassword(oldPassword, user.password)) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: 'Bad Request',
          errors: {
            password:
              'You are changing password, and you have entered incorrect password!',
          },
        });
      }
    }

    const updatedUser = await user.save();

    /** Any further issues preventing to update user */
    if (!updatedUser) {
      throw new Error('Failed to update you data. Please try again later.');
    }

    const userObject = updatedUser.toObject();
    delete userObject.loginStrategy;
    delete userObject.password;
    delete userObject.verificationToken;

    const jwt = await generateAccessToken(userObject);

    req.app.jwt = jwt;

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'User updated successfully',
      data: jwt,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Using this to delete user when writing tests
 */
exports.deleteTestingUserHandler = async (req, res, next) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      const { email } = req.query;
      await deleteUserByEmail(email);
      res.status(200).json({});
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieving user based on their username
 */
exports.getProfileHandler = async (req, res, next) => {
  try {
    const user = decode(req.app.jwt);
    const { username } = req.params;
    const profile = await findUserByUsername(username);

    if (!profile || !profile.brandname || profile.brandname.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Bad Request',
        errors: {
          details: "User with username can't be found.",
        },
      });
    }

    profile.isFollowing = false;

    if (user && String(user._id) !== String(profile._id)) {
      profile.isFollowing = profile.followers.includes(String(user._id));
    }

    delete profile.password;
    delete profile.verificationToken;
    delete profile.token;
    delete profile.loginStrategy;
    delete profile.links;

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'User updated successfully',
      data: profile,
    });
  } catch (error) {
    return next(error);
  }
};
