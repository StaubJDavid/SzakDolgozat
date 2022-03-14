import {FC, useState} from 'react';
import { connect } from 'react-redux';
import './ChatStyle.css';

type Props = {
    message:any
};

const InboundMessage: FC<Props> = ({message}) => {
    return (
        <div className="incoming_msg">
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p className='text-break'>{message.message}</p>
                    <span className="time_date">{message.timestamp}</span>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {})(InboundMessage);