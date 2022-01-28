import React, { Component} from 'react';
import {connect} from 'react-redux';
import {getMangaRating, postMangaRating, deleteMangaRating} from '../actions/mangaActions';

type Props = {
    rating:any,
    auth:any,
    manga_id:any,
    manga_name:any,
    getMangaRating:any,
    postMangaRating:any,
    deleteMangaRating:any
}

type State = {

}


class Rating extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {

        }

        this.onStarClick = this.onStarClick.bind(this);
        this.onDelStarClick = this.onDelStarClick.bind(this);
    }

    componentDidMount() {
        this.props.getMangaRating(this.props.manga_id);
    }

    onStarClick(e:any){
        this.props.postMangaRating(
            this.props.manga_id,
            this.props.manga_name,
            Number(e.target.getAttribute('data-value'))
        );
    }

    onDelStarClick(e:any){
        this.props.deleteMangaRating(this.props.manga_id);
    }

    //<i class="bi bi-star"></i> empty star
    //<i class="bi bi-star-fill"></i>
    //<i class="bi bi-star-half"></i>
    render() {
        let ratingContent = <></>;
        let isAuthenticated = this.props.auth.isAuthenticated;
        if(this.props.rating){
            let {avg,ratings_count,user,score} = this.props.rating;
            let scores = [1,2,3,4,5,6,7,8,9,10];
            ratingContent = (
            <>
            <hr/>
            <div className="container-fluid">
                <p>Rating:</p>
                <p>{avg}({ratings_count} votes)</p>
                <p>
                {isAuthenticated?
                    (scores.map((i:number) => {
                        let style = "";
                        if(user != null && i <= score){
                            style = "bi bi-star-fill";
                        }else{
                            style = "bi bi-star";
                        }
                        return <i key={`star${i}`} data-value={i} onClick={this.onStarClick} className={style}></i>
                    })):<></>
                }
                {isAuthenticated && user != null?<button onClick={this.onDelStarClick}
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close">
                                </button>:<></>}
                </p>
            </div>
            <hr/>
            </>
            )
        }
        return (
        <>
            {ratingContent}
        </>
        )
    }
}

const mapStateToProps = (state:any)=>({
    rating: state.manga.rating,
    auth: state.auth
});

export default connect(mapStateToProps,{getMangaRating, postMangaRating, deleteMangaRating})(Rating);