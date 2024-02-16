const jsonwebtoken=require('jsonwebtoken');
const adminverifytoken=async(req,res,next)=>{
    const token=req.cookies.admintokennn;
   
    if(!token){
        return res.send({message:"Token is not found"})
    }
    jsonwebtoken.verify(String(token),"Thisisasecretkey",(err,data)=>{
        if(err){
            return res.send({message:"Something wrong!"})
        }
        req.id=data.id;
    })
    next();
}

module.exports=adminverifytoken;
