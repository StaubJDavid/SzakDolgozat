import React, { Component} from 'react';
import {connect} from 'react-redux';
import {addListEntry} from '../../actions/profileActions';
import "bootstrap/js/src/collapse.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import SearchBar from '../../common/SearchBar';
import ListEntryRow from './ListEntryRow';

type Props = {
    auth:any,
    manga:any,
    errors:any,
    profile:any,
    list_id:any,
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

        this.onAddListEntry = this.onAddListEntry.bind(this);
    }

    onAddListEntry(e:any){
        this.props.addListEntry(
            this.props.auth.user.id,
            this.props.list_id,
            String(e.target.getAttribute("data-id")),
            String(e.target.getAttribute("data-name"))
        );
    }

    render() {
        const {owned} = this.props.profile.profile;
        let manga_search_results = this.props.manga.manga_search.data;
        //console.log(this.props.list_id);

        return (
            <>
            {owned?(<>
                <p>
                    <button className="btn-black" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseAddEntry${this.props.list_id}`} aria-expanded="false" aria-controls={`collapseAddEntry${this.props.list_id}`}>
                        Search for manga
                    </button>
                </p>
                <div className="collapse" id={`collapseAddEntry${this.props.list_id}`}>
                    <SearchBar />
                    <ul className="list-group list-group-flush rounded bg-black py-2">
                        {manga_search_results?manga_search_results.map((element:any, i:number) => {
                            return  <li key={element.id} className="list-group-item bg-black">
                                        <ListEntryRow element={element}  list_id={this.props.list_id}/>
                                    </li>
                        }):<></>}
                    </ul>
                </div>
            </>):(<></>)}
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
export default connect(mapStateToProps,{addListEntry})(ListEntries);