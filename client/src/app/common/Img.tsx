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

/*async onGetImgSrc(baseurl:any,hash:any,filename:any){
  const ownResponse = await this.getProxyChapter(baseurl, hash, filename);
  //this.setState({data:ownResponse.data.url});
  return ownResponse.data.url;
}*/
//this.onGetImgSrc(baseUrl,chapter.hash,chd)

const Img: FC<Props> = ({refState, baseUrl, hash, chd}) => {
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    
    //this.setState({data:ownResponse.data.url});
    async function fetchData() {
      // You can await here
      const ownResponse = await getProxyChapter(hash,chd);
      setImgSrc(ownResponse.data.url)
    }
    fetchData();
  },[baseUrl,hash,chd])

  return (
    <>
    <img 
      ref={(ref:any) => {if(ref !== null)refState.push(ref)}}
      className='mb-3'
      style={{maxWidth:"100%",maxHeight:"100vh",height:"auto"}}
      src={imgSrc}
      alt="Waaaa">
    </img>
    <br />
    </>
  )  
}

export {Img}