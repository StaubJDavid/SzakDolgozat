import React, {FC} from 'react'
import SearchResult from '../../modules/TableRows/SearchResult';
import CarouselItem from '../../modules/TableRows/Carousel_Item';
import getTitle from '../../helpers/getTitle';
import {withRouter} from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomRightArrow from '../../common/CustomRightArrow';
import CustomLeftArrow from '../../common/CustomLeftArrow';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

type Props = {
    mangas:any,
    history:any
}

const MostFollowedMangas: FC<Props> = ({mangas, history}) => {
    if(mangas.length===0){
        return (
            <>
                <h1 className={"bg-orange border-bottom border-dark own-font border-3 rounded mb-2 pb-1 text-center"}>Most Followed Mangas</h1>
            </>
        )
    }else{
        return (
            <>
              <h1 className={"bg-orange border-bottom border-dark border-3 own-font rounded mb-2 pb-1 text-center"}>Most Followed Mangas</h1>
              <Carousel customRightArrow={<CustomRightArrow />} customLeftArrow={<CustomLeftArrow />} responsive={responsive}>
              {mangas.map((m:any) => (
                  <div><CarouselItem key={"mfm"+m.id}
                      history={history}
                      id={m.id}
                      demography={m.attributes.publicationDemographic}
                      description={m.attributes.description}
                      title={getTitle(m.attributes.title)}
                      status={m.attributes.status}
                      relationships={m.relationships}
                      desc_length={100}
                  /></div>
              ))}
              </Carousel>
            </>
        )
    }  
}


export default MostFollowedMangas;