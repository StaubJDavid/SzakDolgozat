import {FC} from 'react'

type Props = {
  src: string
}

const Img: FC<Props> = ({src}) => {
  return (
    <img src={src} alt="Waaaa"></img>
  )  
}

export {Img}