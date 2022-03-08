import {FC, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import {addListEntry} from '../../actions/profileActions';
import classnames from 'classnames';
import SimpleButton from '../../common/SimpleButton';
import getTitle from '../../helpers/getTitle';

type Props = {
    element:any,
    list_id:any
    auth:any,
    addListEntry:any
}

const ListEntryRow: FC<Props> = ({element,auth,addListEntry,list_id}) => {
    const history = useHistory();
    const [addHover, setAddHover] = useState(false);
    const [dislikeHover, setDislikeHover] = useState(false);

    function onAddListEntry(dataId:any,dataName:any){
        addListEntry(
            auth.user.id,
            list_id,
            String(dataId),
            String(dataName)
        );
    }

    return (
        <div className='d-flex flex-row'>
            <div className='flex-grow-1 align-middle'>
                <SimpleButton onClick={() => history.push('/manga/'+element.id)} text={getTitle(element.attributes.title)} />
            </div>
            <div
                className={classnames('text-center px-2 d-flex align-items-center',{"text-success":addHover})}
                onMouseEnter={() => setAddHover(true)}
                onMouseLeave={() => setAddHover(false)}
                onClick={() => onAddListEntry(element.id,getTitle(element.attributes.title))}
            >
                <i
                    className="bi bi-plus-square-fill"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseAddEntry${list_id}`}
                    aria-expanded="false"
                    aria-controls={`collapseAddEntry${list_id}`}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state:any)=>({
    auth: state.auth
});

export default connect(mapStateToProps,{addListEntry})(ListEntryRow);