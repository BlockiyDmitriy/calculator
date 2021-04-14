import React from 'react';
import './styles/Popup.css'

const Popup = (props) => {

    return (
        <div>
            <div className={`popup ${props.show ? 'active' : ''}`}>
                <div className="popup-header">
                    <div className="popup-title">{props.title}</div>
                    <button onClick={props.onClose} className="close-button">×</button>
                </div>
                <div className="popup-body">
                    {props.children}
                </div>
            </div>
            <div className={`overlay ${props.show ? 'active' : ''}`}></div>
        </div>
    );
}

export default Popup;
