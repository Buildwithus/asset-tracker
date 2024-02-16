const AdminModel = require('../models/admin-model');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const EmployeeModel = require('../models/employee-schema');
const AssetsModel = require('../models/assets-Schema');

const adminregistration = async (req, res) => {
    let findAdmin;
    try {
        findAdmin = await AdminModel.findOne({ email: req.body.email })
    } catch (error) {
        console.log(error)
    }
    if (findAdmin) {
        return res.send({ message: "Email already exist" })
    }
    const adminhashpassword = bcrypt.hashSync(req.body.password);
    const Admin = new AdminModel({
        name: req.body.name,
        email: req.body.email,
        password: adminhashpassword,
        phone: req.body.phone
    })
    await Admin.save();
    if (Admin) {
        return res.send({ message: "Successfully Created" })
    }
    return res.send({ message: "something went wrong!" })

}



const adminlogin = async (req, res) => {
    let existingadmin;
    try {
        existingadmin = await AdminModel.findOne({ email: req.body.email });
    } catch (error) {
        console.log(error)
    }
    if (!existingadmin) {
        return res.send({ message: "Admin Not Found!" })
    }
    let isadminpasswordcorrect = bcrypt.compareSync(req.body.password, existingadmin.password)
    if (!isadminpasswordcorrect) {
        return res.send({ message: "Password Not matched" })
    }
    const token = jsonwebtoken.sign({ id: existingadmin._id }, "Thisisasecretkey", { expiresIn: "1500000s" })
    res.cookie("admintokennn", token, {
        expires: new Date(Date.now() + 15000 * 1000),

        httpOnly: true,

    })
    console.log("ff", req.cookies)
    return res.send({ message: "Successfully Login", admindetails: existingadmin, token: token })
}

const getallusers = async (req, res) => {
    const data = await EmployeeModel.find();
    res.send(data);
}


const deleteuser = async (req, res) => {
    const id = req.params.id;
    let result;
    try {
        result == await EmployeeModel.findByIdAndDelete(id);
    } catch (error) {
        console.log(error)
    }
    return res.send({ message: "Successfully Deleted" })
}


const updateuser = async (req, res) => {
    const id = req.params.id;
    let update;
    try {
        update = await EmployeeModel.findByIdAndUpdate(id, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            position: req.body.position,
            gender: req.body.gender,
        });
    } catch (error) {
        console.log(error)
    }
    await update.save();
    return res.send({message:"Successfully Updated",data:update})
}


const finduser=async(req,res)=>{
    const id=req.params.id;
    let finduser;
    try {
      finduser=await EmployeeModel.findById(id);  
    } catch (error) {
        console.log(error)
    }
   
    return res.send(finduser)
}
module.exports = { adminregistration, adminlogin, getallusers, deleteuser,updateuser ,finduser};