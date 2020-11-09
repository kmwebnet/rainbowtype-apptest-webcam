/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState, useRef } from 'react';
import GenericTemplate from "./GenericTemplate";



function SubComponent2() {

  const wsUrl = 'wss://' + window.location.host + '/ws';
  const ws = useRef(new WebSocket(wsUrl));

  const [message, setmessage] = useState<string[]> ([]);
  const handleClick = () => {
    console.log('クリックされました');
    ws.current.send('data sent.');
  }
  useEffect(() => {
    ws.current.onmessage = (ev: MessageEvent) => {
        if (ev.data != '') {
            setmessage(message.concat(ev.data));
        };
    }
  });
  useEffect(() => () => ws.current.close(), [ws]) ; 
  
    return (
      <GenericTemplate>
      <div>
        <h2>{window.location.host}</h2>
        <div>{message}</div>
        <button onClick={handleClick}>Add +1</button>
      </div>
      </GenericTemplate>
    );
}

export default SubComponent2;