import React, { Component} from 'react';
import {connect} from 'react-redux';
import {getLists, delList} from '../../actions/profileActions';
import InputEditList from '../../common/InputEditList';
import InputAddList from '../../common/InputAddList';
import ListEntries from './ListEntries';
import ListEntrySearch from './ListEntrySearch';

type Props = {
    auth:any,
    manga:any,
    errors:any,
    profile:any,
    getLists:any,
    delList:any
}

type State = {
    errors: any
}


class Lists extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
            errors: {}
        }

        this.onDeleteListClick = this.onDeleteListClick.bind(this);
    }

    componentDidMount(){   
        this.props.getLists(this.props.profile.profile.id);
    }

    onDeleteListClick(e:any){
        this.props.delList(
            Number(e.target.getAttribute("data-id")),
            Number(this.props.profile.profile.id)
        );
    }

    render() {
        const {list} = this.props.errors; 
        const {owned} = this.props.profile.profile;

        let listContent = <></>;

        if(this.props.profile.lists !== null && !this.props.profile.loading){
            let list_data = this.props.profile.lists.list_array;
            
            listContent = (
                <>
                    {owned?(<div>
                        <p>
                            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAddList" aria-expanded="false" aria-controls="collapseAddList">
                                Create new list
                            </button>
                        </p>
                        <div className="collapse" id="collapseAddList">
                                <InputAddList />
                        </div>
                    </div>):<></>}
                    <ul>
                        {Object.keys(list_data).map((keyName, i) => { 
                            let cl = list_data[keyName]
                            return (
                            <li key={cl.list_id}>
                                <span data-bs-toggle="collapse" data-bs-target={`#collapseList${cl.list_id}`} aria-expanded="false" aria-controls={`collapseList${cl.list_id}`}>Name: {cl.list_name} | </span>
                                <span>Visibility: {cl.visibility} | </span>
                                <span>Created at: {cl.created}</span>
                                {owned?<button onClick={this.onDeleteListClick} data-id={cl.list_id} type="button" className="btn-close" aria-label="Close"></button>:<></>}
                                <InputEditList list_id={cl.list_id} list_name={cl.list_name} list_visibility={cl.visibility}/>
                                <div className="collapse" id={`collapseList${cl.list_id}`}>
                                    <ListEntrySearch list_id={cl.list_id} />
                                    <ListEntries list={cl}/>
                                </div>
                            </li>
                        )})}
                    </ul>
                </>
            )
        }

        return (
            <>
                {list && <div>{list}</div>}
                {listContent}
                
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
export default connect(mapStateToProps,{getLists,delList})(Lists);