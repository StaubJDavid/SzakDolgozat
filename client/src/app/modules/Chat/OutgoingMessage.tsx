import {FC, useState} from 'react';
import { connect } from 'react-redux';
import './ChatStyle.css';

type Props = {
    message:any
};

const OutgoingMessage: FC<Props> = ({message}) => {
    return (
    <div className="outgoing_msg">
        <div className="sent_msg">
            <p className='text-break'>{message.message}</p>
            <span className="time_date">{message.timestamp}</span>
        </div>
    </div>
    )
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {})(OutgoingMessage);