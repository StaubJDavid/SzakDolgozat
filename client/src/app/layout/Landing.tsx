import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getMostFollowed,getLatestUpload,getSeasonals} from '../actions/mainPageActions';
import MostFollowedMangas from './MainPageComponents/MostFollowedMangas';
import LatestChapters from './MainPageComponents/LatestChapters';
import Seasonals from './MainPageComponents/Seasonals';

type Props = {
    mainPage:any,
    errors:any,
    getMostFollowed:any,
    getLatestUpload:any,
    getSeasonals:any
  }
  
  type State = {
  }

class Landing extends Component<Props,State> {
    componentDidMount(){
        this.props.getMostFollowed();
        this.props.getLatestUpload();
        this.props.getSeasonals();
    }

    render() {
        return (
            <>
            {this.props.errors.statusText === "Not Found"?<div>Chapter not found</div>:<></>}
            <div>Landing LMAO</div>
            <MostFollowedMangas mangas={this.props.mainPage.most_followed} />
            <LatestChapters chapters={this.props.mainPage.latest_chapters} />
            <Seasonals seasonals={this.props.mainPage.seasonal_list} />
            </>
        )
    }
}

const mapStateToProps = (state:any)=>({
    mainPage: state.mainPage,
    errors: state.errors
  });

export default connect(mapStateToProps, {getSeasonals,getMostFollowed,getLatestUpload})(Landing);;