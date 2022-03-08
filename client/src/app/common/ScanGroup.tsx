import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getScangroup} from '../actions/creatorActions';
import isEmpty from '../helpers/isEmpty';
import getDescription from '../helpers/getDescription';
import getTitle from '../helpers/getTitle';
import Cover from '../modules/Cover';
import ReactMarkdown from 'react-markdown';
import ScanProperty from './ScanProperty';
import SimpleButton from './SimpleButton';

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
        this.checkNullEmpty = this.checkNullEmpty.bind(this);
    }

    checkNullEmpty(x:any){
        return (x===null || x==="")
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
            scangroupContent = <></>
            let {attributes,relationships} = this.props.creator.scan_group;
            
            scangroupContent = (
                <>
                <h1>{attributes.name}</h1>
                <br />
                <hr />
                <h4>Where to find</h4>
                <ScanProperty text={"Twitter"} pushTo={attributes.twitter} />
                <ScanProperty text={"Website"} pushTo={attributes.website} />
                <ScanProperty text={"Manga Updates"} pushTo={attributes.mangaUpdates} />
                {this.checkNullEmpty(attributes.discord)?
                    <></>:
                    <SimpleButton
                        text={"Discord"}
                        onClick={() => {window.location.replace("https://discord.gg/"+attributes.discord)}}
                    />
                }
                {this.checkNullEmpty(attributes.contactEmail)?<></>:
                <SimpleButton
                    text={"Email"}
                    onClick={() => {window.open(`mailto:${attributes.contactEmail}`)}}
                />
                }
                
                {this.checkNullEmpty(attributes.ircServer)?<></>:<p>IRC Server: {attributes.ircServer}</p>}
                {this.checkNullEmpty(attributes.ircChannel)?<></>:<p>IRC Channel:{attributes.ircChannel}</p>}
                <hr />
                <h4 className="mt-5">Description</h4>
                <ReactMarkdown children={attributes.description} />
                <hr />
                <h4 className="mt-5">Members</h4>
                {relationships.map((r:any) => { 
                    return (
                    <div className="mb-2">
                        <SimpleButton
                            text={<div>{r.type} {r.attributes.username}</div>}
                            onClick={() => {window.location.replace(`https://mangadex.org/user/${r.id}`)}}
                        />
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