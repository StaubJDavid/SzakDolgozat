import axios from 'axios';
import {
        GET_ERRORS,
        SEARCH_FOR_MANGA,
        GET_RATING,
        CLEAR_RATING
} from './types';

export const searchForManga = (manga:string) => (dispatch:any) => {
    axios.get('https://api.mangadex.org/manga',{params:{title: manga, limit:100}})
    .then(
        res => dispatch({
            type: SEARCH_FOR_MANGA,
            payload: res.data
        })
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

export const clearMangaSearch = (manga:string) => (dispatch:any) => {
    axios.get('https://api.mangadex.org/manga',{params:{title: manga, limit:100}})
    .then(
        res => dispatch({
            type: SEARCH_FOR_MANGA,
            payload: res.data
        })
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

export const getMangaRating = (manga_id:string) => (dispatch:any) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/votes/rate/${manga_id}`)
    .then(
        res => {
            dispatch({
                type: CLEAR_RATING
            })
            dispatch({
                type: GET_RATING,
                payload: res.data
            })
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

export const postMangaRating = (manga_id:string,manga_name:string,score:number) => (dispatch:any) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/votes/rate/${manga_id}`,{
        manga_name:manga_name,
        score:score
    })
    .then(
        res => dispatch(getMangaRating(manga_id))
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

export const deleteMangaRating = (manga_id:string) => (dispatch:any) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/votes/rate/${manga_id}`)
    .then(
        res => {
            dispatch({
                type: CLEAR_RATING
            })
            dispatch({
                type: GET_RATING,
                payload: res.data
            })
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}