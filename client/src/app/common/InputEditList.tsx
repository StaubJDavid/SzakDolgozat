import React, { Component} from 'react';
import {connect} from 'react-redux';
import TextInput from './TextInput';
import "bootstrap/js/src/collapse.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {listVisibilityTextToNum,listVisibilityNumToText} from '../helpers/listVisibility';
import {editList} from '../actions/profileActions'

type Props = {
    auth:any,
    profile:any,
    manga:any,
    errors:any,
    editList:any,
    list_id:number,
    list_name:string,
    list_visibility:string
}

type State = {
    value:string,
    visibility:number,
    errors: any,
    edit_disabled: boolean,
}


class InputEditList extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
            value: this.props.list_name,
            visibility: listVisibilityTextToNum(this.props.list_visibility),
            errors: {},
            edit_disabled:true,
        }

        this.onEditClick = this.onEditClick.bind(this);
        this.onChangeEdit = this.onChangeEdit.bind(this);
        this.onSelectEdit = this.onSelectEdit.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
    }

    onEditClick(e:any){
        console.log("Clicked on Edit");
        this.setState({value:this.props.list_name});
        this.setState({visibility:listVisibilityTextToNum(this.props.list_visibility)});
        this.setState({edit_disabled:!this.state.edit_disabled});
    }

    onChangeEdit(e:any){
        this.setState({value: String(e.target.value)} as any);
    }

    onSelectEdit(e:any){
        //this.setState({value: String(e.target.value)} as any);
        this.setState({visibility: Number(e.target.value)} as any);
        console.log(e.target.value);
    }

    onSaveClick(e:any){
        this.onEditClick({});  

        if(this.state.value == this.props.list_name && this.state.visibility == listVisibilityTextToNum(this.props.list_visibility)){
            console.log("No changes, not calling anything");
        }else{
            this.props.editList(
                this.props.auth.user.id,
                this.props.list_id,
                this.state.value,
                this.state.visibility
            )
        }
    }

    render() {
        const {owned} = this.props.profile.profile;

        return (
            <div>
                {owned?(<><i onClick={this.onEditClick} className="bi bi-pencil fa-5x" data-bs-toggle="collapse" data-bs-target={`#collapseEditSave${this.props.list_id}`} aria-expanded="false" aria-controls={`collapseEditSave${this.props.list_id}`}/>
                    <div> 
                        <div className="collapse" id={`collapseEditSave${this.props.list_id}`}>
                            <TextInput
                                name="value" 
                                value={this.state.value}
                                error={this.state.errors.thing}
                                type="text"
                                onChange={this.onChangeEdit}  
                                placeholder="List Name"
                                disabled={this.state.edit_disabled}
                            />
                            <select onChange={this.onSelectEdit} value={this.state.visibility} id="l_visibility">
                                <option value={0} >Private</option>
                                <option value={1} >Public</option>
                                <option value={2} >Friends</option>
                            </select>
                            <button onClick={this.onSaveClick} className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseEditSave${this.props.list_id}`} aria-expanded="false" aria-controls={`collapseEditSave${this.props.list_id}`}>Save</button>
                        </div>
        </div></>):<></>}
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    auth: state.auth,
    profile: state.profile,
    manga: state.manga,
    errors: state.errors
});

export default connect(mapStateToProps,{editList})(InputEditList);