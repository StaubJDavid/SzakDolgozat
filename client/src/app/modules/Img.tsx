import {FC} from 'react'

type Props = {
  src: string
}

const Img: FC<Props> = ({src}) => {
  return (
    <img className='mb-3' style={{maxWidth:"100%",maxHeight:"100vh",height:"auto"}} src={src} alt="Waaaa"></img>
  )  
}

export {Img}