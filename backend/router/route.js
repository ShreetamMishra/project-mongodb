// import { Router } from "express";
// const router = Router();

// /** import all controllers */
// import * as controller from '../controllers/appController.js';
// import { registerMail } from '../controllers/mailer.js'
// import Auth, { localVariables } from '../middleware/auth.js';
// import { getItems, addItem, downloadFile } from "../controllers/items";


// /** POST Methods */
// router.route('/register').post(controller.register); // register user
// router.route('/registerMail').post(registerMail); // send the email
// router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user
// router.route('/login').post(controller.verifyUser,controller.login); // login in app
// router.route('/validate-otp-and-register').post(controller.validateOTPAndRegister);//verify
// router.route('../controllers/item').post(controller.uploadFile);

// /** GET Methods */
// router.route('/user/:username').get(controller.getUser) // user with username
// router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP
// router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP
// router.route('/createResetSession').get(controller.createResetSession) // reset all the variables
// router.route("/").get(getItems).post(upload.single("file"), addItem);
// router.route("/download/:id").get(downloadFile);


// /** PUT Methods */
// router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
// router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password



// export default router;

// Update the import statement in route.js
import { getItems, addItem, downloadFile } from '../controllers/items.js';
import upload from '../middleware/multer.js';
// other imports...
// Ensure correct file extension (.js)

import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailer.js'
import Auth, { localVariables } from '../middleware/auth.js';
// import { getItems, addItem, downloadFile } from "../controllers/items";


// POST Methods
router.route('/register').post(controller.register);
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end());
router.route('/login').post(controller.verifyUser, controller.login);
router.route('/validate-otp-and-register').post(controller.validateOTPAndRegister);
// router.route('/upload-file').post(controller.verifyUser, uploadFile); // Updated route

// GET Methods
router.route('/user/:username').get(controller.getUser);
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);
router.route("/").get(getItems).post(upload.single("file"), addItem);
router.route('/download/:id').get(downloadFile);
// router.get('/api/v1/items', getItems);

// PUT Methods
router.route('/updateuser').put(Auth, controller.updateUser);
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword);

export default router;
