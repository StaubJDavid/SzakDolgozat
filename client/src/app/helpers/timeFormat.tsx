const timeFormat = (time:any) => {
    if(time === ''){
        return time
    }else{
        return time.slice(0, 19).replace('T', ' ');
    }
}

export default timeFormat;