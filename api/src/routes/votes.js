const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const verify = require('../helpers/verify');
const isEmpty = require('../helpers/isEmpty');
const getVisibility = require('../helpers/getVisibility');
const checkIfFriends = require('../helpers/checkIfFriends');
const voteValidations = require('../helpers/validations/voteValidations');
const vv = new voteValidations();
const vq = require('../helpers/queries/voteQueries');

require('dotenv').config();

// -------------------------------
// POST api/votes/like/:c_id
// Like or dislike a comment
// Private
// -------------------------------
router.post('/like', verify, (req, res) => {
    const user_id = req.jwt.id;
    const {target_id, like} = req.body;
    const errors = vv.votePostLikeValidator(user_id, req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(vq.sql_getLike, [user_id, target_id], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_getLike query error";
                errors.log = err1;

                res.status(400).json(errors);
            }else{
                if(results1.length == 1){
                    if(results1.like == like){
                        db.query(vq.sql_deleteLike, [user_id, target_id], (err2, results2) => {
                            if(err2){
                                console.log(err2);
                                errors.query = "sql_deleteLike query error";
                                errors.log = err2;
                
                                res.status(400).json(errors);
                            }else{
                                if(results2.affectedRows == 1){
                                    res.json({success: "Successful like or dislike delete"});
                                }else{
                                    errors.query = "Like error delete";
                
                                    res.status(400).json(errors);
                                }
                            }
                        });
                    }else{
                        db.query(vq.sql_updateLike, [like, user_id, target_id], (err2, results2) => {
                            if(err2){
                                console.log(err2);
                                errors.query = "sql_updateLike   query error";
                                errors.log = err2;
                
                                res.status(400).json(errors);
                            }else{
                                if(results2.affectedRows == 1){
                                    res.json({success: "Successful like or dislike update"});
                                }else{
                                    errors.query = "Like error update";
                
                                    res.status(400).json(errors);
                                }
                            }
                        });
                    }
                }else{
                    db.query(vq.sql_postLike, [user_id, target_id, parseInt(like)], (err2, results2) => {
                        if(err2){
                            console.log(err2);
                            errors.query = "sql_postLike query error";
                            errors.log = err2;
            
                            res.status(400).json(errors);
                        }else{
                            if(results2.affectedRows == 1){
                                res.json({success: "Successful like or dislike"});
                            }else{
                                errors.query = "Like error";
            
                                res.status(400).json(errors);
                            }
                        }
                    });
                }
            }
        });
    }
});

// -------------------------------
// GET api/votes/like/:c_id
// Get the ratings of a comment
// Public
// -------------------------------
router.get('/like/:target_id', (req, res) => {
    const target_id = req.params.target_id;
    const errors = vv.voteGetAllLikesValidator(target_id);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(vq.sql_getAllLikes, [target_id, target_id, target_id], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_getAllLikes query error";
                errors.log = err1;

                res.status(400).json(errors);
            }else{
                if(results1[2].length == 1){
                    res.json(results1[2][0]);
                }else{
                    errors.query = "Get all likes error";

                    res.status(400).json(errors);
                }
            }
        });
    }
});

// -------------------------------
// GET api/votes/rate/:m_id
// Get the ratings of a manga
// Public
// -------------------------------
router.get('/rate/:manga_id', (req, res) => {
    const manga_id = req.params.manga_id;
    const errors = vv.voteGetRatingsValidator(manga_id);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(vq.sql_getMangaRatings, [manga_id], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_getMangaRatings query error";
                errors.log = err1;

                res.status(400).json(errors);
            }else{
                if(results1.length == 1){
                    res.json(results1[0]);
                }else{
                    errors.query = "Get all likes error";

                    res.status(400).json(errors);
                }
            }
        });
    }
});

// -------------------------------
// POST api/votes/rate/:m_id
// Add a score to a manga based on the m_id, request body, authorization header
// Private
// -------------------------------
router.post('/rate/:manga_id', verify, (req, res) => {
    const user_id = req.jwt.id;
    const manga_id = req.params.manga_id;
    const {manga_name, score} = req.body;
    const errors = vv.votePostRatingValidator(user_id, manga_id, req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(vq.sql_checkBeforeMangaRatingPost, [user_id, manga_id], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_checkBeforeMangaRatingPost query error";
                errors.log = err1;

                res.status(400).json(errors);
            }else{
                if(results1.length == 0){
                    db.query(vq.sql_postMangaRating, [user_id, manga_name, manga_id, parseInt(score)], (err2, results2) => {
                        if(err2){
                            console.log(err2);
                            errors.query = "sql_postMangaRating query error";
                            errors.log = err2;
            
                            res.status(400).json(errors);
                        }else{
                            if(results2.affectedRows == 1){
                                res.json({success: "Sikeres manga ertekeles"});
                            }else{
                                errors.query = "sql_postMangaRating error";
            
                                res.status(400).json(errors);
                            }
                        }
                    });
                }else{
                    errors.query = "You already rated this manga";

                    res.status(400).json(errors);
                }
            }
        });
    }
});

// -------------------------------
// PUT api/votes/rate/:m_id
// Edit the score of a manga based on the m_id, request body, authorization header
// Private
// -------------------------------
router.put('/rate/:manga_id', verify, (req, res) => {
    const user_id = req.jwt.id;
    const manga_id = req.params.manga_id;
    const {manga_name, score} = req.body;
    const errors = vv.votePostRatingValidator(user_id, manga_id, req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(vq.sql_updateMangaRating, [score, user_id, manga_id], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_updateMangaRating query error";
                errors.log = err1;

                res.status(400).json(errors);
            }else{
                if(results1.affectedRows == 1){
                    res.json({success: "Sikeres manga ertekeles update"});
                }else{
                    errors.query = "Update rating error";

                    res.status(400).json(errors);
                }
            }
        });
    }
});

// -------------------------------
// DELETE api/votes/rate/:m_id
// Delete your rating of a manga based on the m_id, request body, authorization header
// Private
// -------------------------------
router.delete('/rate/:manga_id', verify, (req, res) => {
    const user_id = req.jwt.id;
    const manga_id = req.params.manga_id;
    const errors = vv.voteDeleteRatingValidator(user_id, manga_id);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(vq.sql_deleteMangaRating, [user_id, manga_id], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_deleteMangaRating query error";
                errors.log = err1;

                res.status(400).json(errors);
            }else{
                if(results1.affectedRows == 1){
                    res.json({success: "Sikeres manga ertekeles update"});
                }else{
                    errors.query = "Delete rating error";

                    res.status(400).json(errors);
                }
            }
        });
    }
});


module.exports = router;