const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const verify = require('../helpers/verify');
const verify_check = require('../helpers/verify_check');
const isEmpty = require('../helpers/isEmpty');
const getVisibility = require('../helpers/getVisibility');
const checkIfFriends = require('../helpers/checkIfFriends');
const commentValidations = require('../helpers/validations/commentValidations');
const cv = new commentValidations();
//const cq = require('../helpers/queries/commentQueries');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');

const commentClass = require('../helpers/queries/commentQueries');
const cc = new commentClass();

require('dotenv').config();

// GET api/comments/:target_id
// Megadott elemhez(fórum, manga, manga fejezet) tartozó kommenteket adja vissza
router.get('/:target_id', verify_check, async (req, res) => {
    const target_id = req.params.target_id;
    const errors = cv.commentGetCommentsValidator(target_id);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        let id = 0;
        if(req.jwt){
            id = req.jwt.id;
        }

        try {
            const commentResults = await cc.getComments(id, target_id);

            res.json(commentResults);

        } catch (error) {
            res.status(400).json(error);
        }
    }
});

// POST api/comments/:target_id
// Megadott elemhez ad hozzá egy kommentet
router.post('/:target_id', verify, async (req, res) => {
    const user_id = req.jwt.id;
    const target_id = req.params.target_id;
    const message = req.body.message;
    const errors = cv.commentPostCommentValidator(user_id, target_id, message);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const postCommentResult = await cc.postComment(user_id, target_id, message);

            if(postCommentResult.affectedRows == 1){
                res.json({success: "Successfull commenting"});
            }else{
                errors.query = "Commenting error";

                res.status(400).json(errors);
            }

        } catch (error) {
            res.status(400).json(error);
        }
    }
});

// DELETE api/comments/:c_id
// Megadott kommentet törli ha a kezdeményező a tulaj
router.delete('/:c_id', verify, async (req, res) => {
    const user_id = req.jwt.id;
    const c_id = req.params.c_id;
    const errors = cv.commentPostCommentValidator(user_id, c_id);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const commentOwnerCheckResult = await cc.checkIfCommentOwner(c_id, user_id);
        
            if(commentOwnerCheckResult.length == 1){

                const deleteCommentResult = await cc.deleteComment(c_id, user_id);
                
                if(deleteCommentResult[1].affectedRows == 1){
                    res.json({success: "Successful comment delete"});
                }else{
                    errors.query = "Comment delete error";

                    res.status(400).json(errors);
                }

            }else{
                errors.query = "No such comment with you as an owner";

                res.status(400).json(errors);
            }
        
        } catch (error) {
            res.status(400).json(error);
        }
    }
});

module.exports = router;