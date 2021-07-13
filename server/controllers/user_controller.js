const User = require('../models/user_model')
const mongoose = require("mongoose");

createUser = async (req, res) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        profilePicture: req.file ? req.file.path : req.body.profilePicture
    });
    try {
        console.log(user)
        console.log(req.body.file)
        await user.save();
        res.status(201).json(user)
    } catch (e) {
        res.status(400).json({message: e.message})
    }
}

updateUser = async (req, res) => {
    const id = req.params.id;
    console.log(req.firstName)
    try {
        await User.updateOne({ _id: id }, {
            $set:{
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                position: req.body.position,
                gender: req.body.gender,
                dateOfBirth: req.body.dateOfBirth,
                profilePicture: req.file ? req.file.path : req.body.profilePicture
            }
        });
        res.status(200).json({message: 'User updated'})
        } catch(error){
            res.status(500).json({message: error.message});
        }
}

deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        await (await User.findByIdAndDelete(id))
        res.status(200).json({message: "User Deleted"})
    } catch (error) {
        res.json({message: error.message});
    }
}

getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
        } catch (e) {
    res.status(404).json({message: e.message})
    }
}

getUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserById
}