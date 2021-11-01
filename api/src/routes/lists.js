const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const verify = require('../helpers/verify');

require('dotenv').config();

// -------------------------------
// POST api/lists
// Create a list in the database based on the content of the request body
// Private
// -------------------------------
router.post('/', verify, (req, res) => {
    res.json("POST api/lists");
});

// -------------------------------
// GET api/lists
// Get all of the lists of a user based on the header's JWT
// Private
// -------------------------------
router.get('/', verify, (req, res) => {
    res.json("GET api/lists");
});

// -------------------------------
// GET api/lists/:list_id
// Get the specified list based on the list_id
// Private
// -------------------------------
router.get('/:list_id', verify, (req, res) => {
    res.json("GET api/lists/" + req.params.list_id);
});

// -------------------------------
// PUT api/lists/:list_id
// Edit the specified list based on the list_id, and request body content
// Private
// -------------------------------
router.put('/:list_id', verify, (req, res) => {
    res.json("PUT api/lists/" + req.params.list_id);
});

// -------------------------------
// POST api/lists/:list_id
// Add entries to the specified list based on the requests body
// Private
// -------------------------------
router.post('/:list_id', verify, (req, res) => {
    res.json("POST api/lists/" + req.params.list_id);
});

// -------------------------------
// DELETE api/lists/:list_id
// Delete the specified list based on the list_id, and header's JWT
// Private
// -------------------------------
router.delete('/:list_id', verify, (req, res) => {
    res.json("DELETE api/lists/" + req.params.list_id);
});

// -------------------------------
// DELETE api/lists/:list_id/:ld_id
// Delete the specified list entry based on the list_id and ld_id
// Private
// -------------------------------
router.delete('/:list_id/:ld_id', verify, (req, res) => {
    res.json("DELETE api/lists/" + req.params.list_id + "/" + req.params.ld_id);
});


module.exports = router;