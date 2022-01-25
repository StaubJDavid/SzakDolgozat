import React, { Component, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {searchForManga} from '../actions/mangaActions';
import "bootstrap/js/src/collapse.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import SearchBar from '../common/SearchBar';

type Props = {
    manga:any,
    errors:any
}

type State = {
}


class SearchTest extends Component<Props,State> {


    render() {
        return (
            <div>
                <p>XDddd</p>
                <SearchBar />
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    manga: state.manga,
    errors: state.errors
});

export default connect(mapStateToProps,{})(SearchTest);