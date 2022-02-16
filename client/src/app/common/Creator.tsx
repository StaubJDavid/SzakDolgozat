import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCreator} from '../actions/creatorActions';
import isEmpty from '../helpers/isEmpty';
import getDescription from '../helpers/getDescription';
import getTitle from '../helpers/getTitle';
import Cover from '../modules/Cover';
import ReactMarkdown from 'react-markdown';

type Props = {
    location:any,
    match:any,
    creator:any,
    getCreator:any
}

type State = {
}

class Creator extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
        }
        
    }

    componentDidMount() {
        //this.props.clearMangaSearch();
        if(this.props.location.state){
            //console.log("Doing the link state: ", this.props.location.state.manga_id)
            this.props.getCreator(this.props.location.state.creator.id);
            //this.setState({creator:this.props.location.state.creator})
        }else{
            let url = window.location.href;
            url = url.slice(url.lastIndexOf('/')+1,url.length);
            //console.log("Doing the not link thing: ", url)
            //this.props.getManga(url);

            this.props.getCreator(url)
        }
    }

    componentDidUpdate(prevProps:any) {
        if(this.props.match.params.creator_id !== prevProps.match.params.creator_id){
          let url = window.location.href;
          url = url.slice(url.lastIndexOf('/')+1,url.length);
          //this.props.getMangaImages(url);
          //this.setState({ch_id: url});
          this.props.getCreator(url);
        }
      }

    render() {

        let creatorContent = <></>;

        if(!isEmpty(this.props.creator.creator)){
            let {attributes,relationships} = this.props.creator.creator;
            let {name,imageUrl,biography} = attributes;
            let keyCheck = ["name", "imageUrl", "biography", "createdAt", "updatedAt", "version"];

            creatorContent = (
                <>
                {this.props.creator.creator.attributes.name}
                {Object.keys(attributes).map((keyName, i) => { 
                    //let cl = list_data[keyName];
                    //console.log(String(keyName), attributes[keyName]);
                    if(!keyCheck.includes(String(keyName)) && attributes[keyName] != null){
                        //console.log("xd");
                        return <div key={String(keyName)}><a href={attributes[keyName]}>{attributes[keyName]}</a></div>
                    }else{
                        return <></>
                    }
                })}
                {relationships.map((r:any) => { 
                    //let cl = list_data[keyName];
                    //console.log(String(keyName), attributes[keyName]);
                    if(r.type === "manga"){
                        //console.log("xd");
                        return (
                            <div>
                                <Cover height={50} width={50} manga_id={r.id} cover_id={""} />
                                <Link to={'/manga/'+ r.id}><h1 className="display-4 text-center">{getTitle(r.attributes.title)}</h1></Link>
                                <p className="lead"><ReactMarkdown children={getDescription(r.attributes.description)} /></p>
                            </div>
                        )
                    }else{
                        return <></>
                    }
                })}
                </>
            )
        }

        return (
            <div>
                {creatorContent}
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    creator: state.creator
});

export default connect(mapStateToProps,{getCreator})(Creator);