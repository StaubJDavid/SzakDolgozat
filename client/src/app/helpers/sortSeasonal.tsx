import getSeasonAsNumber from "./getSeasonAsNumber";

const sortSeasonal = (x:any,y:any) => {
  const xwords = x.name.split(' ');
  const ywords = y.name.split(' ');

  if(Number(xwords[2]) < Number(ywords[2])){
    return 1;
  }else if(Number(xwords[2]) === Number(ywords[2])){
    if(getSeasonAsNumber(xwords[1]) < getSeasonAsNumber(ywords[1])){
      return 1;
    }else if(getSeasonAsNumber(xwords[1]) === getSeasonAsNumber(ywords[1])){
      return 0;
    }else{
      return -1;
    }
  }else{
    return -1;
  }
}

export default sortSeasonal;