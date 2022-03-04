import React, { Component} from 'react';
import {connect} from 'react-redux';
import {getLists, delList} from '../../actions/profileActions';
import InputEditList from '../../common/InputEditList';
import InputAddList from '../../common/InputAddList';
import ListEntries from './ListEntries';
import ListEntrySearch from './ListEntrySearch';
import timeFormat from '../../helpers/timeFormat';

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
                        <p className='text-center'>
                            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAddList" aria-expanded="false" aria-controls="collapseAddList">
                                Create new list
                            </button>
                        </p>
                        <div className="collapse" id="collapseAddList">
                                <InputAddList />
                        </div>
                    </div>):<></>}
                    <div className="table-responsive">
                        <table className='table'>
                            <tr>
                            <th>List name</th>
                            <th className="text-center">List visibility</th>
                            <th className="text-center">List created</th>
                            {owned?<th className="text-center">Delete List</th>:<></>}
                            {owned?<th className="text-center">Edit List</th>:<></>}
                            </tr>
                            {Object.keys(list_data).map((keyName, i) => { 
                                let cl = list_data[keyName]
                                return (
                                    <>
                                <tr key={cl.list_id}>
                                    <td data-bs-toggle="collapse" data-bs-target={`#collapseList${cl.list_id}`} aria-expanded="false" aria-controls={`collapseList${cl.list_id}`}>
                                        {cl.list_name}
                                    </td>
                                    <td className="text-center" data-bs-toggle="collapse" data-bs-target={`#collapseList${cl.list_id}`} aria-expanded="false" aria-controls={`collapseList${cl.list_id}`}>
                                        {cl.visibility}
                                    </td>
                                    <td className="text-center" data-bs-toggle="collapse" data-bs-target={`#collapseList${cl.list_id}`} aria-expanded="false" aria-controls={`collapseList${cl.list_id}`}>
                                        {timeFormat(cl.created)}
                                    </td>
                                    {owned?<td className="text-center"><button onClick={this.onDeleteListClick} data-id={cl.list_id} type="button" className="btn-close" aria-label="Close"></button></td>:<></>}
                                    {owned?<td className="text-center"><InputEditList list_id={cl.list_id} list_name={cl.list_name} list_visibility={cl.visibility}/></td>:<></>}
                                    
                                </tr>
                                <tr className='border-bottom' key={"c"+cl.list_id}>
                                    <td colSpan={owned?5:3}>
                                        <div className="collapse" id={`collapseList${cl.list_id}`}>
                                            <ListEntrySearch list_id={cl.list_id} />
                                            <ListEntries list={cl}/>
                                        </div>
                                    </td>
                                </tr>
                                </>
                            )})}
                        </table>
                    </div>
                </>
            )
        }

        return (
            <>
                {list && <div>This user has no public/friendly lists</div>}
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