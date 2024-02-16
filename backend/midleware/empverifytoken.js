const jsonwebtoken=require('jsonwebtoken')
const empverifytoken=async(req,res,next)=>{
    const emptoken=req.cookies.emptoken;
    if(!emptoken){
        return res.send({message:"Employee Token is not found"})
    }
    jsonwebtoken.verify(String(emptoken), "Thisisasecretkeyforemp",(err,data)=>{
        if(err){
            return res.send({message:"Something wrong!"})
        }
        req.id=data.id;
        
        // console.log("working")
    })
    next();
}
module.exports=empverifytoken;