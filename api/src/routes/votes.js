const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const verify = require('../helpers/verify');
const isEmpty = require('../helpers/isEmpty');
const getVisibility = require('../helpers/getVisibility');
const checkIfFriends = require('../helpers/checkIfFriends');

const voteValidations = require('../helpers/validations/voteValidations');
const vv = new voteValidations();


//const vq = require('../helpers/queries/voteQueries');
//const cq = require('../helpers/queries/commentQueries');
const verify_check = require('../helpers/verify_check');

const commentClass = require('../helpers/queries/commentQueries');
const cc = new commentClass();

const voteClass = require('../helpers/queries/voteQueries');
const vc = new voteClass();

require('dotenv').config();


// POST api/votes/like
// Lájkolja, dislikeolja a megadott fúrum threadet vagy kommentet

//Először meghívom a hitelesítés middlewaret
//ha nem sikeres a hitelesítés akkor hibát ad vissza a kérőnek

//Ha sikeres akkor a middlewareben lévő next() metódussal tovább megyünk a paraméter listában lévő következő metódusra
router.post('/like', verify, async (req, res) => {
    // INC_LIKE, DEC_LIKE, INC_DISLIKE, DEC_DISLIKE
    // Dislike = 0, Like = 1
    const user_id = req.jwt.id;
    const {target} = req.body;

    const errors = {};// = vv.votePostLikeValidator(user_id, req.body);
    //TODO ERROR HANDLING
    const like = parseInt(req.body.like);
    const target_id = req.body.target_id.toString();

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            
            //SQL utasítás meghívása
            const getLikeResults = await vc.getLike(user_id,target_id);

            if(getLikeResults.length === 0){
                //console.log(getLikeResults);
                if(target === "COMMENT"){
                    let type = "";
                    if(like === 0){
                        type = "INC_DISLIKE";
                    }else{
                        type = "INC_LIKE";
                    }

                    const postLikeResult = await vc.postLike(user_id,target_id,like);
                    const manageLikeResult = await cc.manageCommentLikes(target_id,type);

                    if(manageLikeResult[2][0]){
                        console.log(manageLikeResult[2][0]);
                        errors.query = manageLikeResult[2][0].message;
                        
                    }else{
                        if(manageLikeResult[3][0].Q_STATUS === 1){
                            res.json({success: "Successfull likes management"})
                        }else if(manageLikeResult[3][0].Q_STATUS === 2){
                            res.json({success: "Couldnt lower likes/dislikes under 0"})
                        }else{
                            errors.query = "Hehe something wrong";
                            res.status(400).json(errors);
                        }
                    }

                }else if(target === "THREAD" || target === "THREADS"){
                    
                    let type = "";
                    if(like === 0){
                        type = "INC_DISLIKE";
                    }else{
                        type = "INC_LIKE";
                    }
                    
                    const postLikeResult = await vc.postLike(user_id,target_id,like);
                    const manageLikeResult = await cc.manageThreadLikes(target_id,type);

                    console.log("THREAD THREADS POST: " + type);

                    if(manageLikeResult[2][0]){
                        console.log(manageLikeResult[2][0]);
                        errors.query = manageLikeResult[2][0].message;
                        
                    }else{
                        console.log(manageLikeResult[3][0]);//THIS
                        if(manageLikeResult[3][0].Q_STATUS === 1){
                            res.json({success: "Successfull likes management"})
                        }else if(manageLikeResult[3][0].Q_STATUS === 2){
                            res.json({success: "Couldnt lower likes/dislikes under 0"})
                        }else{
                            errors.query = "Hehe something wrong";
                            res.status(400).json(errors);
                        }
                    }
                }
            }else{
                if(like === getLikeResults[0].like){
                    //Already liked/disliked, but clicked on the liked/disliked
                    if(target === "COMMENT"){
                        let type = "";
                        if(like === 0){
                            type = "DEC_DISLIKE";
                        }else{
                            type = "DEC_LIKE";
                        }

                        const deleteLikeResult = await vc.deleteLike(user_id,target_id);
                        const manageLikeResult = await cc.manageCommentLikes(target_id,type);

                        if(manageLikeResult[2][0]){
                            console.log(manageLikeResult[2][0]);
                            errors.query = manageLikeResult[2][0].message;
                            
                        }else{
                            if(manageLikeResult[3][0].Q_STATUS === 1){
                                res.json({success: "Successfull likes management"})
                            }else if(manageLikeResult[3][0].Q_STATUS === 2){
                                res.json({success: "Couldnt lower likes/dislikes under 0"})
                            }else{
                                errors.query = "Hehe something wrong";
                                res.status(400).json(errors);
                            }
                        }

                    }else if(target === "THREAD" || target === "THREADS"){
                        let type = "";
                        if(like === 0){
                            type = "DEC_DISLIKE";
                        }else{
                            type = "DEC_LIKE";
                        }
                        console.log("THREAD THREADS DELETE: " + type);//THIS

                        const deleteLikeResult = await vc.deleteLike(user_id,target_id);
                        const manageLikeResult = await cc.manageThreadLikes(target_id,type);

                        if(manageLikeResult[2][0]){
                            console.log(manageLikeResult[2][0]);
                            errors.query = manageLikeResult[2][0].message;
                            
                        }else{
                            console.log(manageLikeResult[3][0]);//THIS
                            if(manageLikeResult[3][0].Q_STATUS === 1){
                                res.json({success: "Successfull likes management"})
                            }else if(manageLikeResult[3][0].Q_STATUS === 2){
                                res.json({success: "Couldnt lower likes/dislikes under 0"})
                            }else{
                                errors.query = "Hehe something wrong";
                                res.status(400).json(errors);
                            }
                        }
                    }
                }else{
                    //Already liked/disliked, but clicked on the disliked/liked
                    if(target === "COMMENT"){
                        console.log("Already disliked/liked, clicked on the other one");
                        let type1 = "";
                        let type2 = "";
                        if(like === 0){
                            type1 = "INC_DISLIKE";
                            type2 = "DEC_LIKE";
                        }else{
                            type1 = "INC_LIKE";
                            type2 = "DEC_DISLIKE";
                        }

                        const deleteLikeResult = await vc.updateLike(like,user_id,target_id);
                        const manageLikeResult = await cc.manageCommentLikes(target_id,type1);

                        if(manageLikeResult[2][0]){
                            //console.log(manageLikeResult[2][0]);
                            errors.query = manageLikeResult[2][0].message;
                            console.log("ManageLike Errpr");
                        }else{
                            if(manageLikeResult[3][0].Q_STATUS === 1 || manageLikeResult[3][0].Q_STATUS === 2){
                                const manageLikeResult2 = await cc.manageCommentLikes(target_id,type2);

                                if(manageLikeResult2[2][0]){
                                    //console.log(manageLikeResult2[2][0]);
                                    errors.query = manageLikeResult2[2][0].message;
                                    console.log("ManageLike Errpr2");
                                }else{
                                    if(manageLikeResult2[3][0].Q_STATUS === 1 || manageLikeResult2[3][0].Q_STATUS === 2){
                                        res.json({success: "Successfull likes management"})
                                    }else if(manageLikeResult2[3][0].Q_STATUS === 2){
                                        res.json({success: "Couldnt lower likes/dislikes under 0"})
                                    }else{
                                        errors.query = "Hehe something wrong";
                                        res.status(400).json(errors);
                                    }
                                }
                            }else{
                                errors.query = "Hehe something wrong";
                                res.status(400).json(errors);
                            }
                        }

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

                        const deleteLikeResult = await vc.updateLike(like,user_id,target_id);
                        const manageLikeResult = await cc.manageThreadLikes(target_id,type1);

                        if(manageLikeResult[2][0]){
                            console.log(manageLikeResult[2][0]);
                            errors.query = manageLikeResult[2][0].message;
                            
                        }else{
                            if(manageLikeResult[3][0].Q_STATUS === 1 || manageLikeResult[3][0].Q_STATUS === 2){
                                const manageLikeResult2 = await cc.manageThreadLikes(target_id,type2);

                                if(manageLikeResult2[2][0]){
                                    console.log(manageLikeResult2[2][0]);
                                    errors.query = manageLikeResult2[2][0].message;
                                    
                                }else{
                                    if(manageLikeResult2[3][0].Q_STATUS === 1 || manageLikeResult2[3][0].Q_STATUS === 2){
                                        res.json({success: "Successfull likes management"})
                                    }else if(manageLikeResult2[3][0].Q_STATUS === 2){
                                        res.json({success: "Couldnt lower likes/dislikes under 0"})
                                    }else{
                                        errors.query = "Hehe something wrong";
                                        res.status(400).json(errors);
                                    }
                                }
                            }else{
                                errors.query = "Hehe something wrong";
                                res.status(400).json(errors);
                            }
                        }
                    }
                }
            }

        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }
});


