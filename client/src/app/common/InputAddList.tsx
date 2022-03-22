import React, { Component} from 'react';
import {connect} from 'react-redux';
import TextInput from './TextInput';
import TextArea from './TextArea';
import "bootstrap/js/src/collapse.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {listVisibilityTextToNum,listVisibilityNumToText} from '../helpers/listVisibility';
import {addList} from '../actions/profileActions'

type Props = {
    auth:any,
    profile:any,
    manga:any,
    errors:any,
    addList:any,
}

type State = {
    value:string,
    visibility:number,
    errors: any
}


class InputAddList extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
            value: "",
            visibility: 0,
            errors: {},
        }

        this.onChangeEdit = this.onChangeEdit.bind(this);
        this.onSelectEdit = this.onSelectEdit.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
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
        this.props.addList(
            this.props.auth.user.id,
            this.state.value,
            this.state.visibility
        )
    }

    render() {
        const {owned} = this.props.profile.profile;

        return (
            <div>
                {owned?(
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <TextArea
                                name="value" 
                                maxlength={255}
                                value={this.state.value}
                                error={this.state.errors.thing} 
                                onChange={this.onChangeEdit}  
                                placeholder="List Name"
                                disabled={false}
                            />
                        </div>
                        <div className="col-md-2 align-middle text-center">
                            <select onChange={this.onSelectEdit} value={this.state.visibility} id="l_visibility">
                                <option value={0} >Private</option>
                                <option value={1} >Public</option>
                                <option value={2} >Friends</option>
                            </select>
                        </div>
                        <div className="col-md-2 text-center">
                            <button onClick={this.onSaveClick} className="btn-black" type="button" >Create</button>
                        </div>
                    </div>
                    </div>
                    ):<></>}
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

export default connect(mapStateToProps,{addList})(InputAddList);