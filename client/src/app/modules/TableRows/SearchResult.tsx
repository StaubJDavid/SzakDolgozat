/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, Component} from 'react'
import Cover from '../Cover'
import {Link} from 'react-router-dom';

type Props = {
  id: string,
  title: string,
  status: string,
  relationships: any,
  demography:any,
  description:any,
  desc_length:number
}

type State = {}

class SearchResult extends Component<Props,State> {
  render() {
    const {id,title,status,relationships,demography,description} = this.props;
    let desc = "";
    //obj[Object.keys(obj)[0]];
    if(description.hasOwnProperty('en')){
      desc = description.en.slice(0,this.props.desc_length) + "...";
    }else{
      console.log("Has no en: ");
      console.log(id);
      desc = description[Object.keys(description)[0]].slice(0,this.props.desc_length) + "...";
    }
    //console.log(this.props);
    return (
      <div className="card card-body">
        <div className="row justify-content-md-center">
          <div className="d-flex justify-content-center col-md-2 align-self-center">
            <Cover height={50} width={50} manga_id={id} cover_id={relationships.find((o:any) => o.type === "cover_art")?relationships.find((o:any) => o.type === "cover_art").id:""} />
          </div>
          <div className="col-sm-2 align-self-center">
            <Link className="text-center"
            to={{
              pathname: `/manga/${id}`,
              state: {
                  manga_id: id
              }
            }}>{title}</Link>
            <p className="text-center">{status}</p>
            <p className="text-center">{demography}</p>
          </div>
          {description!==""?(<div className="col-md-8 align-self-center">
            <p className="align-middle">{desc}</p>
          </div>):(<></>)}
        </div>
      </div>               
    )
  }
  
}


export default SearchResult;
