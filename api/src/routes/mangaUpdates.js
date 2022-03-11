const express = require('express');
const axios = require('axios');
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
const mangaUpdatesValidations = require('../helpers/validations/mangaUpdatesValidations');
const muv = new mangaUpdatesValidations();
const vq = require('../helpers/queries/voteQueries');
const cq = require('../helpers/queries/commentQueries');
const verify_check = require('../helpers/verify_check');
const mangaUpdatesClass = require('../helpers/queries/mangaUpdatesQueries');
const muq = new mangaUpdatesClass();
const ash = require('express-async-handler');
const sendEmail = require('../helpers/sendEmail');
var cron = require('node-cron');

require('dotenv').config();

//Get all subscribed manga
router.get('/updates', verify, async (req, res) => {
    const user_id = req.jwt.id
    const errors = muv.mockValidator();

    try {
        const subscribedMangas = await muq.getSubscribedMangas(user_id);
        res.json(subscribedMangas);
    } catch (error) {
        //Literally catch every error I raise, or something else does
        console.log(error);
        res.status(400).json(error);
    }
});

//Subscribe to manga
router.post('/updates', verify, async (req, res) => {
    const user_id = req.jwt.id;
    const {manga_id, translated_language} = req.body;
    const errors = muv.mockValidator();

    try {
        //Check if manga_id with translated_language already exists in db
        //and same thing but check if user is already subscribed to it
        const mangaLanguageData = await muq.checkIfMLanguage(manga_id,translated_language,user_id);
        
        if(mangaLanguageData.manga){//If manga exists in db but user not subscribed
            
            //Insert user into table
            const addUserResult = await muq.addUserToMangaLanguage(user_id,mangaLanguageData.mangaLanguage[0].imt_id);
            if(addUserResult.userInsert){
                //if User insert succeeds, update the manga followers count(Increment)
                const followUpdateResult = await muq.manageMangaUpdatesFollowers(mangaLanguageData.mangaLanguage[0].imt_id, 'INC');
                if(followUpdateResult.success){
                    res.json({success:true, reason: "Successfully subscribed user, and increased followers"});
                }else{
                    res.status(400).json({success:false, reason:"unknown"});
                }
            }
        }else{//If manga doesnt exists in db

            //Getting the latest manga chapter in the given language
            const latestChapter = await muq.getMangaLatestChapterInLanguage(manga_id,translated_language);
            
            if(latestChapter.result === "Success"){//If the request succeeds, has that language, with a chapter
                
                //Insert manga into db with latest chapter on given language
                const mangaInsertResult = await muq.createMangaLanguage(manga_id,latestChapter.manga_name,translated_language,latestChapter.chapter, latestChapter.chapterId);
                
                //Insert user to the imt based on the insertedId of mangaInsertResult
                //We dont Increment bec the default followers count on insert is 1
                const addUserResult = await muq.addUserToMangaLanguage(user_id,mangaInsertResult.insertedId);
                if(mangaInsertResult.insertMangaLanguage && addUserResult.userInsert){
                    res.json({success:true,reason:"Successfully created new Manga Language Chapter, and subscribed user"});
                }else{
                    res.status(400).json({success:false,reason:"Dont know"});
                }
            }else{
                res.status(400).json({success:false,reason:latestChapter});
            }
        }
    } catch (error) {
        //Literally catch every error I raise, or something else does
        console.log(error);
        res.status(400).json(error);
    }
});

//Unsubscribe from manga
router.delete('/updates', verify, async (req, res) => {
    const user_id = req.jwt.id;
    const imt_id = req.body.imt_id;
    const errors = muv.mockValidator();
    //console.log(req.body);
    //res.json()
    try {
        const unsubscribeResult = await muq.unsubscribeUser(user_id,imt_id);
        if(unsubscribeResult.success){
            const followUpdateResult = await muq.manageMangaUpdatesFollowers(imt_id, 'DEC');
            
            if(followUpdateResult.success){
                res.json({success:true,reason:followUpdateResult.reason});
            }else{
                res.status(400).json({success:false, reason:"unknown"});
            }
        }else{
            res.status(400).json({success:false, reason:"unknown"})
        }
    } catch (error) {
        //Literally catch every error I raise, or something else does
        console.log(error);
        res.status(400).json(error);
    }
});

//TODO do the function that checks for every subscribed manga's latest chapter
//Update the db based on the results
//Notify subscribed users through email
//Make it self repeating hourly

