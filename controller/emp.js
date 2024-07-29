const jwt = require("jsonwebtoken");
const secret = "Rohan@123504";

const emp = require("../model/emp");

async function createEmp(req, res) {
    try {
        const coverImage = req.file
        console.log(coverImage);

        const { name, email, contact, designation, gender, course } = req.body;

        const existedEmail = await emp.findOne({ email })

        if (!name && !email && !contact && !designation && !gender && !course) {
            return res.status(400).json({ err: "Form is empty !" })
        }
        else if (!name) {
            return res.status(400).json({ err: "Name field is empty !" })
        }
        else if (!email) {
            return res.status(400).json({ err: "Email field is empty !" })
        }
        else if (!contact) {
            return res.status(400).json({ err: "Contact field is empty !" })
        }
        else if (contact.length !== 10) {
            return res.status(400).json({ err: "Please enter 10 numbers !"})
        }
        else if (!designation) {
            return res.status(400).json({ err: "Designation field is empty !" })
        }
        else if (!gender) {
            return res.status(400).json({ err: "Gender field is empty !" })
        }
        else if (!course) {
            return res.status(400).json({ err: "Course field is empty !" })
        }
        else if (!coverImage) {
            return res.status(400).json({ err: "Image field is empty !" })
        }
        else if (existedEmail) {
            return res.status(400).json({ err: "Email is already exist !" })
        }
        else {
            jwt.verify(req.token, secret, async (err, data) => {
                if (err) throw err;
                console.log("createData", data);
                const employee = new emp({admin : data._id,name: name, email: email, contact: contact, designation: designation, gender: gender, course: course, coverImage: coverImage.filename })
                await employee.save()

                return res.status(201).json({ msg: "Employee added successfully !", employee })
            })
        }
    } catch (error) {
        return res.status(500).json({ err: "Data error !" })
    }
}

async function getAllData(req, res) {
    try {
        jwt.verify(req.token, secret, async (err, data) => {
            if (err) throw err;
            console.log("getData", data);
            const allEmpData = await emp.find()

            if (!allEmpData) {
                return res.send({ err: "Data is Empty !" })
            } else {
                return res.json({ msg: "Data", data: allEmpData })
            }
        })
    } catch (error) {
        return res.json({ msg: "Server error !" })
    }
}

async function deleteData(req, res) {
    try {
        jwt.verify(req.token, secret, async (err, data) => {
            if (err) throw err;
            console.log("deleteData", data);
            const id = req.params.id;

            const deletedData = await emp.findByIdAndDelete(id)
            if (deletedData) {
                return res.json({ msg: `${deletedData.name}'s data deleted successfully !`, data: deletedData })
            } else {
                return res.json({ err: "Invalid id" })
            }
        })
    } catch (error) {
        return res.json({ err: "Data not found !" })
    }
}

async function updateData(req, res) {
    try {
        const { name, email, contact, designation, gender, course, coverImage } = req.body;

        const existedEmail = await emp.findOne({ email })

        if (!name && !email && !contact && !designation && !gender && !course && !coverImage) {
            return res.status(400).json({ err: "Nothing is updated !" })
        }
        else if (!name) {
            return res.status(400).json({ err: "Name field is empty !" })
        }
        else if (!isNaN(name)) {
            return res.status(400).json({ err: "Enter only characters !" })
        }
        else if (!Number(contact)) {
            return res.status(400).json({ err: "Enter only numbers !" })
        }
        else if (Number(contact).length > 10 || Number(contact).length < 10) {
            return res.status(400).json({ err: "Please enter 10 numbers !"})
        }
        else if (!designation) {
            return res.status(400).json({ err: "Designation field is empty !" })
        }
        else if (!gender) {
            return res.status(400).json({ err: "Gender field is empty !" })
        }
        else if (!course) {
            return res.status(400).json({ err: "Course field is empty !" })
        }
        else if (existedEmail) {
            return res.status(400).json({ err: "Email is already exist !" })
        }
        else{
        jwt.verify(req.token, secret, async (err, data) => {
            if (err) throw err;
            console.log("updateData", data);
            const id = req.params.id;

            const existedEmail = await emp.findById(id)
            const updatedData = await emp.findByIdAndUpdate(id, req.body)

            if(!updatedData){
               return res.send("Invalid id !")
            }
            else if (existedEmail.email === req.body.email) {
                return res.send({ err: "Enter unique data" })
            } else {
                return res.send({ msg: `${updatedData.name}'s data updated successfully !`, data: updatedData })
            }
            
        })
                  
    }
    } catch (error) {
        return res.send({ err: "Data not found !" })
    }
}

async function adminData(req,res) {
    try {
        jwt.verify(req.token, secret, async (err, data) => {
            if (err) throw err;
            console.log("adminData", data);

            const adminData = await emp.find({admin : data._id})

            if(!adminData){
               return res.send("Invalid id !")
            }
            else {
                return res.send({ msg: `${data.name}'s data found !`, adminData })
            }
        })
    } catch (error) {
        return res.send({ err: "Data not found !" })
    }
}

async function singleData(req, res) {
    try {
        jwt.verify(req.token, secret, async (err, data) => {
            if (err) throw err;
            
            const id = req.params.id

            const singleData = await emp.findById(id)

            if(!singleData){
               return res.status(400).json({err : "Invalid id !"})
            }
            else {
                return res.status(201).json({ msg: `${singleData.name}'s data found !`, data : singleData })
            }
        })
    } catch (error) {
        return res.status(500).json({ err: "Data not found !" })
    }
}

module.exports = { createEmp, getAllData, deleteData, updateData,adminData,singleData }