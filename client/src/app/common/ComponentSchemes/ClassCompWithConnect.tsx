import React, { Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

type Props = {

}

type State = {

}

class ClassCompWithConnect extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {

        }
        
    }

    render() {
        return (
            <div>
                <></>
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({

});

export default connect(mapStateToProps,{})(ClassCompWithConnect);