const mongoose=require('mongoose');
const AdminSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const AdminModel=mongoose.model("userdetail",AdminSchema);
module.exports=AdminModel;