// GET api/votes/like/:target_id
// Kommentnek, fúrumnak a lájkjainak számát visszaadja
router.get('/like/:target_id', async (req, res) => {
    const target_id = req.params.target_id;
    const errors = vv.voteGetAllLikesValidator(target_id);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const getAllLikesResult = await vc.getAllLikes(target_id);

            if(getAllLikesResult[2].length == 1){
                res.json(getAllLikesResult[2][0]);
            }else{
                errors.query = "Get all likes error";

                res.status(400).json(errors);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }
});


// GET api/votes/rate/:m_id
// Manga értékeléseit adja vissza
router.get('/rate/:manga_id', verify_check, async (req, res) => {
    const manga_id = req.params.manga_id;
    const errors = vv.voteGetRatingsValidator(manga_id);

    let id = 0;
    if(req.jwt){
        id = req.jwt.id;
    }

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        const mangaRatingsResult = await vc.getMangaRatings(manga_id, id);

        if(mangaRatingsResult[0].length === 1){
            let rating = {
                avg:mangaRatingsResult[0][0].atlag,
                ratings_count:mangaRatingsResult[0][0].db
            };

            if(mangaRatingsResult[1].length === 1){
                rating.user = mangaRatingsResult[1][0].user_id;
                rating.score = mangaRatingsResult[1][0].score;
            }else{
                rating.user = null;
                rating.score = null;
            }

            res.json(rating);
        }else{
            errors.query = "Get all likes error";

            res.status(400).json(errors);
        }
    }
});


