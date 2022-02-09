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
    location:any,
    chapter_id:any,
    getReadingChapters:any,
    clearReadingChapters:any
}

type State = {

}

class MangaReadingNav extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {

        }
        
        this.onChangeChapter = this.onChangeChapter.bind(this);
    }

    componentDidMount(){
        //console.log("Waaaa Mounterd")
        //this.props.clearReadingChapters();
        this.props.getReadingChapters(this.props.chapter_id,"");
    }

    componentDidUpdate(prevProps:any){
        if(this.props.chapter_id!== prevProps.chapter_id){   
            this.props.getReadingChapters(this.props.chapter_id,
                prevProps.manga.reading_chapters.chapter.manga_id
            );  
        }
    }

    onChangeChapter(e:any){
        //console.log("Index: ", e.target.value);
        this.props.history.push(`/manga/read/${e.target.value}`,{chapter_id: e.target.value});
    }

    render() {

        let chapterNavContent = <></>;

        if(!isEmpty(this.props.manga.reading_chapters.chapter) && this.props.manga.reading_chapters.chapters.length !== 0){
            let {chapter,chapters} = this.props.manga.reading_chapters;
            chapterNavContent = (
            <>
            <div>
                {chapter.attributes.translatedLanguage}
                <br/>
                {chapter.id}
                <br/>
                Title: {chapter.attributes.title}
                <br/>
                Volume: {chapter.attributes.volume}
                <br/>
                Chapter: {chapter.attributes.chapter}
                <br/>
                {chapter.manga_id}
                <select value={chapter.id} onChange={this.onChangeChapter} id="chapters" name="chapters">
                    {chapters.map((ch:any,i:any) => (
                        <option key={i} value={ch.id}>{ch.attributes.chapter} + {i}</option>
                    ))}
                </select>
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

export default connect(mapStateToProps,{getReadingChapters,clearReadingChapters})(MangaReadingNav);