const getMangaTitle = (relationships,language) => {
  const manga = relationships.find((r) => r.type === 'manga');
  
  if(manga === undefined){
    return "";
  }else{
    const altTitle = manga.attributes.altTitles.find((t) => t.hasOwnProperty(language));
    if(altTitle === undefined){
      if(manga.attributes.title.hasOwnProperty(language)){
        return manga.attributes.title[language];
      }else if (manga.attributes.title.hasOwnProperty('en')){
        return manga.attributes.title.en;
      }else{
        return title[Object.keys(title)[0]];
      }
    }else{
      return altTitle[language]
    }
  }
}

module.exports = getMangaTitle;