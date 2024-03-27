import {Schema, model} from 'mongoose'
const userSchema=new Schema({
    email:{
        type: String,
        required: true,
        trim:true,
        unique:true,
        lowercase:true,
        index:{unique:true}
    },
    password:{
        type:String, 
        required:true,  
        minlength:8
    },
    rol:{
        type:String,
        lowercase:true
    },
    ventas: [{  
        codArticulo: {
            type: String,
            unique:true,
        provedor: true},
        
        unidades: {
        type:Number,
        required:true},

        fecha_venta:{
            type: Date,
            required:true
        }}]
    });


export const User=model('user', userSchema)