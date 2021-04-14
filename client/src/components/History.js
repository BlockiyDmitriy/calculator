import React, { useEffect } from 'react';
import Popup from './Popup';
import { useState } from 'react'

const History = () => {
    const [show, setShow] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (show === false) return;
        fetch("api/history/all")
            .then(result => result.json())
            .then(
                (result) => {
                    console.log(result);
                    setHistory(result);
                },
                (error) => {
                    console.log(error);
                }
            );
    });

    return (
        <div>
            <Popup title='History' show={show} onClose={() => setShow(false)}>
                {history.map((item) => (<div key={item.id}>{item.operation}</div>))}
            </Popup>
            <button onClick={() => setShow(true)}>Show History</button>
        </div>
    );
}

export default History;