const getChapterTitle = (title:any) => {
    let string = "";

    if(title.volume !== null){
        string += ("Volume: "+title.volume + " ")
    }

    if(title.title === null){
        string += "Chapter: " + title.chapter;
    }else{
        string += "Chapter: " + title.chapter + "-" +  title.title
    }

    return string;
}
//data.attributes.title[Object.getOwnPropertyNames(data.attributes.title)[0]]
export default getChapterTitle;