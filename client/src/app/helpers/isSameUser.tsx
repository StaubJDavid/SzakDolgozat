const isSameUser = (auth:any,other_id:any) => {
    if(auth.user.id == other_id){
        return true;
    }else{
        return false
    }
}

export default isSameUser;