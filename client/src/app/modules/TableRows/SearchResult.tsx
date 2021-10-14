/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Cover} from '../Cover'

type Props = {
  passFc: any,
  id: string,
  title: string,
  status: string,
  relationships: any,
  demography:any,
  description:any
}

const SearchResult: FC<Props> = ({passFc, id, title, status, relationships, demography, description}) => {
  return (
      // <tr key={id}>
      //   <td className="align-middle">
      //     <Cover height={25} width={25} manga_id={id} cover_id={relationships.find((o:any) => o.type === 'cover_art').id} />
      //   </td>
      //   <td className="align-middle" onClick={() => {passFc(id)}}>
      //     {title}
      //   </td>
      //   <td className="align-middle">
      //     {status}
      //   </td>
      //   <td className="align-middle">
      //     {demography}
      //   </td>
      //   <td className="w-25 align-middle">
      //     {description}
      //   </td>
      // </tr>
    <div className="card card-body">
      <div className="row">
        <div className="col-2 align-self-center">
          <Cover height={100} width={100} manga_id={id} cover_id={relationships.find((o:any) => o.type === 'cover_art').id} />
        </div>
        <div className="col-2 align-self-center">
          <p className="text-center" onClick={() => {passFc(id)}}>{title}</p>
          <br />
          <p className="text-center">{status}</p>
          <br />
          <p className="text-center">{demography}</p>
        </div>
        <div className="col-8 align-self-center">
          <p className="align-middle">{description}</p>
        </div>
      </div>
    </div>                
  )
}

//{passedFc, currentPage, total, limit, maxPage}
export {SearchResult}
