import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getScangroup} from '../actions/creatorActions';
import isEmpty from '../helpers/isEmpty';
import getDescription from '../helpers/getDescription';
import getTitle from '../helpers/getTitle';
import Cover from '../modules/Cover';
import ReactMarkdown from 'react-markdown';

type Props = {
    location:any,
    match:any,
    creator:any,
    getScangroup:any
}

type State = {
}

class ScanGroup extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
        }
        
    }

    componentDidMount() {
        //this.props.clearMangaSearch();
        if(this.props.location.state){
            //console.log("Doing the link state: ", this.props.location.state.manga_id)
            this.props.getScangroup(this.props.location.state.scangroup.id);
            //this.setState({creator:this.props.location.state.creator})
        }else{
            let url = window.location.href;
            url = url.slice(url.lastIndexOf('/')+1,url.length);
            //console.log("Doing the not link thing: ", url)
            //this.props.getManga(url);

            this.props.getScangroup(url)
        }
    }

    componentDidUpdate(prevProps:any) {
        if(this.props.match.params.creator_id !== prevProps.match.params.creator_id){
          let url = window.location.href;
          url = url.slice(url.lastIndexOf('/')+1,url.length);
          //this.props.getMangaImages(url);
          //this.setState({ch_id: url});
          this.props.getScangroup(url);
        }
      }

    render() {

        let scangroupContent = <></>;

        if(!isEmpty(this.props.creator.scan_group)){
            scangroupContent = <div>WE gucci</div>
            let {attributes,relationships} = this.props.creator.scan_group;
            let {name,imageUrl,biography} = attributes;
            let keyCheck = ["name", "imageUrl", "biography", "createdAt", "updatedAt", "version"];

            scangroupContent = (
                <>
                {attributes.name}
                <br />
                {attributes.website==null?<></>:<a href={attributes.website}>{attributes.website}</a>}
                {attributes.twitter==null?<></>:<a href={attributes.twitter}>{attributes.twitter}</a>}
                {attributes.mangaUpdates==null?<></>:<a href={attributes.mangaUpdates}>{attributes.mangaUpdates}</a>}
                {attributes.ircServer==null?<></>:<p>IRC Server: {attributes.ircServer}</p>}
                {attributes.ircChannel==null?<></>:<p>IRC Channel:{attributes.ircChannel}</p>}
                {attributes.discord==null?<></>:<p>Discord: {attributes.discord}</p>}
                {attributes.contactEmail==null?<></>:<p>Email: {attributes.contactEmail}</p>}
                <ReactMarkdown children={attributes.description} />
                {relationships.map((r:any) => { 
                    return (
                    <div>
                        {r.type}: {r.attributes.username} <a href={`https://mangadex.org/user/${r.id}`}>Check out at MangaDex</a>
                    </div>
                    )
                })}
                </>
            )
        }

        return (
            <div>
                {scangroupContent}
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    creator: state.creator
});

export default connect(mapStateToProps,{getScangroup})(ScanGroup);