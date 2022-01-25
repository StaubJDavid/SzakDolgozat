import axios from 'axios';
import {
        GET_ERRORS,
        SEARCH_FOR_MANGA
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