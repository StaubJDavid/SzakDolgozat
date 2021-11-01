const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const verify = require('../helpers/verify');

require('dotenv').config();

// -------------------------------
// POST api/votes/like/:c_id
// Like or dislike a comment
// Private
// -------------------------------
router.post('/like/:c_id', verify, (req, res) => {
    res.json("POST api/votes/like/" + req.params.c_id);
});

// -------------------------------
// GET api/votes/like/:c_id
// Get the ratings of a comment
// Public
// -------------------------------
router.get('/like/:c_id', (req, res) => {
    res.json("GET api/votes/like/" + req.params.c_id);
});

// -------------------------------
// GET api/votes/rate/:m_id
// Get the ratings of a manga
// Public
// -------------------------------
router.get('/rate/:m_id', (req, res) => {
    res.json("GET api/rate/" + req.params.m_id); 
});

// -------------------------------
// POST api/votes/rate/:m_id
// Add a score to a manga based on the m_id, request body, authorization header
// Private
// -------------------------------
router.post('/rate/:m_id', verify, (req, res) => {
    res.json("POST api/rate/" + req.params.m_id);
});

// -------------------------------
// PUT api/votes/rate/:m_id
// Edit the score of a manga based on the m_id, request body, authorization header
// Private
// -------------------------------
router.put('/rate/:m_id', verify, (req, res) => {
    res.json("PUT api/rate/" + req.params.m_id);
});

// -------------------------------
// DELETE api/votes/rate/:m_id
// Delete your rating of a manga based on the m_id, request body, authorization header
// Private
// -------------------------------
router.delete('/rate/:m_id', verify, (req, res) => {
    res.json("DELETE api/rate/" + req.params.m_id); 
});


module.exports = router;