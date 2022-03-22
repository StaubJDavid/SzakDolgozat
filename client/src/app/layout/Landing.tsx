import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getMostFollowed,getLatestUpload,getSeasonals, sortSeasonals} from '../actions/mainPageActions';
import MostFollowedMangas from './MainPageComponents/MostFollowedMangas';
import LatestChapters from './MainPageComponents/LatestChapters';
import Seasonals from './MainPageComponents/Seasonals';
import {withRouter} from 'react-router-dom';

type Props = {
    mainPage:any,
    history:any,
    errors:any,
    getMostFollowed:any,
    getLatestUpload:any,
    getSeasonals:any,
    sortSeasonals:any
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
            <div className='bg-black'>
            {this.props.errors.statusText === "Not Found"?<div>Chapter not found</div>:<></>}
            {this.props.mainPage.seasonal_sorted === this.props.mainPage.seasonal_count?<Seasonals seasonals={this.props.mainPage.seasonal_list} history={this.props.history}/>:<></>}
            <hr />
            <MostFollowedMangas mangas={this.props.mainPage.most_followed} history={this.props.history}/>
            <hr />
            <LatestChapters chapters={this.props.mainPage.latest_chapters} />          
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    mainPage: state.mainPage,
    errors: state.errors
  });

export default connect(mapStateToProps, {getSeasonals,getMostFollowed,getLatestUpload,sortSeasonals})(Landing);;