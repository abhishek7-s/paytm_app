const express = require('express');
const zod = require("zod");
const router = express.Router();
const {User, Account} = require('../db')
const {JWT_SECRET} = require('../config')
const jwt = require('jsonwebtoken')
const {authMiddleware} = require('../middleware')
// /api/v1/user/..

const signupBody = zod.object({
    username: zod.string().email().trim(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(4).trim(),
})

const signinBody = zod.object({
    username: zod.string().email().trim(),
    password: zod.string().min(4).trim(),
})

router.post('/signup' , async (req , res)=>{
    const body = req.body
    const {success} = signupBody.safeParse(body)
    if (!success) {
        res.status(411).json({
            message : "Invalid inputs"
        })
        return
    }
    
    const userExist = await User.findOne({
        username: body.username
    })

    if (userExist) {
        res.status(411).json({
            message: "User Already exists"
        })
        return
    }

    const user = await User.create({
        username: body.username,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password
    })
    const username = user.username
    const userId = user._id

    console.log(user)
    try {
        await Account.create({
            userId,
            balance: 1 + Math.random() * 1000
        })
        const token = jwt.sign({
            username,   
            userId
        }, JWT_SECRET)
    
        res.status(200).json({
            token: token 
        })
    } catch (error) {
        res.json("something wrong")
    }
    
})

router.post('/signin', async (req,res)=>{
    const body = req.body
    const { success } = signinBody.safeParse(body)

    if (!success) {
        res.status(411).json({
            message: "Invlaid Inputs"
        })
        return
    }

    const user = await User.findOne({
        username: body.username,
        password: body.password
    });

    if (!user) {
        res.status(411).json({
            message: "User Not Found"
        })
        return
    }

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    res.json("Something Wrong")

})

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

		await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})


router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username.toUpperCase(),
            firstName: user.firstName.toUpperCase(),
            lastName: user.lastName.toUpperCase(),
            _id: user._id
        }))
    })
})

router.get("/info" ,async (req,res)=>{
    const token = req.query.token;
    // console.log( token)
    try {
        // console.log("hello")
        const decoded = jwt.verify(token, JWT_SECRET);
        let _id = decoded.userId
        const data = await User.findOne({_id})
        // console.log(data.firstName , )
        const info = {
            "firstName":data.firstName.toUpperCase() ,
            "lastName":data.lastName.toUpperCase(),
            "username":data.username,
            "userId": _id
        }
        res.json(info)
    } catch (error) {
        console.log("decode error")
        res.json("error")
    }
    
})


module.exports = router;