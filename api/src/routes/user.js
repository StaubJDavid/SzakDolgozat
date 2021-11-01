const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const verify = require('../helpers/verify');

require('dotenv').config();

// -------------------------------
// GET api/user
// Get the current user based on the authorization header
// Private
// -------------------------------
router.get('/', verify, (req, res) => {
    res.json("GET api/user");
});

// -------------------------------
// GET api/user/:u_id
// Get the specified user based on u_id
// Private
// -------------------------------
router.get('/:u_id', verify, (req, res) => {
    res.json("GET api/user/" + req.params.u_id);
});

// -------------------------------
// POST api/user/details
// Add details to the database(Bio,liked manga, disliked manga, friends)
// Private
// -------------------------------
router.post('/details', verify, (req, res) => {
    res.json("GET api/user/details");
});

// -------------------------------
// DELETE api/user/details/ud_id
// Delete the specified detail from the database(Bio,liked manga, disliked manga, friends)
// Private
// -------------------------------
router.delete('/details/:ud_id', verify, (req, res) => {
    res.json("DELETE api/user/details/" + req.params.ud_id);
});

// -------------------------------
// PUT api/user/details/ud_id
// Edit the specified detail in the database(Bio,liked manga, disliked manga, friends)
// Private
// -------------------------------
router.put('/details/:ud_id', verify, (req, res) => {
    res.json("PUT api/user/details/" + req.params.ud_id);
});

// -------------------------------
// POST api/user/friend-request
// Send a friend request(Add it to the database) based on the header, and request body
// Private
// -------------------------------
router.post('/friend-request', verify, (req, res) => {
    res.json("POST api/user/friend-request");
});

// -------------------------------
// DELETE api/user/friend-request
// Delete/refuse a friend request based on the request body
// Private
// -------------------------------
router.delete('/friend-request', verify, (req, res) => {
    res.json("DELETE api/user/friend-request");
});

// -------------------------------
// GET api/user/friend-request
// Gets every friend request the user has based on the authorization header
// Private
// -------------------------------
router.get('/friend-request', verify, (req, res) => {
    res.json("GET api/user/friend-request");
});

module.exports = router;