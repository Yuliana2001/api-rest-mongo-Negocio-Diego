import mongoose from "mongoose";
try{
await mongoose.connect(process.env.URI_MONGO)
console.log("connect DB OK")
}catch (error){
console.log("ERROR DE CONEXION A MONGODB:"+error)
}
