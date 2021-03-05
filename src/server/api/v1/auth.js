const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const {
  registerHandler,
  userVerificationHandler,
  newVerificationCode,
  loginHandler,
  logoutHandler,
  updateUserHandler,
  getProfileHandler,
  deleteTestingUserHandler,
  verifyUserToken,
  followUserHandler,
  uploadImageHandler,
} = require('../../handlers/auth');

const {
  registerInputValidation,
  isAuthenticated,
} = require('../../middleware/auth');

const uploadPath = path.join(__dirname, '../../uploads/images');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    if (file) {
      const ext = file.mimetype.split('/')[1];
      cb(null, `${Date.now()}.${ext}`);
    }
  },
});

const upload = multer({ storage });

/**
 * Registering user using submitted form
 */
router.post('/register', registerInputValidation, registerHandler);

/** Updating user information */
router.put('/update/:id', isAuthenticated, updateUserHandler);

/** Generating new verification token */
router.get('/me', isAuthenticated, verifyUserToken);

/** Retrieving user's profile based on username */
router.get('/profile/:username', getProfileHandler);

/** Uploading profile image. */
router.post(
  '/profile/upload/:userId',
  isAuthenticated,
  upload.single('media'),
  uploadImageHandler
);

/**
 * Verifying user with token sent via email
 */
router.get('/verify/:token', userVerificationHandler);

/**
 * Request new verification code
 */
router.post('/verify/new', newVerificationCode);

/**
 * Logging in user using email and password
 */
router.post('/login', loginHandler);

/**
 * Logging user out.
 */
router.get('/logout', logoutHandler);

router.post('/follow', isAuthenticated, followUserHandler);

/**
 * Deleting user
 */
router.delete('/delete-test', deleteTestingUserHandler);

module.exports = router;
