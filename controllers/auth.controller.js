import {User} from '../models/User.js';
import jwt from 'jsonwebtoken';
import { generateRefreshToken, generateToken } from '../utils/tokenManager.js';
export const register= async(req, res)=>{
    const {email, password, rol, ventas} = req.body;
    console.log(req.body);
    try{

       // buscando por email
       let user=await  User.findOne({email});  //guarda el usuario en la base de datos
       if(user) throw ({code: 11000});
       user= new User({email, password, rol, ventas});
       await user.save();
       // jwt token
       return res.status(201).json({ok:true});
    }catch(error){
        console.log(error)
        // alternativa por defecto mongoose
        if (error.code ===11000){
            return res.status(400).json({error: 'Ya existe este usuario en la base de datos'});
        }
        return res.status(500).json({error: 'error de servidor'})

    }
   
};

export const login=async(req, res)=>{
    try{
        const {email, password}= req.body;

        let user=await  User.findOne({email});  //guarda el usuario en la base de datos
        if(!user) 
            return res.status(403).json({error: 'No existe el usuario'});

        const respuestaPassword = await user.comparePassword(password);
        if (!respuestaPassword)
            return res.status(403).json({ error: "Contraseña incorrecta" });
        
        //generar el token
        const {token, expiresIn}= generateToken(user.id)
        generateRefreshToken(user.id, res);
        
        return res.json({token, expiresIn});
    }catch(error){
        console.log(error);
        return res.status(500).json({error: 'Error de servidor'});
    }
    
};

export const infoUser= async(req, res)=>{
    try{
        const user=await User.findById(req.uid).lean();
        return res.json({email: user.email, uid: user.id});

    }catch(error){
        return res.status(500).json({error: 'error de server'});
    }
};
export const refreshToken= (req, res)=>{
try{
    const refreshtokenCookie=req.cookies.refresehToken
    if(!refreshtokenCookie) throw new Error('No existe el token');
    const {uid}= jwt.verify(refreshtokenCookie, process.env.JWT_REFRESH);
    const {token, expiresIn}= generateToken(uid)
    return res.json({token, expiresIn});
}catch(error){
    console.log(error)
    const TokenVerificationErrors={
        ['invalid signature']: 'La firma del JWT no es válida',
        ['jwt expired']:'JWT expirado',
        ['invalid token']: 'Token no valido',
        ['No Bearer']:'Utiliza formato Bearer'
    };

}
};
export const logout= (req, res)=>{
    res.clearCookie('refreshToken')
    res.json({ok:true})
}