// POST api/votes/rate/:m_id
// Megadott mangát értékeli
router.post('/rate/:manga_id', verify, async (req, res) => {
    const user_id = req.jwt.id;
    const manga_id = req.params.manga_id;
    const {manga_name, score} = req.body;
    const errors = vv.votePostRatingValidator(user_id, manga_id, req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const beforeMRPostResult = await vc.checkBeforeMangaRatingPost(user_id, manga_id);
            
            if(beforeMRPostResult.length == 0){
                //Havent rated the manga yet
                const postMangaRatingResult = await vc.postMangaRating(user_id, manga_name, manga_id, parseInt(score));
                
                if(postMangaRatingResult.affectedRows == 1){
                    res.json({success: "Sikeres manga ertekeles"});
                }else{
                    errors.query = "sql_postMangaRating error";

                    res.status(400).json(errors);
                }
            }else{
                //Already rated the manga
                const updateMangaRatingResult = await vc.updateMangaRating(score, user_id, manga_id);
                
                if(updateMangaRatingResult.affectedRows == 1){
                    res.json({success: "Sikeres manga ertekeles update"});
                }else{
                    errors.query = "Update rating error";

                    res.status(400).json(errors);
                }
            }

        } catch (error) {
            res.status(400).json(error);
        }
    }
});


// DELETE api/votes/rate/:m_id
// Megadott mangáról törli a felhasználó értékelését
router.delete('/rate/:manga_id', verify, async (req, res) => {
    const user_id = req.jwt.id;
    const manga_id = req.params.manga_id;
    const errors = vv.voteDeleteRatingValidator(user_id, manga_id);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const deleteMangaRatingResult = await vc.deleteMangaRating(user_id, manga_id);
            if(deleteMangaRatingResult.affectedRows == 1){
                const getMangaRatingsResult = await vc.getMangaRatings(manga_id,user_id);
            
                if(getMangaRatingsResult[0].length === 1){
                    let rating = {
                        avg:getMangaRatingsResult[0][0].atlag,
                        ratings_count:getMangaRatingsResult[0][0].db
                    };

                    if(getMangaRatingsResult[1].length === 1){
                        rating.user = getMangaRatingsResult[1][0].user_id;
                        rating.score = getMangaRatingsResult[1][0].score;
                    }else{
                        rating.user = null;
                        rating.score = null;
                    }
                    
                    res.json(rating);
                }else{
                    errors.query = "Get all likes error";

                    res.status(400).json(errors);
                }

            }else{
                errors.query = "Delete rating error";

                res.status(400).json(errors);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }
});


module.exports = router;