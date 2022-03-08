import React, {FC} from 'react'
import Chapter from '../../modules/TableRows/Chapter';
import FourColumnGridRow from '../../modules/TableRows/FourColumnGridRow';
import parse from 'html-react-parser';

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
                <h1 className={"bg-info rounded mb-2 pb-1 text-center"}>Latest Updates</h1>
            </div>
        )
    }else{

          let html = [];
          for(let i = 0; i < 24; i+=4){
              html.push(<FourColumnGridRow chapters={chapters} index={i} />);
          }

        return (
            <>
            <h1 className={"bg-info rounded mb-2 pb-1 text-center"}>Latest Updates</h1>
            <div className="container-fluid">
              {html}                  
            </div>
            </>
        )
    }  
}


export default LatestChapters;