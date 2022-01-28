const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const verify = require('../helpers/verify');
const verify_check = require('../helpers/verify_check');
const isEmpty = require('../helpers/isEmpty');
const getVisibility = require('../helpers/getVisibility');
const checkIfFriends = require('../helpers/checkIfFriends');
const commentValidations = require('../helpers/validations/commentValidations');
const cv = new commentValidations();
const cq = require('../helpers/queries/commentQueries');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');

require('dotenv').config();

// -------------------------------
// GET api/comments/:target_id
// Get the comments from the target_id in the database
// Public
// -------------------------------
router.get('/:target_id', verify_check, (req, res) => {
    const target_id = req.params.target_id;
    const errors = cv.commentGetCommentsValidator(target_id);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        let id = 0;
        if(req.jwt){
            id = req.jwt.id;
        }

        db.query(cq.sql_getComments, [id,target_id], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_getComments query error";
                errors.log = err1;

                res.status(400).json(errors);
            }else{
                res.json(results1);
            }
        });
    }
});
//get api/comments/test/xddd
/*router.get('/manage/like', (req, res) => {
    // "INC_LIKE" = increase like
    // "DEC_LIKE" = decrease like
    // "INC_DISLIKE" = increase dislike
    // "DEC_DISLIKE" = decrease dislike
    //console.log("I got called");
    //Comment Exists CHECK NEEDED
    db.query(cq.sql_manageCommentLikes, [1,"INC_DISLIKE"], (err1, results1) => {
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
    });
});*/

// -------------------------------
// POST api/comments/:target_id
// Post a comment to the specified target_id
// Private
// -------------------------------
router.post('/:target_id', verify, (req, res) => {
    const user_id = req.jwt.id;
    const target_id = req.params.target_id;
    const message = req.body.message;
    const errors = cv.commentPostCommentValidator(user_id, target_id, message);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(cq.sql_postComment, [user_id, target_id, message], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_postComment query error";
                errors.log = err1;

                res.status(400).json(errors);
            }else{
                if(results1.affectedRows == 1){
                    res.json({success: "Successfull commenting"});
                }else{
                    errors.query = "Commenting error";

                    res.status(400).json(errors);
                }
            }
        });
    }
});

// -------------------------------
// DELETE api/comments/:c_id
// Delete the specified comment based on the c_id
// Private
// -------------------------------
router.delete('/:c_id', verify, (req, res) => {
    const user_id = req.jwt.id;
    const c_id = req.params.c_id;
    const errors = cv.commentPostCommentValidator(user_id, c_id);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        db.query(cq.sql_checkIfCommentOwner, [c_id, user_id], (err1, results1) => {
            if(err1){
                console.log(err1);
                errors.query = "sql_checkIfCommentOwner query error";
                errors.log = err1;

                res.status(400).json(errors);
            }else{
                if(results1.length == 1){
                    db.query(cq.sql_deleteComment, [c_id, user_id, c_id], (err2, results2) => {
                        if(err2){
                            console.log(err2);
                            errors.query = "sql_deleteComment query error";
                            errors.log = err2;
            
                            res.status(400).json(errors);
                        }else{
                            if(results2[1].affectedRows == 1){
                                res.json({success: "Successful comment delete"});
                            }else{
                                errors.query = "Comment delete error";
            
                                res.status(400).json(errors);
                            }
                        }
                    });
                }else{
                    errors.query = "No such comment with you as an owner";

                    res.status(400).json(errors);
                }
            }
        });
    }
});

module.exports = router;