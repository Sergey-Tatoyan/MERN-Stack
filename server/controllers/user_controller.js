const User = require('../models/user_model')
const mongoose = require("mongoose");

createUser = (req, res) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        profilePicture: req.file.path
    });
    user
        .save()
        .then(result => {
            res.status(201).json({
                message: "Created user successfully",
                createdUser: {
                    firstName: result.firstName,
                    lastName: result.lastName,
                    position: result.position,
                    gender: result.gender,
                    dateOfBirth: result.dateOfBirth,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/user" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

updateUser = (req, res) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propertyName] = ops.value;
    }
    User.findByIdAndUpdate({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/users/update' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

deleteUser =  (req, res) => {
    const id = req.params.id;
    User.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/user/delete',
                    body: { firstName: 'String',
                            lastName: 'String',
                            position: 'String',
                            gender: 'String',
                            dateOfBirth: 'Number' }

                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

getUserById =  (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .select('firstName lastName position gender dateOfBirth  _id profilePicture')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    user: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/user'
                    }
                });
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for User ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

getUsers = (req, res) => {
    User.find()
        .select("firstName lastName position gender dateOfBirth  _id profilePicture")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                users: docs.map(doc => {
                    return {
                        firstName: doc.firstName,
                        lastName: doc.lastName,
                        position: doc.position,
                        gender: doc.gender,
                        dateOfBirth: doc.dateOfBirth,
                        profilePicture: doc.profilePicture,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/users" + doc._id
                        }
                    };
                })
            };
            //   if (docs.length >= 0) {
            res.status(200).json(response);
            //   } else {
            //       res.status(404).json({
            //           message: 'No entries found'
            //       });
            //   }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserById
}