import axios from 'axios';
import {
        GET_ERRORS,
        GET_LATEST_UPLOADED_CHAPTERS,
        GET_SEASONAL_LISTS,
        GET_MOST_FOLLOWED_MANGAS,
        CLEAR_MAIN_PAGE,
        CLEAR_SEASONAL
} from './types';
import store from '../store';

//?includes[]=author&includes[]=artist&includes[]=cover_art&limit=10&contentRating[]=safe
//&contentRating[]=suggestive&order[relevance]=desc&ids[]=3e80185a-416e-496f-94a3-423efec8cd50
export const getMostFollowed = () => (dispatch:any) => {
    axios.get(`${process.env.REACT_APP_PROXY_URL}/manga`,{params:{
        includes: ["author","artist","cover_art"], limit:10, contentRating:["safe","suggestive"],
        "order[followedCount]":"desc"
    }})
    .then(
        res => {
            dispatch({
                type: GET_MOST_FOLLOWED_MANGAS,
                payload: res.data.data
            })
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: null
        })
    );
}


//${process.env.REACT_APP_PROXY_URL}/chapter?
//includes[]=manga&includes[]=scanlation_group&limit=10
//&contentRating[]=safe&contentRating[]=suggestive
//&order[readableAt]=desc
export const getLatestUpload = () => (dispatch:any) => {
    axios.get(`${process.env.REACT_APP_PROXY_URL}/chapter`,{params:{
        includes: ["manga","scanlation_group"],
        limit:24,
        contentRating:["safe","suggestive"],
        "order[readableAt]":"desc"
    }})
    .then(
        res => {
            let req = "";
            //console.log("Every Manga(24)")
            res.data.data.map((c:any) => (
                req += "&ids[]="+c.relationships.find((o:any) => o.type === "manga").id
            ))
            /*console.log("?" + req.substring(1,req.length));
            console.log(res.data);*/
            axios.get(`${process.env.REACT_APP_PROXY_URL}/manga${"?" + req.substring(1,req.length)}&limit=24&includes[]=cover_art`)
            .then(
                res2 => {
                    /*dispatch({
                        type: GET_LATEST_UPLOADED_CHAPTERS,
                        payload: res.data.data
                    })*/
                    //console.log(res2.data);
                    let helpObject:any = {};
                    //console.log("Covers");
                    for(let i = 0; i<res2.data.data.length;i++){
                        //console.log(res2.data.data[i].relationships.find((o:any) => o.type === "manga").id);
                        let manga_id = res2.data.data[i].id;
                        helpObject[manga_id] = res2.data.data[i].relationships.find((o:any) => o.type === "cover_art");;
                    }

                    //console.log(helpObject);

                    for(let i = 0; i < 24;i++){
                        let manga_id = res.data.data[i].relationships.find((o:any) => o.type === "manga").id;
                        //console.log(manga_id + " : ",helpObject[manga_id]);
                        res.data.data[i].relationships.push(helpObject[manga_id])
                    }

                    dispatch({
                        type: GET_LATEST_UPLOADED_CHAPTERS,
                        payload: res.data.data
                    })
                }
            ).catch(
                err2 => dispatch({
                    type: GET_ERRORS,
                    payload: null
                })
            );
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: null
        })
    );
}

export const getSeasonals = () => (dispatch:any) => {
    dispatch({
        type:CLEAR_SEASONAL
    })
    axios.get(`${process.env.REACT_APP_PROXY_URL}/user/d2ae45e0-b5e2-4e7f-a688-17925c2d7d6b/list`)
    .then(
        res => {
            /*dispatch({
                type: GET_SEASONAL_LISTS,
                payload: res.data.data
            })*/
            console.log(res.data.data);
            for(let i = 0; i< res.data.data.length;i++){
                
                console.log(i," List element - ", res.data.data[i].id);
                let req = "";
                /*res.data.data[i].relationships.map((c:any) => (
                    req += "&ids[]="+c.relationships.find((o:any) => o.type === "manga").id
                ))
                res.data.data[i].relationships.map((c:any) => (
                    console.log(c.id)
                ))*/
                res.data.data[i].relationships.map((c:any) => {
                    if(c.type === 'manga'){
                        req += "&ids[]="+c.id;
                        return true
                    }else{
                        return false
                    }   
                })
                //console.log(req);
                axios.get(`${process.env.REACT_APP_PROXY_URL}/manga?includes[]=cover_art&order[followedCount]=desc&limit=${res.data.data[i].relationships.length}${req}`)
                .then(
                    res2 => {
                        let seasonal:any = {};
                        seasonal.name = res.data.data[i].attributes.name;
                        seasonal.list_id = res.data.data[i].id;
                        seasonal.data = res2.data.data;
                        dispatch({
                            type: GET_SEASONAL_LISTS,
                            payload: seasonal
                        });
                    }
                ).catch(
                    err2 => dispatch({
                        type: GET_ERRORS,
                        payload: null
                    })
                );
            }
            
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: null
        })
    );
}