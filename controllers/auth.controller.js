import {User} from '../models/User.js';
import jwt from 'jsonwebtoken';
export const register= async(req, res)=>{
    const {email, password, rol, ventas} = req.body;
    console.log(req.body);
    try{

       // buscando por emaiol
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
        const token= jwt.sign({uid: user._id}, process.env.JWT_SECRET);
        return res.json({token});
    }catch(error){
        console.log(error);
        return res.status(500).json({error: 'Error de servidor'});
    }
    
};

