import {FC, useState} from 'react';
import { connect } from 'react-redux';
import './ChatStyle.css';
import timeFormat from '../../helpers/timeFormat';

type Props = {
    message:any
};

const OutgoingMessage: FC<Props> = ({message}) => {
    return (
    <div className="outgoing_msg">
        <div className="sent_msg">
            <p className='text-break fw-bold'>{message.message}</p>
            <span className="time_date">{timeFormat(message.timestamp)}</span>
        </div>
    </div>
    )
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {})(OutgoingMessage);