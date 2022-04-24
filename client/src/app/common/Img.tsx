import {FC, useState, useEffect, Component} from 'react'
import axios from 'axios'

type Props = {
  refState: any,
  baseUrl:any,
  hash:any,
  chd:any
}

function getProxyChapter(hash:string,filename:string) {
  return axios.get(`${process.env.REACT_APP_PROXY_URL_BASE}/chapter/${hash}/${filename}`)
}

//Komponens létrehozása {komponens, tulajdonságai}
const Img: FC<Props> = ({refState, baseUrl, hash, chd}) => {
  //Állapot létrehozása
  const [imgSrc, setImgSrc] = useState("");

  //Életciklus, amikor a baseUrl, hash, chd változó változik, lefut
  useEffect(() => {
    async function fetchData() {
      const ownResponse = await getProxyChapter(hash,chd);
      setImgSrc(ownResponse.data.url)
    }

    fetchData();
  },[baseUrl,hash,chd])

  //Return-ben adjuk vissza a html kódot ami megjelenik a weboldalon
  return (
    <>
    <img 
      ref={(ref:any) => {if(ref !== null)refState.push(ref)}}
      className='mb-3'
      style={{maxWidth:"100%",maxHeight:"100vh",height:"auto"}}
      src={imgSrc}
      alt={chd}>
    </img>
    <br />
    </>
  )  
}

export {Img}