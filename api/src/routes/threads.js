const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const verify = require('../helpers/verify');

require('dotenv').config();

// -------------------------------
// POST api/threads
// Create a thread in the database based on the content of the request body
// Private
// -------------------------------
router.post('/', verify, (req, res) => {
    res.json("POST api/threads");
});

// -------------------------------
// GET api/threads
// Get all of the threads
// Private
// -------------------------------
router.get('/', verify, (req, res) => {
    res.json("GET api/threads");
});

// -------------------------------
// GET api/threads/:t_id
// Get aspecified thread
// Private
// -------------------------------
router.get('/:t_id', verify, (req, res) => {
    res.json("GET api/threads/" + req.params.t_id);
});

// -------------------------------
// DELETE api/threads/:t_id
// Delete the specified thread based on the list_id, and header's JWT
// Private
// -------------------------------
router.delete('/:t_id', verify, (req, res) => {
    res.json("DELETE api/threads/" + req.params.t_id);
});

// -------------------------------
// GET api/threads/own/:u_id
// Get the threads of a user
// Private
// -------------------------------
router.get('/own/:u_id', verify, (req, res) => {
    res.json("GET api/threads/own/" + req.params.u_id);
});


module.exports = router;