import React, {FC} from 'react'
import Chapter from '../../modules/TableRows/Chapter';

type Props = {
    chapters:any
}

const LatestChapters: FC<Props> = ({chapters}) => {
    let req = "";
    chapters.map((c:any) => (
        req += "&manga[]="+c.relationships.find((o:any) => o.type === "manga").id
      ))

    //console.log(req);

    if(chapters.length===0){
        return (
            <div>
                Latest Updates
            </div>
        )
    }else{
        return (
            <>
            <div>Latest Updates</div>
            <div className="d-flex flex-column justify-content-center">
              {chapters.map((c:any) => (
                <Chapter key={"mfm"+c.id}
                    chapter={c}
                />
              ))}                  
            </div>
            </>
        )
    }  
}


export default LatestChapters;