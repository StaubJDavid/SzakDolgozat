import axios from 'axios';

const setAuthToken = (jwt:any) => {
    if(jwt){
        axios.defaults.headers.common['Authorization'] = jwt;
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;