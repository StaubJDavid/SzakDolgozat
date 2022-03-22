import React, { Component} from 'react';
import classnames from 'classnames'
import axios from 'axios';
import isEmpty from '../helpers/isEmpty';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {getReadingChapters,clearReadingChapters} from '../actions/mangaActions';

type Props = {
    manga:any,
    history:any,
    getReadingChapters:any,
    clearReadingChapters:any
}

type State = {

}

class NextPrevChapter extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {

        }
        
        this.onChangeChapter = this.onChangeChapter.bind(this);
    }

    onChangeChapter(e:any){
        let currentIndex = this.props.manga.reading_chapters.chapter.array_id;
        //console.log(currentIndex+Number(e.target.value));

        this.props.history.push(`/manga/read/${this.props.manga.reading_chapters.chapters[currentIndex+Number(e.target.value)].id}`,
        {chapter_id: this.props.manga.reading_chapters.chapters[currentIndex+Number(e.target.value)].id}
        );
    }

    render() {

        let chapterNavContent = <></>;

        if(!isEmpty(this.props.manga.reading_chapters.chapter) && this.props.manga.reading_chapters.chapters.length !== 0){
            let {chapter,chapters} = this.props.manga.reading_chapters;
            let max = chapters.length-1;
            chapterNavContent = (
            <>
            <div>
                <button className={classnames("btn-yellow",{"disabled none-cursor-style":chapter.array_id===max})} value={1} disabled={chapter.array_id===max} onClick={this.onChangeChapter}>Previous</button>
                <button className={classnames("btn-yellow",{"disabled none-cursor-style":chapter.array_id===0})} value={-1} disabled={chapter.array_id===0} onClick={this.onChangeChapter}>Next</button>
            </div>
            </>
            )
        }

        return (
            <div>
                {chapterNavContent}
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    manga: state.manga
});

export default connect(mapStateToProps,{getReadingChapters,clearReadingChapters})(NextPrevChapter);