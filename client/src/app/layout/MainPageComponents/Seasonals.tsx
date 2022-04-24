import React, {FC, useState} from 'react'
import getTitle from '../../helpers/getTitle';
import sortSeasonal from '../../helpers/sortSeasonal';
import SearchResult from '../../modules/TableRows/SearchResult';
import CarouselItem from '../../modules/TableRows/Carousel_Item';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import classnames from 'classnames';
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
    seasonals:any,
    history:any
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
const Seasonals: FC<Props> = ({seasonals,history}) => {
    const [index, setIndex] = useState(0);
    const [leftHover, setLeftHover] = useState(false);
    const [rightHover, setRightHover] = useState(false);

    function onArrowClick(direction:any){
        if(direction === 1 && index === (seasonals.length-1)){
            setIndex(0);
        }else if(direction === -1 && index === 0){
            setIndex(seasonals.length - 1);
        }else{
            setIndex(index + direction);
        }
    }

    if(seasonals.length===0){
        return (
            <div>
            </div>
        )
    }else{
        let carousels:any = [];
        let carouselname:any = [];
        seasonals.map((s:any) => {
            carousels.push(<Carousel customRightArrow={<CustomRightArrow />} customLeftArrow={<CustomLeftArrow />} responsive={responsive} infinite={true} showDots={true}>
                {s.data.map((m:any) => (
                    <div>
                        <CarouselItem key={"mfm"+m.id}
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
            )
            carouselname.push(s.name);

            return null;
        });

        return (
            <>
            <div className="bg-orange border-bottom border-dark border-3 rounded mb-2 d-flex justify-content-center align-items-center">
                <i
                    style={{cursor:"pointer"}}
                    onClick={() => onArrowClick(-1)}
                    onMouseEnter={() => setLeftHover(true)}
                    onMouseLeave={() => setLeftHover(false)}
                    className={classnames("bi fa-xl",{"bi-arrow-left-circle":!leftHover, "bi-arrow-left-circle-fill":leftHover})}
                ></i>
                <h1 className={"text-center mx-2 own-font"}>{carouselname[index]}</h1>
                <i
                    style={{cursor:"pointer"}}
                    onClick={() => onArrowClick(1)}
                    onMouseEnter={() => setRightHover(true)}
                    onMouseLeave={() => setRightHover(false)}
                    className={classnames("bi fa-xl",{"bi-arrow-right-circle":!rightHover, "bi-arrow-right-circle-fill":rightHover})}
                ></i>
            </div>
            {carousels[index]}
            </>
        )
    }  
}


export default Seasonals;