
const EmployeeModel=require('../models/employee-schema');
const AssetsModel=require('../models/assets-Schema');
const bcrypt=require('bcryptjs');
const jsonwebtoken=require('jsonwebtoken');


const Addemployee=async(req,res)=>{
    const token=req.cookies.admintokennn;
    console.log("addemp: :" ,token)
    
    let exitingemployee;
    try {
        exitingemployee=await EmployeeModel.findOne({email:req.body.email});
    } catch (error) {
        console.log(error)
    }
    if(exitingemployee){
        return res.send({message:"Employee Email already Exist"});
    }
  
   const  hashpassword=bcrypt.hashSync(req.body.password)
    const Employee=new EmployeeModel({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        address:req.body.address,
        email:req.body.email,
        phone:req.body.phone,
        position :req.body.position,
        gender:req.body.gender,
        password:hashpassword,
    })
     const employee =await Employee.save();
    if(employee){
        return res.send({message:"Successfully Created Employee!"})
    }
    return res.send({message:"Something Went Wrong!"})
}


const assignAssests=async(req,res)=>{
    let exitingemployee;
    let assingedemployee;
    // const emptoken=req.cookies.emptoken;
    // const verifyemptoken=jsonwebtoken.verify(String(emptoken),"Thisisasecretkeyforemp");
    try {
        exitingemployee=await EmployeeModel.findOne({email:req.body.email}); 
        assingedemployee=await AssetsModel.findOne({email:req.body.email});
        
    } catch (error) {
        console.log(error)
    }
    if(!exitingemployee){
        return res.send({message:"Employee does not Exist"})
    }

    if(!assingedemployee){
        const Assest=new AssetsModel({
            key:exitingemployee._id,
            email:req.body.email,
            assets:[req.body.assets],
            assetsid:[req.body.assetsid],
         
        })
        await Assest.save();
    }else{
        
        const pushAssests=await AssetsModel.findOneAndUpdate(
           
            {email:req.body.email},
            {$push:{assets:req.body.assets, assetsid:req.body.assetsid, dateArray:[Date.now()]}},
            //
            //
            // {$push:{assetsid:req.body.assetsid}}
        )
        await pushAssests.save();
    }
    return res.send({message:"Successfully Assigned"})
  

}


const employeeLogin=async(req,res)=>{
    let employee;
    try {
        employee=await EmployeeModel.findOne({email:req.body.email});
    } catch (error) {
        console.log(error)
    }
    if(!employee){
        return res.send({message:"Email Does not Exist"})
    }
    let iscorrectpassword;
    iscorrectpassword=bcrypt.compareSync(req.body.password,employee.password);
    if(!iscorrectpassword){
        return res.send({message:"Password not match"})
    }

    
    const emptoken=jsonwebtoken.sign({id:employee._id},"Thisisasecretkeyforemp",{expiresIn:"15000000s"})
    res.cookie("emptoken",emptoken,{
        expires: new Date(Date.now()+15000*1000),
        httpOnly:true
    })
    return res.send({message:"Successfully Login",empdetails:employee,emptoken:emptoken})
}


const accessadmin=async(req,res)=>{
    res.send("hi this is a access")
}



const empaccess=async(req,res)=>{
    const emptoken=req.cookies.emptoken;
    const verifyemptoken=jsonwebtoken.verify(String(emptoken),"Thisisasecretkeyforemp");
   
    
    const getempdetails=await EmployeeModel.findOne({_id:verifyemptoken.id});
    const getassets=await AssetsModel.findOne({key:verifyemptoken.id})
    res.send({getempdetails,getassets})
}


module.exports={Addemployee,accessadmin,assignAssests,employeeLogin,empaccess};