import {Joi} from 'celebrate';
import joiErrors from './error';

    const userSchema = {
      names: Joi.string().min(5).max(60).required().error(new Error('Wrong names format (string and at least 5 characters)')),
      uname: Joi.string().required().min(5).error(new Error('Wrong uname format (string and at least 5 characters ')),
      role: Joi.string(),
      password: Joi.string().min(5).max(10).error(new Error('Wrong password format (at least 5 characters)')),
      email: Joi.string().regex(/\S+@\S+\.\S+/).required().error(new Error('Wrong email format (example@email.com)')),
      phone: Joi.string().regex(/^[0]{1}[7]{1}[8,2]{1}[0-9]{7}$/).max(10).required().error(new Error('Wrong phone format, needs numbers (example: 078...... or 072......)')),
      location: Joi.string().min(5).max(10).required(),
    };

    const courseSchema = {
      courseName: Joi.string().min(5).max(60).required().error(new Error('Wrong names format (string and at least 5 characters)')),
      courseCredits: Joi.number().min(1).max(1).error(new Error('Wrong email format (example@email.com)'))
    };

    const sponsorshipSchema = {
      donorname: Joi.string().min(5).max(60).required().error(new Error('Wrong names format (string and at least 5 characters)')),
      receiverNaems: Joi.string().required().min(5).error(new Error('Wrong uname format (string and at least 5 characters ')),
      amount: Joi.number().min(1).required()
    };
  export {userSchema, courseSchema, sponsorshipSchema};