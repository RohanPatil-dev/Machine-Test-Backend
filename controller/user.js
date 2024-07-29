const { setUser } = require("../services/services");

const user = require("../model/user")

async function signup(req, res) {
   try {
      const { username, password } = req.body

      const existedUsername = await user.findOne({username : username})
      
      console.log(req.body);

      if (!username && !password) {
         return res.status(400).json({ err: "Form is empty !" })
      } else if (!username) {
         return res.status(400).json({ err: "Username is empty !" })
      } else if (!password) {
         return res.status(400).json({ err: "Password is empty !" })
      } else if (password.length > 8) {
         return res.status(400).json({ err: "Password is over the 8 characters !" })
      } else if (password.length < 8) {
         return res.status(400).json({ err: "Password is under the 8 characters !" })
      }else if(existedUsername){
         return res.status(400).json({err : "Username is exist !"})
      } else {
         const users = new user({ username: username, password: password })
         await users.save()

         return res.status(201).json({ msg: "Data registered successfully !", users })
      }
   } catch (error) {
      return res.status(500).json({ err: "Invalid data !" })
   }
}


async function signin(req, res) {
   try {
      const { username, password } = req.body;

      console.log(req.body);

      if (!username && !password) {
         return res.status(400).json({ err: "Form is empty !" })
      } else if (!username) {
         return res.status(400).json({ err: "Username is empty !" })
      } else if (!password) {
         return res.status(400).json({ err: "Password is empty !" })
      } else if (password.length > 8) {
         return res.status(400).json({ err: "Password is over the 8 characters !" })
      } else if (password.length < 8) {
         return res.status(400).json({ err: "Password is under the 8 characters !" })
      } else {
         const users = await user.findOne({ username: username, password: password });

         const token = setUser(users);
         console.log(token);
         return res.status(201).json({ msg: "Login Successfully", user: users, token })
      }
   } catch (error) {
      return res.status(500).json({ err: "Invalid username and password !" })
   }
}

module.exports = { signup, signin }