const express = require('express')
const mongoose = require('mongoose')
const {Account} = require('../db')
const router = express.Router()
// /api/v1/account/..

router.get('/', (req,res)=>{
    res.json("Hello Account rounter")
})

router.get('/bulk', async (req,res)=>{
    const data = await Account.find({})
    res.json(data)
})

router.get('/balance', async (req,res)=>{
    const userId = req.query.userId
    console.log(userId)
    const data = await Account.findOne({userId})
    res.json(data.balance)
})

router.post('/transfer', async(req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.body.from }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.body.from }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();

    res.json({
        message: "Transfer successful"
    });
});

module.exports = router