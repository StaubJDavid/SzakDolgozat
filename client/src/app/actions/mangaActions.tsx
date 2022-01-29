import axios from 'axios';
import {
        GET_ERRORS,
        SEARCH_FOR_MANGA,
        GET_RATING,
        CLEAR_RATING,
        CLEAR_MANGA,
        SET_CURRENT_PAGE,
        GET_MANGA,
        GET_CHAPTERS,
        GET_MANGA_IMAGES
} from './types';

export const searchForManga = (manga:string,offset:number) => (dispatch:any) => {
    axios.get('https://api.mangadex.org/manga',{params:{title: manga, limit:20, offset:offset}})
    .then(
        res => {
            dispatch(setCurrentPage(1));
            res.data.manga_name = manga;
            dispatch({
                type: SEARCH_FOR_MANGA,
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

export const getManga = (manga_id:string) => (dispatch:any) => {
    axios.get(`https://api.mangadex.org/manga/${manga_id}`)
    .then(
        res => {
            dispatch({
                type: GET_MANGA,
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

export const getChapters = (manga_id:string, offset:number) => (dispatch:any) => {
    axios.get(`https://api.mangadex.org/manga/${manga_id}/feed?order[volume]=desc&order[chapter]=desc&offset=${offset}`)
    .then(
        res => {
            dispatch({
                type: GET_CHAPTERS,
                payload: res.data
            })
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: null
        })
    );
}

export const getMangaImages = (chapter_id:string) => (dispatch:any) => {
    axios.get(`https://api.mangadex.org/at-home/server/${chapter_id}`)
    .then(
        res => {
            res.data.chapter_id = chapter_id;
            dispatch({
                type: GET_MANGA_IMAGES,
                payload: res.data
            })
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: null
        })
    );
}

export const clearMangaSearch = () => (dispatch:any) => {
    dispatch({
        type: CLEAR_MANGA
    })
}

export const setCurrentPage = (page:number) => (dispatch:any) => {
    dispatch({
        type: SET_CURRENT_PAGE,
        payload: page
    })
}

export const searchForMangaPage = (manga:string,offset:number, currentPage:number) => (dispatch:any) => {
    axios.get('https://api.mangadex.org/manga',{params:{title: manga, limit:20, offset:offset}})
    .then(
        res => {
            res.data.currentPage = currentPage;
            res.data.manga_name = manga;
            dispatch({
                type: SEARCH_FOR_MANGA,
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