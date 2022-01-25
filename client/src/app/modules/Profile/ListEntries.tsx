import React, { Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {delListEntry, addListEntry} from '../../actions/profileActions';
import SearchBar from '../../common/SearchBar';
import InputEditList from '../../common/InputEditList';
import InputAddList from '../../common/InputAddList';

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
            Number(e.target.getAttribute("data-id"))
        );
    }

    render() {
        const {owned} = this.props.profile.profile;

        console.log(this.props.list);

        return (
            <>
            <ul>
                {this.props.list.data.map((e:any)=>{
                    return (
                    <li key={e.ld_id}>
                        <Link to={'/manga/'+ e.manga_id} >{e.manga_name}</Link>
                        {owned?<button onClick={this.onDeleteEntry} data-id={e.ld_id} type="button" className="btn-close" aria-label="Close"></button>:<></>}
                    </li>)
                })}
            </ul>
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
export default connect(mapStateToProps,{delListEntry,addListEntry})(ListEntries);