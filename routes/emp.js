const express = require('express');
const router = express.Router();

const {authorization} = require("../middleware/auth");

const {upload} = require("../multer/Multer")

const {createEmp,getAllData,deleteData,updateData,adminData,singleData} = require("../controller/emp");

router.post('/create-Emp',authorization,upload.single("coverImage"),createEmp);

router.get('/emp-list',authorization,getAllData);

router.get('/singleData/:id',authorization,singleData);

router.get('/admin',authorization,adminData);

router.delete('/emp-delete/:id',authorization,deleteData);

router.put('/emp-update/:id',authorization,updateData);

module.exports = router;