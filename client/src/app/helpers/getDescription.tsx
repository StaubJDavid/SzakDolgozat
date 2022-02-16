const getDescription = (description:any) => {
    if(description.hasOwnProperty('en')){
        return description.en;
      }else{
        return description[Object.keys(description)[0]];
      }
}

export default getDescription;