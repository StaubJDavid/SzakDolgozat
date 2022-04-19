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
const listValidations = require('../helpers/validations/listValidations');
const lv = new listValidations();
//const lq = require('../helpers/queries/listQueries');
//const uq = require('../helpers/queries/userQueries');

const listClass = require('../helpers/queries/listQueries');
const lc = new listClass();

require('dotenv').config();

// POST api/lists
// Létrehoz egy listát
router.post('/', verify, async (req, res) => {
    const {id} = req.jwt
    const {list_name, visibility} = req.body;
    const errors = lv.listCreateListValidator(req.jwt, req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const listCreateCheckResult = await lc.checkBeforeCreateList(id, list_name)
        
            if(listCreateCheckResult.length === 0){
                const createListResult = await lc.createList(id, list_name, getVisibility(visibility));
                if(createListResult.affectedRows == 1){
                    res.json({success: "Successfully created list: " + list_name + " || visibility: " + getVisibility(visibility)});
                }else{
                    if(createListResult.affectedRows == 0){
                        errors.query = "Couldn't create list named: " + list_name;
                    }

                    if(createListResult.affectedRows > 1){
                        errors.query = "Created more than 1 list named: " + list_name;
                    }   

                    res.status(400).json(errors);
                } 
            }else{
                if(listCreateCheckResult.length === 1){
                    errors.query = "You already have a list named: " + list_name;
                }

                if(listCreateCheckResult.length > 1){
                    errors.query = "More than 1 list found with name: " + list_name;
                }   

                res.status(400).json(errors);
            }

        } catch (error) {
            res.status(400).json(error);
        }
    }
});

// GET api/lists
// Headerben lévő felhasználó összes listáját visszaadja
router.get('/', verify, async (req, res) => {
    const {id} = req.jwt;
    const errors = lv.listGetCurrentListsValidator(req.jwt);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const getListsResults = await lc.getLists(id);

            if(getListsResults.length == 0){
                errors.query = "You have no lists";
                res.status(400).json(errors);
            }else{
                res.json(getListsResults);
            }

        } catch (error) {
            res.status(400).json(error);
        }
    }
});

// GET api/lists/user/:user_id
// Megadott felhasználónak a listáit adja vissza
router.get('/user/:user_id', verify, async (req, res) => {
    const user_id = req.jwt.id;
    const friend_id = req.params.user_id;
    const errors = lv.listGetCurrentListsValidator(req.jwt, friend_id);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        if(user_id == friend_id){
            try {
                const getListsResults = await lc.getLists(user_id);

                if(getListsResults.length == 0){
                    errors.list = "You have no lists";
                    res.status(400).json(errors);
                }else{
                    let lists = {
                        list_array: {},
                        owner: user_id,
                        owned: true
                    };
                    for(let i = 0; i < getListsResults[0].length; i++){
                        lists.list_array[getListsResults[0][i].list_id] = {
                            list_id: getListsResults[0][i].list_id,
                            list_name: getListsResults[0][i].list_name,
                            visibility: getListsResults[0][i].visibility,
                            created: getListsResults[0][i].created,
                            data:[]
                        };
                    }


                    for(let i = 0; i < getListsResults[1].length; i++){
                        lists.list_array[getListsResults[1][i].list_id].data.push({
                            ld_id:getListsResults[1][i].ld_id,
                            manga_id:getListsResults[1][i].manga_id,
                            manga_name:getListsResults[1][i].manga_name
                        });
                    }

                    res.json(lists);
                }

            } catch (error) {
                res.status(400).json(error);
            }
        }else{
            try {
                const areFriends = await checkIfFriends(user_id, friend_id);
                
                if(areFriends == 1){
                    const getFriendsListsResults = await lc.getFriendsLists(friend_id);
                    if(getFriendsListsResults[0].length != 0){
                        //res.json(getFriendsListsResults);
                        let lists = {
                            list_array: {},
                            owner: friend_id,
                            owned: false
                        };

                        for(let i = 0; i < getFriendsListsResults[0].length; i++){
                            lists.list_array[getFriendsListsResults[0][i].list_id] = {
                                list_id: getFriendsListsResults[0][i].list_id,
                                list_name: getFriendsListsResults[0][i].list_name,
                                visibility: getFriendsListsResults[0][i].visibility,
                                created: getFriendsListsResults[0][i].created,
                                data:[]
                            };
                        }


                        for(let i = 0; i < getFriendsListsResults[1].length; i++){
                            lists.list_array[getFriendsListsResults[1][i].list_id].data.push({
                                ld_id:getFriendsListsResults[1][i].ld_id,
                                manga_id:getFriendsListsResults[1][i].manga_id,
                                manga_name:getFriendsListsResults[1][i].manga_name
                            });
                        }

                        res.json(lists);
                    }else{
                        if(getFriendsListsResults[0].length == 0){
                            errors.list = "This user: " + friend_id + " has no lists publicly/friendly";
                        }
    
                        res.status(400).json(errors);
                    }

                }else if (areFriends == 0){
                    const getUsersListsResults = await lc.getUsersLists(friend_id);

                    if(getUsersListsResults[0].length != 0){
                        let lists = {
                            list_array: {},
                            owner: friend_id,
                            owned: false
                        };

                        for(let i = 0; i < getUsersListsResults[0].length; i++){
                            lists.list_array[getUsersListsResults[0][i].list_id] = {
                                list_id: getUsersListsResults[0][i].list_id,
                                list_name: getUsersListsResults[0][i].list_name,
                                visibility: getUsersListsResults[0][i].visibility,
                                created: getUsersListsResults[0][i].created,
                                data:[]
                            };
                        }


                        for(let i = 0; i < getUsersListsResults[1].length; i++){
                            lists.list_array[getUsersListsResults[1][i].list_id].data.push({
                                ld_id:getUsersListsResults[1][i].ld_id,
                                manga_id:getUsersListsResults[1][i].manga_id,
                                manga_name:getUsersListsResults[1][i].manga_name
                            });
                        }

                        res.json(lists);
                    }else{
                        if(getUsersListsResults[0].length == 0){
                            errors.list = "This user: " + friend_id + " has no lists publicly";
                        }
    
                        res.status(400).json(errors);
                    }

                }else if(areFriends == -1){
                    res.status(400).json("checkIfFriends error");
                }
            } catch (error) {
                res.status(400).json(error);
            } 
        }
    }
});

