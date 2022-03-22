import {FC, useState, useEffect, Component} from 'react'
import axios from 'axios'

type Props = {
  ref: any,
  baseUrl:any,
  hash:any,
  chd:any
}

function getProxyChapter(hash:string,filename:string) {
  return axios.get(`http://80.98.214.13:3000/chapter/${hash}/${filename}`)
}

/*async onGetImgSrc(baseurl:any,hash:any,filename:any){
  const ownResponse = await this.getProxyChapter(baseurl, hash, filename);
  //this.setState({data:ownResponse.data.url});
  return ownResponse.data.url;
}*/
//this.onGetImgSrc(baseUrl,chapter.hash,chd)

const Img: FC<Props> = ({ref, baseUrl, hash, chd}) => {
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
      ref={ref}
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