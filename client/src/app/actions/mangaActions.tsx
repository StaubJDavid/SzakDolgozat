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
        GET_MANGA_IMAGES,
        GET_READING_CHAPTERS,
        CLEAR_READING_CHAPTERS,
        ADD_READING_CHAPTERS,
        GET_READING_CHAPTER
} from './types';
import store from '../store';

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
            payload: null
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

export const getReadingChapters = (chapter_id:string,manga_id:string) => (dispatch:any) => {
    axios.get(`https://api.mangadex.org/chapter/${chapter_id}`)
        .then(
            res => {
                
                //setChapter(res.data.data);
                let m_id = "";
                res.data.data.relationships.map((r:any,i:any) => {
                    //console.log(i,":",r);
                    if(r.type === "manga"){
                        m_id = r.id
                    }
                })

                //console.log(manga_id);
                //console.log(m_id);

                res.data.data.manga_id = m_id;

                if(manga_id !== m_id){
                    //console.log("Diff Manga");
                    clearReadingChapters();
                    //Get all chapters
                    axios.get(`https://api.mangadex.org/manga/${m_id}/feed?limit=500&order[volume]=desc&order[chapter]=desc&offset=0&translatedLanguage[]=${res.data.data.attributes.translatedLanguage}`)
                    .then(
                        res2 => {
                            //setChapters(res2.data.data);

                            dispatch({
                                type:GET_READING_CHAPTERS,
                                payload: res2.data.data
                            })

                            //console.log("First Chapter Request");
                            //console.log(res2.data.data);
                            let requestOccurence = Math.trunc(res2.data.total/500);

                            let index = res2.data.data.findIndex((e:any) => e.id === res.data.data.id)

                            if(index !== -1){
                                res.data.data.array_id = index;
                                dispatch({
                                    type:GET_READING_CHAPTER,
                                    payload: res.data.data
                                })
                            }

                            //console.log(requestOccurence);
                            for(let i = 1; i <= requestOccurence; i++){
                                //console.log("Im IN THE THING");
                                axios.get(`https://api.mangadex.org/manga/${m_id}/feed?limit=500&order[volume]=desc&order[chapter]=desc&offset=${500*i}&translatedLanguage[]=${res.data.data.attributes.translatedLanguage}`)
                                .then(
                                    res3 => {
                                        //console.log(i," Offset");
                                        //console.log(res3.data.data);
                                        //setChapters((chapters:any) => [...chapters,...res3.data.data]);
                                        dispatch({
                                            type:ADD_READING_CHAPTERS,
                                            payload: res3.data.data
                                        })

                                        let index = res3.data.data.findIndex((e:any) => e.id === res.data.data.id+(500*i))
                                        
                                        if(index !== -1){
                                            res.data.data.array_id = index;
                                            dispatch({
                                                type:GET_READING_CHAPTER,
                                                payload: res.data.data
                                            })
                                        }
                                        
                                    }
                                ).catch(
                                    err3 => {
                                        dispatch({
                                            type:GET_ERRORS,
                                            payload: err3.response
                                        })
                                    }
                                );
                            }
                        }
                    ).catch(
                        err2 => {
                            dispatch({
                                type:GET_ERRORS,
                                payload: err2.response
                            })
                        }
                    );
                }else{
                    //console.log(new_array_id);
                    //res.data.data.array_id = 0;
                    //console.log("Same Manga Diff Chapter");
                    //console.log("s: ", );
                    res.data.data.array_id = store.getState().manga.reading_chapters.chapters.findIndex((e:any) => e.id === res.data.data.id)
                    dispatch({
                        type:GET_READING_CHAPTER,
                        payload: res.data.data
                    })
                }
                
            }
        ).catch(
            err => {
                dispatch({
                    type:GET_ERRORS,
                    payload: err.response
                })
            }
        );
}

export const clearReadingChapters = () => (dispatch:any) => {
    dispatch({
        type: CLEAR_READING_CHAPTERS
    })
}