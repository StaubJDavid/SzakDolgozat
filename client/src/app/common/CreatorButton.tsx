import {FC} from 'react';
import {Link} from "react-router-dom";
import isEmpty from '../helpers/isEmpty';

type Props = {
    creator:any
}

const CreatorButton: FC<Props> = ({creator}) => {
    if(!isEmpty(creator)){
        return (
            <Link className="text-center reactLink"
                to={{
                    pathname: `/god/${creator.id}`,
                    state: {
                        creator: creator
                    }
                }}>{creator.attributes.name}</Link>
        )
    }else{
        return (
            <div>
            </div>
        )
    }  
}


export default CreatorButton;