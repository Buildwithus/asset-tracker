const express=require('express');
const adminverifytoken=require('../midleware/verifytoken')
const router=express.Router();
const {adminregistration,adminlogin,getallusers,deleteuser,updateuser,finduser}=require('../controllers/controller')
const {Addemployee,accessadmin,assignAssests,employeeLogin,empaccess}=require('../controllers/employee')
const empverifytoken=require('../midleware/empverifytoken');
router.post("/adminsingup",adminregistration);
router.post("/adminlogin",adminlogin);
router.post("/admin",adminverifytoken,Addemployee)
router.post("/assets",adminverifytoken,assignAssests)
router.post("/emplogin",employeeLogin)
router.get("/empaccess",empverifytoken,empaccess)
router.get("/getalluser",adminverifytoken,getallusers),
router.delete("/:id",adminverifytoken,deleteuser)
router.put("/:id",adminverifytoken,updateuser)
router.get("/:id",adminverifytoken,finduser)
module.exports=router;