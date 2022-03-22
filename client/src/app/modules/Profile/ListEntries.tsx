import React, { Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {delListEntry, addListEntry} from '../../actions/profileActions';
import TextLinkDelete from '../../common/TextLinkDelete';
import TextLinkDeleteTwo from '../../common/TextLinkDeleteTwo';

type Props = {
    auth:any,
    manga:any,
    errors:any,
    profile:any,
    list:any,
    delListEntry:any,
    addListEntry:any
}

type State = {
    errors: any
}


class ListEntries extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
            errors: {}
        }

        this.onDeleteEntry = this.onDeleteEntry.bind(this);
    }

    onDeleteEntry(e:any){
        this.props.delListEntry(
            this.props.auth.user.id,
            this.props.list.list_id,
            Number(e)
        );
    }

    render() {
        const {owned} = this.props.profile.profile;

        //console.log(this.props.list);

        let content = <></>
        if(this.props.list.data.length === 0){
            content = (
                <div>This list contains no items</div>
            )
        }else{
            content = (
                <div className="container bg-black rounded mt-2 px-3 py-3">
                    {this.props.list.data.map((element:any, i:number) => {
                        return  <TextLinkDeleteTwo key={element.ld_id}
                                    url={'/manga/'+ element.manga_id}  
                                    state_object={{}}
                                    owned={owned}
                                    text={element.manga_name}
                                    onClick={this.onDeleteEntry}
                                    onClickData={element.ld_id}
                                />
                        })}
                </div>
            )
        }

        return (
            <>
                {content}
            </>
        )
    }
}

const mapStateToProps = (state:any)=>({
    auth:state.auth,
    manga: state.manga,
    errors: state.errors,
    profile: state.profile
});
//TODO: CLEAN UP REMAINING AUTH STATE
/*
                <ul>
                    {this.props.list.data.map((e:any)=>{
                        return (
                        <li key={e.ld_id}>
                            <Link to={'/manga/'+ e.manga_id} >{e.manga_name}</Link>
                            {owned?<button onClick={this.onDeleteEntry} data-id={e.ld_id} type="button" className="btn-close" aria-label="Close"></button>:<></>}
                        </li>)
                    })}
                </ul> */
export default connect(mapStateToProps,{delListEntry,addListEntry})(ListEntries);