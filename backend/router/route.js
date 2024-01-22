import { getItems, addItem,getUserItems, downloadFile } from '../controllers/items.js';
import upload from '../middleware/multer.js';
import { Router } from "express";
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailer.js'
import Auth, { localVariables } from '../middleware/auth.js';


const router = Router();
// POST Methods
router.route('/register').post(controller.register);
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end());
router.route('/login').post(controller.verifyUser, controller.login);
router.route('/validate-otp-and-register').post(controller.validateOTPAndRegister);


// GET Methods
router.route('/user/:username').get(controller.getUser);
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);
router.route('/upload-file').post(upload.single("file"), addItem);
router.route("/").get(getItems).post(upload.single("file"), addItem);
router.route('/download/:id').get(downloadFile);
router.route('/user-items/:semester/:subject').get(getUserItems);


// PUT Methods
router.route('/updateuser').put(Auth, controller.updateUser);
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword);

export default router;
