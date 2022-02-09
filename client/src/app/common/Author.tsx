import React, {FC, useEffect, useState} from 'react'
import classnames from 'classnames'
import axios from 'axios';
import isEmpty from '../helpers/isEmpty';

type Props = {
    author_id:string
}

const Author: FC<Props> = ({author_id}) => {
    const [loading,setLoading] = useState(true);
    const [author,setAuthor] = useState<any>({});

    useEffect(() => {
        setLoading(true);
        axios.get(`https://api.mangadex.org/author/${author_id}`)
        .then(
            res => {
                setAuthor(res.data.data);
                setLoading(false);
                //console.log(res.data.data);
            }
        ).catch(
            err => {
                setAuthor({});
                setLoading(false);
            }
        );
    },[author_id])

    if(!loading && !isEmpty(author)){
        return (
            <div>
                {author.attributes.name}
            </div>
        )
    }else{
        return (
            <div>
            </div>
        )
    }  
}


export default Author;