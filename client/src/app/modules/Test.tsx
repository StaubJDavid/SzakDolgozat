import React, { Component, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {searchForManga} from '../actions/mangaActions';
import "bootstrap/js/src/collapse.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import SearchBar from '../common/SearchBar';
import TextLinkDelete from '../common/TextLinkDelete';

type Props = {
}

type State = {
}

//`/manga/${id}`, { manga_id: id}
class Test extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
        }
        
        this.onDeleteMangaClick = this.onDeleteMangaClick.bind(this);
        this.onSomethingClick = this.onSomethingClick.bind(this);
    }

    onDeleteMangaClick(e:any){
        console.log(e)
    }

    onSomethingClick(e:any){
        console.log("Xddd: ", e)
    }

    render() {
        return (
            <div className="card">
                <ul className="list-group list-group-flush">
                    <TextLinkDelete key={1}
                    url={"/manga/e78a489b-6632-4d61-b00b-5206f5b8b22b"}  
                    state_object={{manga_id:"e78a489b-6632-4d61-b00b-5206f5b8b22b"}}
                    owned={true}
                    text={"Link to tensura"}
                    onClick={this.onDeleteMangaClick}
                    onClickData={123}
                    />
                    <TextLinkDelete key={1}
                    url={"/manga/e78a489b-6632-4d61-b00b-5206f5b8b22b"}  
                    state_object={{}}
                    owned={false}
                    text={"Link to tensura2"}
                    onClick={() => {}}
                    onClickData={""}
                    />
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps,{})(Test);