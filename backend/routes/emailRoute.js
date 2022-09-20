import express from 'express'
import { sendMail } from '../controllers/emailController.js';

const router = express.Router();

router.route('/send').post(sendMail);

export default router;