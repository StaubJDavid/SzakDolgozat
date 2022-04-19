const Joi = require('joi');

const {joi_digit, joi_string} = require('./schemas');


const votePostLikeValidate = Joi.object({
    user_id: joi_digit,
    target_id: joi_string,
    like: joi_digit
});

const voteGetAllLikesValidate = Joi.object({
    target_id: joi_string
});

const voteGetRatingsValidate = Joi.object({
    manga_id: joi_string
});

const votePostRatingValidate = Joi.object({
    user_id: joi_digit,
    manga_id: joi_string,
    manga_name: joi_string,
    score: joi_digit
});

const voteDeleteRatingValidate = Joi.object({
    user_id: joi_digit,
    manga_id: joi_string
});

class commentValidations {
    constructor() {
    };

    //A paraméterek a beérkező kérésből jön
    votePostLikeValidator(user_id, data){

        //Kiértékeli a votePostLikeValidate objektumot a megadott értékek alapján
        const { error, value } = votePostLikeValidate.validate({ 
            user_id: user_id,
            target_id: data.target_id,
            like: data.like
        },{abortEarly: false});
    
        //Létrehozunk egy üres objektumot, ezt fogjuk vissza adni
        const errors = {};
    
        //Ha van hiba akkor végig megy a tömbön, és a ha a switch-nek megadott paramétert kezeljük akkor az errors
        //objektumnak hozzáadunk attribútumot egy üzenettel
        if(error){
            error.details.forEach(e => {
                //Csak olyan nevű hibák lehetnek amik a vizsgált objektumnak megvannak attribútumként
                switch(e.path[0]){
                    case "user_id": errors.user_id = "Wrong user_id format";break;
                    case "target_id": errors.target_id = "Wrong target_id format";break;
                    case "like": errors.like = "Wrong like format";break;
                }
            })
        }    
    
        //Ha nincs hiba üres objektumot adunk vissza
        return errors;
    };

    voteGetAllLikesValidator(target_id){
        const { error, value } = voteGetAllLikesValidate.validate({ 
            target_id: target_id
        },{abortEarly: false});
    
        const errors = {};
    
        if(error){
            error.details.forEach(e => {
                switch(e.path[0]){
                    case "target_id": errors.target_id = "Wrong target_id format";break;
                }
            })
        }    
    
        return errors;
    };

    votePostRatingValidator(user_id, manga_id, data){
        const { error, value } = votePostRatingValidate.validate({ 
            user_id: user_id,
            manga_id: manga_id,
            manga_name: data.manga_name,
            score: data.score
        },{abortEarly: false});
    
        const errors = {};
    
        if(error){
            error.details.forEach(e => {
                switch(e.path[0]){
                    case "user_id": errors.user_id = "Wrong user_id format";break;
                    case "manga_id": errors.manga_id = "Wrong manga_id format";break;
                    case "manga_name": errors.manga_name = "Wrong manga_name format";break;
                    case "score": errors.score = "Wrong score format";break;
                }
            })
        }    
    
        return errors;
    };

    voteDeleteRatingValidator(user_id, manga_id){
        const { error, value } = voteDeleteRatingValidate.validate({ 
            user_id: user_id,
            manga_id: manga_id
        },{abortEarly: false});
    
        const errors = {};
    
        if(error){
            error.details.forEach(e => {
                switch(e.path[0]){
                    case "user_id": errors.user_id = "Wrong user_id format";break;
                    case "manga_id": errors.manga_id = "Wrong manga_id format";break;
                }
            })
        }    
    
        return errors;
    };

    voteGetRatingsValidator(manga_id){
        const { error, value } = voteGetRatingsValidate.validate({ 
            manga_id: manga_id
        },{abortEarly: false});
    
        const errors = {};
    
        if(error){
            error.details.forEach(e => {
                switch(e.path[0]){
                    case "manga_id": errors.manga_id = "Wrong manga_id format";break;
                }
            })
        }    
    
        return errors;
    };

};

module.exports = commentValidations;