import express from 'express';
import {login, register} from '../controllers/auth.controller.js';
import {body} from 'express-validator'
import { validationResultExpress } from '../middlewares/validationResultExpress.js';
const router= express.Router();


router.post('/register',[
    body('email', 'Formato de email incorrecto')
    .trim()
    .isEmail()
    .normalizeEmail(),
body('password', 'minimo 8 caracteres')
.trim()
.isLength({min:8})

],
validationResultExpress,
    register
);
router.post('/login',[
    body('email', 'Formato de email incorrecto')
    .trim()
    .isEmail()
    .normalizeEmail(),
body('password', 'minimo 8 caracteres')
.trim()
.isLength({min:8})

],
validationResultExpress,
login);
export default router;