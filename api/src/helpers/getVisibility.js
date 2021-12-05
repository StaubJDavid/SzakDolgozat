const getVisibility = value => {
  let visibility = "";

  switch(parseInt(value)){
    case 0:visibility = "private";break;
    case 1:visibility = "public";break;
    case 2:visibility = "friends";break;
    default:visibility = "unknown";break;
  }

  return visibility;
}

module.exports = getVisibility;