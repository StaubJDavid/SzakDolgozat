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
    const [titleHover, setTitleHover] = useState(false);

    function onAddListEntry(dataId:any,dataName:any){
        addListEntry(
            auth.user.id,
            list_id,
            String(dataId),
            String(dataName)
        );
    }

    return (
        <div className={classnames('d-flex flex-row rounded p-1',{"bg-orange":!titleHover, "text-black":!titleHover, "text-own-dark":titleHover,"bg-yellow":titleHover})}>
            <div className={classnames('flex-grow-1 align-middle fw-bold')}
                onClick={() => history.push('/manga/'+element.id)}
                onMouseEnter={() => setTitleHover(true)}
                onMouseLeave={() => setTitleHover(false)}
            >
                {getTitle(element.attributes.title)}
            </div>
            <div
                className={classnames('text-center px-2 d-flex align-items-center',{"text-success":addHover,"text-black":!addHover})}
                onMouseEnter={() => setAddHover(true)}
                onMouseLeave={() => setAddHover(false)}
                onClick={() => onAddListEntry(element.id,getTitle(element.attributes.title))}
            >
                <i
                    className="bi bi-plus-square-fill fa-lg"
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