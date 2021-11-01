const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const verify = require('../helpers/verify');

require('dotenv').config();

// -------------------------------
// GET api/comments/:target_id
// Get the comments from the target_id in the database
// Public
// -------------------------------
router.get('/:target_id', (req, res) => {
    res.json("GET api/comments/" + req.params.target_id);
});

// -------------------------------
// POST api/comments/:target_id
// Post a comment to the specified target_id
// Private
// -------------------------------
router.post('/:target_id', verify, (req, res) => {
    res.json("POST api/comments/" + req.params.target_id);
});

// -------------------------------
// DELETE api/comments/:c_id
// Delete the specified comment based on the c_id
// Private
// -------------------------------
router.delete('/:c_id', verify, (req, res) => {
    res.json("DELETE api/comments/" + req.params.c_id);
});

// -------------------------------
// PUT api/comments/:c_id
// Update the specified comment based on the c_id
// Private
// -------------------------------
router.put('/:c_id', verify, (req, res) => {
    res.json("PUT api/comments/" + req.params.c_id);
});

module.exports = router;