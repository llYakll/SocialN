const express = require('express');
const User = require('../models/User');
const user = express.Router();
/*
Download dependancies.
  npm install
  then
Navigate to root directory in your terminal and type
  node server.js
*/
/* 
get all users *works
set a GET route in insomnia with
  http://localhost:3000/api/users
expected return is an array of users
*/
user.get('/', (req, res) => {
  User.find().populate('thoughts friends')
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

// get a single user by ID *works 
//  http://localhost:3000/api/users/662d7e84e9655ca7e70dffdc <--your actual _id will be different.
user.get('/:id', (req, res) => {
  User.findById(req.params.id).populate('thoughts friends')
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => res.status(500).json(err));
});

// create a new user *works
/*
{
  "username": "genericuser",
  "email": "genericuser@example.com",
  "password": "password123"
}
*/
user.post('/', (req, res) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(400).json(err));
});

// update a user by ID *works
// just edit the generic nonsense you enter above and resubmit
user.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => res.status(400).json(err));
});

// delete a user by ID *works
user.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted' });
    })
    .catch(err => res.status(500).json(err));
});

// add a friend *works
//  662d7e84e9655ca7e70dffdc/friends/662d7e95e9655ca7e70dffde
// expected return is user 1 now has user 2 as a friend
user.post('/:userId/friends/:friendId', (req, res) => {
  User.findByIdAndUpdate(
    req.params.userId,
    { $addToSet: { friends: req.params.friendId } },
    { new: true }
  )
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
});

// remove a friend *works
// user 1 changed his mind.
user.delete('/:userId/friends/:friendId', (req, res) => {
  User.findByIdAndUpdate(
    req.params.userId,
    { $pull: { friends: req.params.friendId } },
    { new: true }
  )
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
});

module.exports = user;