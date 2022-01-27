import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getThreads} from '../../actions/threadActions';
import ThreadCard from './ThreadCard';

type Props = {
    thread:any,
    getThreads:any
}

type State = {

}

class Threads extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {

        }
        
    }

    componentDidMount(){   
        this.props.getThreads();
    }

    render() {
        let {thread_list} = this.props.thread;

        let threadsContent = <></>;

        if(thread_list != null){
            threadsContent = (
            <>
                {thread_list.map((element:any, i:number) => {
                return  <ThreadCard thread={element} key={`thread${i}`}/>
                })}
            </>
            )
        }

        return (
            <div>
                {threadsContent}
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    thread: state.thread
});

export default connect(mapStateToProps,{getThreads})(Threads);