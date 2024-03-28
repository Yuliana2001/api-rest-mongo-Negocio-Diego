import express from 'express';
import {infoUser, login, register,logout,refreshToken} from '../controllers/auth.controller.js';
import {body} from 'express-validator'
import { validationResultExpress } from '../middlewares/validationResultExpress.js';
import { requireToken } from '../middlewares/requireToken.js';
import { generateRefreshToken } from '../utils/tokenManager.js';
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
router.get('/protected',requireToken, infoUser);
router.get("/refresh", refreshToken);
router.get('/logout', logout )
export default router;