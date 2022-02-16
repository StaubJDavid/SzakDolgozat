import React, {FC} from 'react'
import getTitle from '../../helpers/getTitle';
import SearchResult from '../../modules/TableRows/SearchResult';

type Props = {
    seasonals:any
}

//Mangadex által előállított manga lista
//Egyszerre majd 1 seasonal lista jelenjen meg, listák között lehessen váltani
//Egyelőre mindent kiirat
//Seasonal: Summer 2021
//Seasonal: Fall 2021
//Seasonal: Winter 2022
//...
//Seasonal: Spring 2022
//Seasonal: Summer 2022
//Seasonal: Fall 2022
const Seasonals: FC<Props> = ({seasonals}) => {

    if(seasonals.length===0){
        return (
            <div>
                Seasonal
            </div>
        )
    }else{
        return (
            <>
            <div>Seasonal</div>
            {seasonals.map((s:any) => (
                <div className="d-flex flex-column justify-content-center">
                <div>{s.name}</div>
                {s.data.map((m:any) => (
                  <SearchResult key={"mfm"+m.id}
                      id={m.id}
                      demography={m.attributes.publicationDemographic}
                      description={m.attributes.description}
                      title={getTitle(m.attributes.title)}
                      status={m.attributes.status}
                      relationships={m.relationships}
                      desc_length={100}
                  />
                ))}                  
              </div>
            ))}
            </>
        )
    }  
}


export default Seasonals;