// PUT api/lists/:list_id
// Megadott listának az adatai változtatja
router.put('/:list_id', verify, async (req, res) => {
    const user_id = req.jwt.id;
    const list_id = req.params.list_id;
    const {list_name, visibility} = req.body;
    const errors = lv.listEditListValidator(req.jwt, list_id, req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const listOwnerResult = await lc.checkIfListOwner(user_id, list_id);

            if(listOwnerResult.length == 1){
                const editListResult = await lc.editList(list_name, getVisibility(visibility), list_id);
                
                if(editListResult.affectedRows == 1){
                    res.json({success: "Updated list"});
                }else{
                    if(editListResult.affectedRows == 0){
                        errors.query = "Couldn't update your list";
                    }

                    if(editListResult.affectedRows > 1){
                        errors.query = "Updated more than once";
                    }

                    res.status(400).json(errors);
                }
            }else{
                if(listOwnerResult.length == 0){
                    errors.query = "There's no such list with you as the owner";
                }

                if(listOwnerResult.length > 1){
                    errors.query = "There's more than 1 such list with you as the owner";
                }

                res.status(400).json(errors);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }
});

// POST api/lists/:list_id
// Megadott listához ad hozzá új elemeket
router.post('/:list_id', verify, async (req, res) => {
    const user_id = req.jwt.id;
    const list_id = req.params.list_id;
    const errors = lv.listAddToListValidator(req.jwt, list_id, req.body);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const addMangaCheckResult = await lc.checkBeforeAddingMangaToList(user_id, list_id, req.body.manga_id);

            if(addMangaCheckResult[0].length == 1 && addMangaCheckResult[1].length == 0){

                const addMangaResult = await lc.addToMangaList(user_id, list_id, req.body.manga_name, req.body.manga_id);
                
                if(addMangaResult.affectedRows == 1){
                    res.json({success: "Added manga: " + req.body.manga_name + " to the list"});
                }else{
                    if(addMangaResult.affectedRows == 0){
                        errors.query = "Couldn't add the manga to your list";
                    }

                    if(addMangaResult.affectedRows > 1){
                        errors.query = "Added more than once";
                    }

                    res.status(400).json(errors);
                }
            }else{
                if(addMangaCheckResult[0].length == 0){
                    errors.query = "There's no such list with you as the owner";
                }

                if(addMangaCheckResult[0].length > 1){
                    errors.query = "There's more than 1 such list with you as the owner";
                }

                if(addMangaCheckResult[0].length == 1 && addMangaCheckResult[1].length > 0){
                    errors.query = "You already have this manga in your list";
                }

                res.status(400).json(errors);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }
});

// DELETE api/lists/:list_id
// Törli a megadott listát elemeivel eggyütt
router.delete('/:list_id', verify, async (req, res) => {
    const user_id = req.jwt.id;
    const list_id = req.params.list_id;
    const errors = lv.listDeleteValidator(req.jwt, list_id);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const listOwnerResult = await lc.checkIfListOwner(user_id, list_id);

            if(listOwnerResult.length == 1){
                const deleteListResult = await lc.deleteList(user_id, list_id);
                if(deleteListResult[1].affectedRows == 1){
                    res.json({success: "Deleted list: " + list_id})
                }else{
                    errors.query = "Didn't delete anything.";

                    res.status(400).json(errors);
                }
            }else{
                if(listOwnerResult.length == 0){
                    errors.query = "There's no such list with you as the owner";
                }

                if(listOwnerResult.length > 1){
                    errors.query = "There's more than 1 such list with you as the owner";
                }

                res.status(400).json(errors);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }
});

// DELETE api/lists/entry/:list_id/:ld_id
// Megadott lista elemet törli a listából
router.delete('/entry/:list_id/:ld_id', verify, async (req, res) => {
    const user_id = req.jwt.id;
    const list_id = req.params.list_id;
    const ld_id = req.params.ld_id;
    const errors = lv.listDeleteListEntryValidator(req.jwt, req.params);

    if(!isEmpty(errors)){
        res.status(400).json(errors);
    }else{
        try {
            const listOwnerResult = await lc.checkIfListOwner(user_id, list_id);

            if(listOwnerResult.length == 1){
                const deleteListEntryResult = await lc.deleteListEntry(user_id, list_id, ld_id);
                
                if(deleteListEntryResult.affectedRows == 1){
                    res.json({success: "Deleted list entry: " + ld_id})
                }else{
                    if(deleteListEntryResult.affectedRows == 0){
                        errors.query = "Didn't delete anything.";
                    }
                    
                    if(deleteListEntryResult.affectedRows > 1){
                        errors.query = "Deleted more than 1 entry";
                    }

                    res.status(400).json(errors);
                }
            }else{
                if(listOwnerResult.length == 0){
                    errors.query = "There's no such list with you as the owner";
                }

                if(listOwnerResult.length > 1){
                    errors.query = "There's more than 1 such list with you as the owner";
                }

                res.status(400).json(errors);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }
});

module.exports = router;