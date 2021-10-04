/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

type Props = {
  src: string
}

// function getCover(cover_id:string) {
//   return axios.get<{data:any, result: any}>(`https://api.mangadex.org/cover/${cover_id}`)
// }

// function changeRes(url:string,res:string){
//   switch(res){
//     case "512": url = url + ".512.jpg"; break;
//     case "256": url = url + ".256.jpg"; break;
//     case "og": break;
//     default: break;
//   }
//   return url;
// }

const Img: FC<Props> = ({src}) => {

  // const [isLoading, setLoading] = useState(true);
  // // const [showSplashScreen, setShowSplashScreen] = useState(true)
  // const [data, setData] = useState<any>();
  // useEffect(() => {
  //     const Data = async () => {
  //       try {
  //         const response = await getCover(cover_id);
  //         console.log(response.data);
  //         setData(`https://uploads.mangadex.org/covers/${manga_id}/${response.data.data.attributes.fileName}`);
  //         setLoading(false)
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  
  //     Data()
  //   }, []);


  return (
    <img src={src} alt="Waaaa"></img>
  )

  
}

export {Img}