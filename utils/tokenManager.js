import jwt from 'jsonwebtoken'
export const generateToken = (uid)=>{
    const expiresIn=60*15;
    try{
        const token=jwt.sign({uid}, process.env.JWT_SECRET, {expiresIn})
        return {token, expiresIn}
    }catch(error){
        console.log(error)
    }
};

export const generateRefreshToken=(uid, res)=>{
    const expiresIn= 60*60*24*30; // 30 days
    try{
        const refreshToken=jwt.sign({uid}, process.env.JWT_REFRESH,{expiresIn})
        res.cookie('token', token,{
            httpOnly:true,
            secure:!(process.env.MODO==='developer'),
            expires: new Date(Date.now()+expiresIn*1000)

        });
        
    }catch(error){
        console.log(error);
    }
}
export const errorValidateToken=(error)=>{
    switch(error){
        case 'invalid signature':
            return 'firma no válida';
        case 'jwt expired':
            return 'El token ha caducado';
        case 'invalid token':
            return 'no invente token';
        default:
            return error;
            
    }
};