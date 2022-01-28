import React, { Component} from 'react';
import {connect} from 'react-redux';
import Comment from './Comment';
import {getComments} from '../actions/commentActions';

type Props = {
    comments:any,
    getComments:any,
    target_id:any
}

type State = {

}


class Comments extends Component<Props,State> {
    componentDidMount() {
        this.props.getComments(this.props.target_id);
    }

    render() {
        let commentsContent = <></>;
        if(this.props.comments.comments != null){
            let cms = this.props.comments.comments;
            
            commentsContent = (
            <>
            {cms.map((element:any, i:number) => {
                return  <Comment data={element} key={`comment${i}`}/>
                })}
            </>
            )
        }
        return (
        <>
            {commentsContent}
        </>
        )
    }
}

const mapStateToProps = (state:any)=>({
    comments: state.comments
});

export default connect(mapStateToProps,{getComments})(Comments);