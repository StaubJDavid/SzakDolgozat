const getTitle = (title:any) => {
    return title[Object.getOwnPropertyNames(title)[0]]
}
//data.attributes.title[Object.getOwnPropertyNames(data.attributes.title)[0]]
export default getTitle;