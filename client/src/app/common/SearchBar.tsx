import React, { Component} from 'react';
import {connect} from 'react-redux';
import {searchForManga} from '../actions/mangaActions';
import TextInput from './TextInput';

type Props = {
    manga:any,
    errors:any,
    searchForManga:any
}

type State = {
    manga_search:string,
    errors: any,
    timer:any,
}


class SearchBar extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
            manga_search: '',
            errors: {},
            timer: null,
        }
        
        this.onChangeManga = this.onChangeManga.bind(this);
    }


    onChangeManga(e:any){
        this.setState({[String(e.target.name)]: String(e.target.value)} as any);

        clearTimeout(this.state.timer);

        const newTimer = setTimeout(() => {
            this.props.searchForManga(String(e.target.value))
        }, 500)
        
        this.setState({timer: newTimer});
    }


    render() {
        return (
            <div>
                <TextInput
                    name="manga_search" 
                    value={this.state.manga_search}
                    error={this.state.errors.thing}
                    type="text"
                    onChange={this.onChangeManga}  
                    placeholder="Manga"
                />
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    manga: state.manga,
    errors: state.errors
});

export default connect(mapStateToProps,{searchForManga})(SearchBar);