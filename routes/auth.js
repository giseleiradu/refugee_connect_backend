import express from 'express';
import {celebrate} from 'celebrate';
import {userSchema} from '../helper/validations';

import User from '../controllers/users';

const router = express.Router();


router.post('/signup', celebrate({body:userSchema}), User.signUp);
router.post('/login', User.signIn);

export default router;