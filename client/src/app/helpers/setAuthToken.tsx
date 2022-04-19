import axios from 'axios';

//Bejelentkezéskor hívjuk ezt a metódust a kapott JWT-vel paraméterben
const setAuthToken = (jwt:any) => {
    //Ha létezik a megadott paraméter
    if(jwt){
        //Beállítjuk hogy az axios minden kérésnél legyen a Headerjében
        //a tokenünk az Authorization változóban
        axios.defaults.headers.common['Authorization'] = jwt;
    }else{
        //Ha nem létezik a megadott paraméter akkor töröljük
        //a token beállítást
        //Ez kijelentkezéskor és elévült tokennél történik
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;

