import axios from 'axios';
import {GET_PROFILE,
        PROFILE_LOADING,
        GET_ERRORS,
        CLEAR_ERRORS,
        CLEAR_PROFILE,
        
        CREATE_LIST,
        GET_LISTS,
        ADD_LIST_ENTRY,
        DEL_LIST_ENTRY,
        CLEAR_MANGA,
        CLEAR_LIST,
        GET_SUBSCRIBED_MANGAS,

        CLEAR_PROFILE_MIDDLEWARE
} from './types';

export const getProfile = (id:number) => (dispatch:any) => {
    dispatch(setProfileLoading());
    axios.get(`${process.env.REACT_APP_API_URL}/api/user/${id}`)
    .then(
        res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    ).catch(
        err => {
            dispatch({
                type: GET_PROFILE,
                payload: null
            });
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        }
    );
}

export const getProfileNoLoading = (id:number) => (dispatch:any) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/user/${id}`)
    .then(
        res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    ).catch(
        err => {
            dispatch({
                type: GET_PROFILE,
                payload: null
            });
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        }
    );
}

/* Custom LISTS BEGIN*/

export const getLists = (id:number) => (dispatch:any) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/lists/user/${id}`)
    .then(
        res => dispatch({
            type: GET_LISTS,
            payload: res.data
        })
    ).catch(
        err => {
            dispatch({
                type: CLEAR_LIST,
                payload: null
            });
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        }
    );
}

export const delList = (id:number,user_id:number) => (dispatch:any) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/lists/${id}`)
    .then(
        res => dispatch(getLists(user_id))
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}


export const addList = (user_id:number,list_name:string,visibility:number) => (dispatch:any) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/lists`,{
        list_name: list_name,
        visibility: visibility
    })
    .then(
        res => dispatch(getLists(user_id))
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

export const editList = (user_id:number,list_id:number,list_name:string,visibility:number) => (dispatch:any) => {
    axios.put(`${process.env.REACT_APP_API_URL}/api/lists/${list_id}`,{
        list_name:list_name,
        visibility:visibility
    })
    .then(
        res => dispatch(getLists(user_id))
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

export const delListEntry = (user_id:number,list_id:number,ld_id:number) => (dispatch:any) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/lists/entry/${list_id}/${ld_id}`)
    .then(
        res => dispatch(getLists(user_id))
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

export const addListEntry = (user_id:number,list_id:number,manga_id:string,manga_name:string) => (dispatch:any) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/lists/${list_id}`,{
        manga_id:manga_id,
        manga_name:manga_name
    })
    .then(
        res => {
            dispatch({
                type: CLEAR_MANGA,
                payload: null
            })
            dispatch(getLists(user_id));
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

/* Custom LISTS END*/

export const addMangaProfile = (id:number,detail_type:number,manga_id:string,manga_name:string) => (dispatch:any) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/user/details`,{
        dt_id: detail_type,
        value: manga_id + " " + manga_name
    })
    .then(
        res => {
            dispatch({
                type: CLEAR_MANGA,
                payload: null
            });
            dispatch(getProfileNoLoading(id));
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

export const deleteMangaProfile = (id:number,ud_id:number) => (dispatch:any) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/user/details/${ud_id}`)
    .then(
        res => {
            dispatch(getProfileNoLoading(id));
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

export const updateProfile = (id:number,ud_id:number,value:string) => (dispatch:any) => {
    axios.put(`${process.env.REACT_APP_API_URL}/api/user/details/${ud_id}`,{value: value})
    .then(
        res => {
            dispatch(getProfileNoLoading(id));
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

export const clearProfile = () => {
    return {
        type: CLEAR_PROFILE
    }
}

export const clearError = () => {
    return {
        type: CLEAR_ERRORS
    }
}

export const getSubscribedMangas = () => (dispatch:any) => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/manga/updates`)
    .then(
        res => {
            if(res.data.length === 0){
                dispatch({
                    type: GET_SUBSCRIBED_MANGAS,
                    payload: null
                });
            }else{
                dispatch({
                    type: GET_SUBSCRIBED_MANGAS,
                    payload: res.data
                });
            }
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

export const subscribeToManga = (manga_id:string,translated_language:string) => (dispatch:any) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/manga/updates`,{manga_id: manga_id, translated_language:translated_language})
    .then(
        res => {
            if(res.data.success){
                dispatch(getSubscribedMangas());
            }else{
                dispatch({
                    type: GET_ERRORS,
                    payload: res.data.reason
                })
            }
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

export const unsubscribeFromManga = (imt_id:number) => (dispatch:any) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/manga/updates`,{data:{imt_id: imt_id}})
    .then(
        res => {
            if(res.data.success){
                dispatch(getSubscribedMangas());
            }else{
                dispatch({
                    type: GET_ERRORS,
                    payload: res.data.reason
                })
            }
        }
    ).catch(
        err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}

//MIDDLEWARE
export const clearProfileMiddleware = () => {
    return {
        type: CLEAR_PROFILE_MIDDLEWARE
    }
}