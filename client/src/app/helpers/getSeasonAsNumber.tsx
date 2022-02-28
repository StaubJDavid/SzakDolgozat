const getSeasonAsNumber = (season:any) => {
  switch(season){
    case "Winter": return 0;
    case "Spring": return 1;
    case "Summer": return 2;
    case "Fall": return 3;
    default: return -1;
  }
}

export default getSeasonAsNumber;