import React, {FC} from 'react'
import SearchResult from '../../modules/TableRows/SearchResult';

type Props = {
    mangas:any
}

const MostFollowedMangas: FC<Props> = ({mangas}) => {

    if(mangas.length===0){
        return (
            <div>
                Most Followed Mangas
            </div>
        )
    }else{
        return (
            <>
            <div>Most Followed Mangas</div>
            <div className="d-flex flex-column justify-content-center">
              {mangas.map((m:any) => (
                <SearchResult key={"mfm"+m.id}
                    id={m.id}
                    demography={m.attributes.publicationDemographic}
                    description={m.attributes.description}
                    title={m.attributes.title[Object.getOwnPropertyNames(m.attributes.title)[0]]}
                    status={m.attributes.status}
                    relationships={m.relationships}
                    desc_length={100}
                />
              ))}                  
            </div>
            </>
        )
    }  
}


export default MostFollowedMangas;