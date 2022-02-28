/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, Component} from 'react';
import Cover from '../Cover';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {withRouter} from 'react-router-dom';

type Props = {
  history:any,
  id: string,
  title: string,
  status: string,
  relationships: any,
  demography:any,
  description:any,
  desc_length:number
}

type State = {}

class CarouselItem extends Component<Props,State> {
  onCarouselItemClick(id:any){
    console.log(id);
    this.props.history.push(`/manga/${id}`, { manga_id: id});
  }

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
        <div onClick={() => this.onCarouselItemClick(id)} className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <Cover height={100} width={100} manga_id={id} relationships={relationships} />
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12">
                      <p>{title}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                    {description!==""?(
                      <span className="align-middle"><ReactMarkdown children={desc} /></span>):(<></>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
  }
  
}


export default CarouselItem;