//Unsubscribe from manga
/*router.get('/recurring', async (req, res) => {
    const errors = muv.mockValidator();

    try {
        const mangaResults = await muq.getAllMangaTranslate();
        
        getAllMangaTranslate(mangaResults)
        .then( async results => {
            const newChapterMangas = results.filter((r) => r.newChapter)
            //res.json(newChapterMangas);
            if(newChapterMangas.length > 0){
                const updateResult = await muq.updateMangaTranslate(newChapterMangas);

                let chapterIdLookupTable = {};
                for(let i = 0; i< newChapterMangas.length; i++){
                    chapterIdLookupTable[newChapterMangas[i].manga.imt_id] = newChapterMangas[i].chapterId;
                }

                console.log(chapterIdLookupTable);
                
                if(updateResult.success){
                    const subscribedUsers = await muq.getEverySubscribedUser(newChapterMangas);
                    sendMailToSubscribers(subscribedUsers, chapterIdLookupTable)
                    .then( response => res.json(response))
                    .catch( error => res.json(error))
                    //res.json(thing);
                }else{
                    res.json({success:"ERROR", reason:updateResult.reason})
                }
            }else{
                res.json("nothing to update")
            }
        })
        .catch( err => {
            res.json(err);
        })
        //res.json(mangaResults);
    } catch (error) {
        //Literally catch every error I raise, or something else does
        console.log(error);
        res.json(error);
    }
});*/

const sendMailToSubscribers = (subscribedResults, lookupTable) => {
    console.log("In Send the mail to subscribers");
    let promises = [];
    //console.log(subscribedResults);
    for (let i = 0; i < subscribedResults.data.length; i++) {
        console.log(i);
        const email = subscribedResults.data[i].email;
        const subject = `Chapter ${subscribedResults.data[i].chapter} of ${subscribedResults.data[i].manga_name} is now AVAILABLE TO READ!!!`;
        const message = `Hi ${subscribedResults.data[i].nickname}, A new chapter of ${subscribedResults.data[i].manga_name}(Chapter: ${subscribedResults.data[i].chapter}) has been released!!\n`+
                        `Read the new chapter at: http://localhost:3001/manga/read/${lookupTable[subscribedResults.data[i].imt_id]}`
        promises.push(sendEmail(email,subject,message));
    }
    return Promise.all(promises);
};

const getAllMangaTranslate = (mangaResults) => {
    console.log("In the getAllMangaTranslate");
    let promises = [];
     for (let i = 0; i < mangaResults.data.length; i++) {
        promises.push(checkIfNewChapterAvailable(mangaResults.data[i]));
     }
     return Promise.all(promises);
};

const getMangaLatestChapterInLanguage = async (manga_id,translatedL) =>{
    return await axios.get(`https://api.mangadex.org/chapter?manga=${manga_id}&translatedLanguage[]=${translatedL}&order[volume]=desc&order[chapter]=desc&limit=1`)
    .then(
        res => {
            if(res.data.total === 0) return {result: "Language", chapter: -1.0};
            if(res.data.data[0].attributes.title === "Oneshot") return {result: "Oneshot", chapter: -1.0};
            return {result: "Success", chapter: parseFloat(res.data.data[0].attributes.chapter), chapterId: res.data.data[0].id};
            
        }
    )
};

const checkIfNewChapterAvailable = async (mangaResult) =>{
    return new Promise(async(resolve, reject) => {
        try{
            const result = await getMangaLatestChapterInLanguage(mangaResult.manga_id,mangaResult.translated_language);
            if(mangaResult.chapter < result.chapter){
                let object = {
                    newChapter: true,
                    chapter: result.chapter,
                    chapterId: result.chapterId,
                    manga: mangaResult
                };
                resolve(object);
            }else{
                resolve({newChapter:false})
            }

        }catch(error){
            reject(error);
        }
    })
};
//Run the function at every hour
cron.schedule('0 * * * *', async () => {
    try {
        console.log("The function fired though");
        const mangaResults = await muq.getAllMangaTranslate();
        
        getAllMangaTranslate(mangaResults)
        .then( async results => {
            console.log(results);
            const newChapterMangas = results.filter((r) => r.newChapter)
            //res.json(newChapterMangas);
            
            if(newChapterMangas.length > 0){
                const updateResult = await muq.updateMangaTranslate(newChapterMangas);

                let chapterIdLookupTable = {};
                for(let i = 0; i< newChapterMangas.length; i++){
                    chapterIdLookupTable[newChapterMangas[i].manga.imt_id] = newChapterMangas[i].chapterId;
                }

                //console.log(chapterIdLookupTable);
                
                if(updateResult.success){
                    const subscribedUsers = await muq.getEverySubscribedUser(newChapterMangas);
                    sendMailToSubscribers(subscribedUsers, chapterIdLookupTable)
                    .then( response =>console.log(response))
                    .catch( error => console.log(error))
                    //console.log(thing);
                }else{
                    console.log({success:"ERROR", reason:updateResult.reason})
                }
            }else{
                console.log("nothing to update")
            }
        })
        .catch( err => {
            console.log(err);
        })
        //console.log(mangaResults);
    } catch (error) {
        //Literally catch every error I raise, or something else does
        console.log(error);
    }
})
//Query string to get the latest chapter in a language
//https://api.mangadex.org/chapter?manga={manga_id}&translatedLanguage[]={translatedL}&order[volume]=desc&order[chapter]=desc&limit=1
module.exports = router;