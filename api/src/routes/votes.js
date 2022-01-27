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
const cq = require('../helpers/queries/commentQueries');

require('dotenv').config();

// -------------------------------
// POST api/votes/like
// Like or dislike a comment
// Private
// -------------------------------
router.post('/like', verify, (req, res) => {
    // INC_LIKE, DEC_LIKE, INC_DISLIKE, DEC_DISLIKE
    // Dislike = 0, Like = 1
    const user_id = req.jwt.id;
    const {target} = req.body;
    const errors = {};// = vv.votePostLikeValidator(user_id, req.body);
    //TODO ERROR HANDLING
    const like = parseInt(req.body.like);
    const target_id = req.body.target_id.toString();

    console.log(req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(vq.sql_getLike, [user_id,target_id], (err1, results1) => {
            //console.log("Inside querry");
            if(err1){
                console.log(err1);
                errors.query = "sql_getLike query error";
                errors.log = err1;
        
                res.status(400).json(errors);
            }else{
                if(results1.length === 0){
                    //console.log(results1);
                    if(target === "COMMENT"){
                        let type = "";
                        if(like === 0){
                            type = "INC_DISLIKE";
                        }else{
                            type = "INC_LIKE";
                        }

                        db.query(vq.sql_postLike, [user_id,target_id,like], (err2, results2) => {
                            if(err2){
                                console.log(err2);
                                errors.query = "sql_postLike query error";
                                errors.log = err2;
                        
                                res.status(400).json(errors);
                            }else{
                                db.query(cq.sql_manageCommentLikes, [target_id,type], (err3, results3) => {
                                    if(err3){
                                        console.log(err3);
                                        errors.query = "sql_manageCommentLikes query error";
                                        errors.log = err3;
                                
                                        res.status(400).json(errors);
                                    }else{
                                        if(results3[2][0]){
                                            console.log(results3[2][0]);
                                            errors.query = results3[2][0].message;
                                            
                                        }else{
                                            if(results3[3][0].Q_STATUS === 1){
                                                res.json({success: "Successfull likes management"})
                                            }else if(results3[3][0].Q_STATUS === 2){
                                                res.json({success: "Couldnt lower likes/dislikes under 0"})
                                            }else{
                                                errors.query = "Hehe something wrong";
                                                res.status(400).json(errors);
                                            }
                                        }
                                        
                                    }
                                });
                            }
                        });

                    }else if(target === "THREAD" || target === "THREADS"){
                        
                        let type = "";
                        if(like === 0){
                            type = "INC_DISLIKE";
                        }else{
                            type = "INC_LIKE";
                        }
                        console.log("THREAD THREADS POST: " + type);
                        db.query(vq.sql_postLike, [user_id,target_id,like], (err2, results2) => {
                            if(err2){
                                console.log(err2);
                                errors.query = "sql_postLike query error";
                                errors.log = err2;
                        
                                res.status(400).json(errors);
                            }else{
                                db.query(cq.sql_manageThreadLikes, [target_id,type], (err3, results3) => {
                                    if(err3){
                                        console.log(err3);
                                        errors.query = "sql_manageThreadLikes query error";
                                        errors.log = err3;
                                
                                        res.status(400).json(errors);
                                    }else{
                                        if(results3[2][0]){
                                            console.log(results3[2][0]);
                                            errors.query = results3[2][0].message;
                                            
                                        }else{
                                            
                                            console.log(results3[3][0]);//THIS
                                            if(results3[3][0].Q_STATUS === 1){
                                                res.json({success: "Successfull likes management"})
                                            }else if(results3[3][0].Q_STATUS === 2){
                                                res.json({success: "Couldnt lower likes/dislikes under 0"})
                                            }else{
                                                errors.query = "Hehe something wrong";
                                                res.status(400).json(errors);
                                            }
                                        }
                                        
                                    }
                                });
                            }
                        });
                    }
                }else{
                    if(like === results1[0].like){
                        //Already liked/disliked, but clicked on the liked/disliked
                        if(target === "COMMENT"){
                            let type = "";
                            if(like === 0){
                                type = "DEC_DISLIKE";
                            }else{
                                type = "DEC_LIKE";
                            }

                            db.query(vq.sql_deleteLike, [user_id,target_id], (err2, results2) => {
                                //console.log("Inside querry");
                                if(err2){
                                    console.log(err2);
                                    errors.query = "sql_getLike query error";
                                    errors.log = err2;
                            
                                    res.status(400).json(errors);
                                }else{
                                    db.query(cq.sql_manageCommentLikes, [target_id,type], (err3, results3) => {
                                        if(err3){
                                            console.log(err3);
                                            errors.query = "sql_manageCommentLikes query error";
                                            errors.log = err3;
                                    
                                            res.status(400).json(errors);
                                        }else{
                                            if(results3[2][0]){
                                                console.log(results3[2][0]);
                                                errors.query = results3[2][0].message;
                                                
                                            }else{
                                                if(results3[3][0].Q_STATUS === 1){
                                                    res.json({success: "Successfull likes management"})
                                                }else if(results3[3][0].Q_STATUS === 2){
                                                    res.json({success: "Couldnt lower likes/dislikes under 0"})
                                                }else{
                                                    errors.query = "Hehe something wrong";
                                                    res.status(400).json(errors);
                                                }
                                            }
                                            
                                        }
                                    });
                                }
                            });
                        }else if(target === "THREAD" || target === "THREADS"){
                            let type = "";
                            if(like === 0){
                                type = "DEC_DISLIKE";
                            }else{
                                type = "DEC_LIKE";
                            }
                            console.log("THREAD THREADS DELETE: " + type);//THIS
                            db.query(vq.sql_deleteLike, [user_id,target_id], (err2, results2) => {
                                //console.log("Inside querry");
                                if(err2){
                                    console.log(err2);
                                    errors.query = "sql_getLike query error";
                                    errors.log = err2;
                            
                                    res.status(400).json(errors);
                                }else{
                                    console.log("THREAD THREADS DELETE INNER: " + type);//THIS
                                    db.query(cq.sql_manageThreadLikes, [target_id,type], (err3, results3) => {
                                        if(err3){
                                            console.log(err3);
                                            errors.query = "sql_manageThreadLikes query error";
                                            errors.log = err3;
                                    
                                            res.status(400).json(errors);
                                        }else{
                                            if(results3[2][0]){
                                                console.log(results3[2][0]);
                                                errors.query = results3[2][0].message;
                                                
                                            }else{
                                                console.log(results3[3][0]);//THIS
                                                if(results3[3][0].Q_STATUS === 1){
                                                    res.json({success: "Successfull likes management"})
                                                }else if(results3[3][0].Q_STATUS === 2){
                                                    res.json({success: "Couldnt lower likes/dislikes under 0"})
                                                }else{
                                                    errors.query = "Hehe something wrong";
                                                    res.status(400).json(errors);
                                                }
                                            }
                                            
                                        }
                                    });
                                }
                            });
                        }
                    }else{
                        //Already liked/disliked, but clicked on the disliked/liked
                        if(target === "COMMENT"){
                            let type1 = "";
                            let type2 = "";
                            if(like === 0){
                                type1 = "INC_DISLIKE";
                                type2 = "DEC_LIKE";
                            }else{
                                type1 = "INC_LIKE";
                                type2 = "DEC_DISLIKE";
                            }

                            db.query(vq.sql_updateLike, [like,user_id,target_id], (err2, results2) => {
                                //console.log("Inside querry");
                                if(err2){
                                    console.log(err2);
                                    errors.query = "sql_getLike query error";
                                    errors.log = err2;
                            
                                    res.status(400).json(errors);
                                }else{
                                    db.query(cq.sql_manageCommentLikes, [target_id,type1], (err3, results3) => {
                                        if(err3){
                                            console.log(err3);
                                            errors.query = "sql_manageCommentLikes query error";
                                            errors.log = err3;
                                    
                                            res.status(400).json(errors);
                                        }else{
                                            if(results3[2][0]){
                                                console.log(results3[2][0]);
                                                errors.query = results3[2][0].message;
                                                
                                            }else{
                                                if(results3[3][0].Q_STATUS === 1 || results3[3][0].Q_STATUS === 2){
                                                    db.query(cq.sql_manageCommentLikes, [target_id,type2], (err4, results4) => {
                                                        if(err4){
                                                            console.log(err4);
                                                            errors.query = "sql_manageCommentLikes query error";
                                                            errors.log = err4;
                                                    
                                                            res.status(400).json(errors);
                                                        }else{
                                                            if(results4[2][0]){
                                                                console.log(results4[2][0]);
                                                                errors.query = results4[2][0].message;
                                                                
                                                            }else{
                                                                if(results4[3][0].Q_STATUS === 1 || results4[3][0].Q_STATUS === 2){
                                                                    res.json({success: "Successfull likes management"})
                                                                }else if(results4[3][0].Q_STATUS === 2){
                                                                    res.json({success: "Couldnt lower likes/dislikes under 0"})
                                                                }else{
                                                                    errors.query = "Hehe something wrong";
                                                                    res.status(400).json(errors);
                                                                }
                                                            }
                                                            
                                                        }
                                                    });
                                                }else{
                                                    errors.query = "Hehe something wrong";
                                                    res.status(400).json(errors);
                                                }
                                            }
                                            
                                        }
                                    });
                                }
                            });
                        }else if(target === "THREAD" || target === "THREADS"){
                            let type1 = "";
                            let type2 = "";
                            if(like === 0){
                                type1 = "INC_DISLIKE";
                                type2 = "DEC_LIKE";
                            }else{
                                type1 = "INC_LIKE";
                                type2 = "DEC_DISLIKE";
                            }
                            console.log("THREAD THREADS POST: " + type1 + " | " + type2);

                            db.query(vq.sql_updateLike, [like,user_id,target_id], (err2, results2) => {
                                //console.log("Inside querry");
                                if(err2){
                                    console.log(err2);
                                    errors.query = "sql_getLike query error";
                                    errors.log = err2;
                            
                                    res.status(400).json(errors);
                                }else{
                                    db.query(cq.sql_manageThreadLikes, [target_id,type1], (err3, results3) => {
                                        if(err3){
                                            console.log(err3);
                                            errors.query = "sql_manageThreadLikes query error";
                                            errors.log = err3;
                                    
                                            res.status(400).json(errors);
                                        }else{
                                            if(results3[2][0]){
                                                console.log(results3[2][0]);
                                                errors.query = results3[2][0].message;
                                                
                                            }else{
                                                
                                                console.log(results3[3][0]);//THIS
                                                if(results3[3][0].Q_STATUS === 1 || results3[3][0].Q_STATUS === 2){
                                                    db.query(cq.sql_manageThreadLikes, [target_id,type2], (err4, results4) => {
                                                        if(err4){
                                                            console.log(err4);
                                                            errors.query = "sql_manageThreadLikes query error";
                                                            errors.log = err4;
                                                    
                                                            res.status(400).json(errors);
                                                        }else{
                                                            if(results4[2][0]){
                                                                console.log(results4[2][0]);
                                                                errors.query = results4[2][0].message;
                                                                
                                                            }else{
                                                                
                                                                console.log(results4[3][0]);//THIS
                                                                if(results4[3][0].Q_STATUS === 1 || results4[3][0].Q_STATUS === 2){
                                                                    res.json({success: "Successfull likes management"})
                                                                }else if(results4[3][0].Q_STATUS === 2){
                                                                    res.json({success: "Couldnt lower likes/dislikes under 0"})
                                                                }else{
                                                                    errors.query = "Hehe something wrong";
                                                                    res.status(400).json(errors);
                                                                }
                                                            }
                                                            
                                                        }
                                                    });
                                                }else{
                                                    errors.query = "Hehe something wrong";
                                                    res.status(400).json(errors);
                                                }
                                            }
                                            
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            }
        });
    }
});

/*db.query(cq.sql_manageCommentLikes, [1,"INC_DISLIKE"], (err1, results1) => {
    //console.log("Inside querry");
    if(err1){
        console.log(err1);
        errors.query = "sql_manageCommentLikes query error";
        errors.log = err1;

        res.status(400).json(errors);
    }else{
        //console.log("Inside else");
        if(results1[2][0]){
            console.log(results1[2][0]);
            errors.query = results1[2][0].message;
            
        }else{
            if(results1[3][0].Q_STATUS === 1){
                res.json({success: "Successfull likes management"})
            }else if(results1[3][0].Q_STATUS === 2){
                res.json({success: "Couldnt lower likes/dislikes under 0"})
            }else{
                errors.query = "Hehe something wrong";
                res.status(400).json(errors);
            }
        }
        
    }
});*/

/*
db.query(vq.sql_getLike, [user_id,target_id], (errX, resultsX) => {
            //console.log("Inside querry");
            if(errX){
                console.log(errX);
                errors.query = "sql_getLike query error";
                errors.log = errX;
        
                res.status(400).json(errors);
            }else{
            }
        });
*/

// -------------------------------
// GET api/votes/like/:target_id
// Get the likes of a comment
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