export const listVisibilityNumToText = (val:number) => {
    switch(val){
        case 0: return "private";
        case 1: return "public";
        case 2: return "friends";
        default: return "unknown";
    }
}

export const listVisibilityTextToNum = (val:string) => {
    switch(val){
        case "private": return 0;
        case "public": return 1;
        case "friends": return 2;
        default: return -1;
    }
}
