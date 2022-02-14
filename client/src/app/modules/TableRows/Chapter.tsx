/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, Component} from 'react'
import Cover from '../Cover'
import {Link} from 'react-router-dom';
import getTitle from '../../helpers/getTitle';
import getChapterTitle from '../../helpers/getChapterTitle';

type Props = {
  chapter:any
}

const Chapter: FC<Props> = ({chapter}) => {
  let scanlation_group = chapter.relationships.find((o:any) => o.type === "scanlation_group");
  let manga = chapter.relationships.find((o:any) => o.type === "manga");
  let cover_art = chapter.relationships.find((o:any) => o.type === "cover_art");

  return (<>{
    <div className="card card-body">
      <div className="row justify-content-md-center">
        <div className="d-flex justify-content-center col-md-2 align-self-center">
          <Cover height={50} width={50} manga_id={manga.id} cover_id={cover_art===undefined?"":cover_art.id} />
        </div>
        <div className="col-sm-2 align-self-center">
          <Link className="text-center"
          to={{
            pathname: `/manga/${manga.id}`,
            state: {
                manga_id: manga.id
            }
          }}>{getTitle(manga.attributes.title)}</Link>
          <br />
          {scanlation_group?(<Link className="text-center"
          to={{
            pathname: `/scanlation/${scanlation_group.id}`,
            state: {
              group_id: scanlation_group.id
            }
          }}>{scanlation_group.attributes.name}</Link>):<>No Scan group</>}
          <div>{getChapterTitle(chapter.attributes)}</div>
        </div>
      </div>
        </div>}
      </>            
  )
}

export default Chapter;
